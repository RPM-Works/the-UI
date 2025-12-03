import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../constants/apple_theme.dart';

// =============================================================================
// ROUTES HUD - Floating glass container for route information
// =============================================================================

/// Routes HUD with map preview and route stats
/// Features: floating glass container, top rounded corners, blur edges,
/// gradient text for stats, compact/expanded animation states
class AppleRoutesHUD extends StatefulWidget {
  final String routeName;
  final String distance;
  final String duration;
  final String eta;
  final bool isExpanded;
  final VoidCallback? onToggle;

  const AppleRoutesHUD({
    super.key,
    required this.routeName,
    required this.distance,
    required this.duration,
    required this.eta,
    this.isExpanded = false,
    this.onToggle,
  });

  @override
  State<AppleRoutesHUD> createState() => _AppleRoutesHUDState();
}

class _AppleRoutesHUDState extends State<AppleRoutesHUD>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _heightAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: AppleTheme.durationMedium,
    );

    _heightAnimation = Tween<double>(
      begin: 120.0,
      end: 300.0,
    ).animate(
      CurvedAnimation(
        parent: _controller,
        curve: Curves.easeInOutCubic,
      ),
    );

    if (widget.isExpanded) {
      _controller.value = 1.0;
    }
  }

  @override
  void didUpdateWidget(AppleRoutesHUD oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.isExpanded != oldWidget.isExpanded) {
      if (widget.isExpanded) {
        _controller.forward();
      } else {
        _controller.reverse();
      }
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return GestureDetector(
          onTap: () {
            HapticFeedback.selectionClick();
            widget.onToggle?.call();
          },
          child: Container(
            height: _heightAnimation.value,
            margin: const EdgeInsets.all(AppleTheme.spacing16),
            decoration: BoxDecoration(
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(24),
                topRight: Radius.circular(24),
                bottomLeft: Radius.circular(20),
                bottomRight: Radius.circular(20),
              ),
              boxShadow: AppleTheme.floatingShadows,
            ),
            child: ClipRRect(
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(24),
                topRight: Radius.circular(24),
                bottomLeft: Radius.circular(20),
                bottomRight: Radius.circular(20),
              ),
              child: BackdropFilter(
                filter: AppleTheme.standardBlur,
                child: Container(
                  decoration: BoxDecoration(
                    color: AppleTheme.glassLight,
                    border: Border.all(
                      color: AppleTheme.glassLightBorder,
                      width: 1,
                    ),
                  ),
                  child: Column(
                    children: [
                      // Map preview section
                      Expanded(
                        child: _buildMapPreview(),
                      ),

                      // Route stats section
                      _buildRouteStats(),
                    ],
                  ),
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildMapPreview() {
    return Stack(
      children: [
        // Map placeholder (gradient with blur edges)
        Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
                AppleTheme.appleBlue.withOpacity(0.3),
                AppleTheme.appleGreen.withOpacity(0.3),
              ],
            ),
          ),
        ),

        // Blur edges
        Positioned.fill(
          child: Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  Colors.black.withOpacity(0.3),
                  Colors.transparent,
                  Colors.black.withOpacity(0.5),
                ],
                stops: const [0.0, 0.3, 1.0],
              ),
            ),
          ),
        ),

        // Route name
        Positioned(
          top: AppleTheme.spacing16,
          left: AppleTheme.spacing16,
          right: AppleTheme.spacing16,
          child: Row(
            children: [
              Expanded(
                child: Text(
                  widget.routeName,
                  style: AppleTheme.headline.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    shadows: [
                      Shadow(
                        color: Colors.black.withOpacity(0.5),
                        offset: const Offset(0, 1),
                        blurRadius: 2,
                      ),
                    ],
                  ),
                ),
              ),
              Icon(
                widget.isExpanded
                    ? Icons.keyboard_arrow_down
                    : Icons.keyboard_arrow_up,
                color: Colors.white,
                size: 24,
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildRouteStats() {
    return Container(
      padding: const EdgeInsets.all(AppleTheme.spacing16),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _buildStatItem(
            icon: Icons.straighten,
            label: 'Distance',
            value: widget.distance,
          ),
          _buildStatItem(
            icon: Icons.access_time,
            label: 'Time',
            value: widget.duration,
          ),
          _buildStatItem(
            icon: Icons.location_on,
            label: 'ETA',
            value: widget.eta,
          ),
        ],
      ),
    );
  }

  Widget _buildStatItem({
    required IconData icon,
    required String label,
    required String value,
  }) {
    return Column(
      children: [
        Icon(
          icon,
          color: AppleTheme.appleBlue,
          size: 20,
        ),
        const SizedBox(height: 4),
        ShaderMask(
          shaderCallback: (bounds) => AppleTheme.primaryGradient.createShader(
            Rect.fromLTWH(0, 0, bounds.width, bounds.height),
          ),
          child: Text(
            value,
            style: AppleTheme.headline.copyWith(
              color: Colors.white,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        Text(
          label,
          style: AppleTheme.caption2.copyWith(
            color: Colors.white.withOpacity(0.6),
          ),
        ),
      ],
    );
  }
}

// =============================================================================
// COMMUNICATION HUD - Walkie-talkie style interface
// =============================================================================

/// Communication HUD with push-to-talk functionality
/// Features: floating walkie-talkie interface, circular push-to-talk button,
/// pulse animation, glass background, active speaker indicators, slide animation
class AppleCommunicationHUD extends StatefulWidget {
  final List<String> activeUsers;
  final bool isRecording;
  final VoidCallback? onPushToTalk;
  final VoidCallback? onRelease;

  const AppleCommunicationHUD({
    super.key,
    this.activeUsers = const [],
    this.isRecording = false,
    this.onPushToTalk,
    this.onRelease,
  });

  @override
  State<AppleCommunicationHUD> createState() => _AppleCommunicationHUDState();
}

class _AppleCommunicationHUDState extends State<AppleCommunicationHUD>
    with TickerProviderStateMixin {
  late AnimationController _pulseController;
  late AnimationController _slideController;
  late Animation<double> _pulseAnimation;
  late Animation<Offset> _slideAnimation;

  @override
  void initState() {
    super.initState();

    // Pulse animation for recording state
    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1000),
    )..repeat(reverse: true);

    _pulseAnimation = Tween<double>(begin: 1.0, end: 1.1).animate(
      CurvedAnimation(
        parent: _pulseController,
        curve: Curves.easeInOut,
      ),
    );

    // Slide animation for show/hide
    _slideController = AnimationController(
      vsync: this,
      duration: AppleTheme.durationMedium,
    );

    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, 1),
      end: Offset.zero,
    ).animate(
      CurvedAnimation(
        parent: _slideController,
        curve: Curves.easeInOutCubic,
      ),
    );

    // Show on init
    _slideController.forward();
  }

  @override
  void didUpdateWidget(AppleCommunicationHUD oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.isRecording != oldWidget.isRecording) {
      if (!widget.isRecording) {
        _pulseController.stop();
        _pulseController.reset();
      } else {
        _pulseController.repeat(reverse: true);
      }
    }
  }

  @override
  void dispose() {
    _pulseController.dispose();
    _slideController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SlideTransition(
      position: _slideAnimation,
      child: Container(
        margin: const EdgeInsets.only(
          bottom: AppleTheme.spacing20,
          left: AppleTheme.spacing20,
          right: AppleTheme.spacing20,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Active users indicator
            if (widget.activeUsers.isNotEmpty) _buildActiveUsers(),

            const SizedBox(height: AppleTheme.spacing12),

            // Push to talk button
            _buildPushToTalkButton(),
          ],
        ),
      ),
    );
  }

  Widget _buildActiveUsers() {
    return ClipRRect(
      borderRadius: AppleTheme.radiusMedium,
      child: BackdropFilter(
        filter: AppleTheme.standardBlur,
        child: Container(
          padding: const EdgeInsets.symmetric(
            horizontal: AppleTheme.spacing16,
            vertical: AppleTheme.spacing12,
          ),
          decoration: BoxDecoration(
            color: AppleTheme.glassLight,
            border: Border.all(
              color: AppleTheme.glassLightBorder,
              width: 1,
            ),
            borderRadius: AppleTheme.radiusMedium,
            boxShadow: AppleTheme.cardShadows,
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              // Active indicator
              Container(
                width: 8,
                height: 8,
                decoration: BoxDecoration(
                  color: AppleTheme.appleGreen,
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(
                      color: AppleTheme.appleGreen,
                      blurRadius: 8,
                      spreadRadius: 2,
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 8),
              Text(
                '${widget.activeUsers.length} active',
                style: AppleTheme.callout.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildPushToTalkButton() {
    return GestureDetector(
      onLongPressStart: (_) {
        HapticFeedback.mediumImpact();
        widget.onPushToTalk?.call();
      },
      onLongPressEnd: (_) {
        HapticFeedback.lightImpact();
        widget.onRelease?.call();
      },
      child: AnimatedBuilder(
        animation: widget.isRecording ? _pulseAnimation : const AlwaysStoppedAnimation(1.0),
        builder: (context, child) {
          return Transform.scale(
            scale: widget.isRecording ? _pulseAnimation.value : 1.0,
            child: Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                boxShadow: [
                  BoxShadow(
                    color: widget.isRecording
                        ? AppleTheme.appleRed.withOpacity(0.5)
                        : AppleTheme.appleBlue.withOpacity(0.3),
                    blurRadius: 20,
                    spreadRadius: 5,
                  ),
                  ...AppleTheme.floatingShadows,
                ],
              ),
              child: ClipOval(
                child: BackdropFilter(
                  filter: AppleTheme.standardBlur,
                  child: Container(
                    decoration: BoxDecoration(
                      color: widget.isRecording
                          ? AppleTheme.appleRed.withOpacity(0.3)
                          : AppleTheme.appleBlue.withOpacity(0.3),
                      border: Border.all(
                        color: widget.isRecording
                            ? AppleTheme.appleRed
                            : AppleTheme.appleBlue,
                        width: 2,
                      ),
                      shape: BoxShape.circle,
                    ),
                    child: Icon(
                      widget.isRecording ? Icons.mic : Icons.mic_none,
                      color: Colors.white,
                      size: 36,
                    ),
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
