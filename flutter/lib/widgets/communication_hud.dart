import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'dart:ui';
import '../theme/app_theme.dart';

/// Communication HUD with walkie-talkie interface
class CommunicationHUD extends StatefulWidget {
  final String channelName;
  final int activeUsers;
  final bool isTransmitting;
  final VoidCallback? onPushToTalk;
  final VoidCallback? onReleaseTalk;
  final VoidCallback? onClose;

  const CommunicationHUD({
    Key? key,
    required this.channelName,
    this.activeUsers = 0,
    this.isTransmitting = false,
    this.onPushToTalk,
    this.onReleaseTalk,
    this.onClose,
  }) : super(key: key);

  @override
  State<CommunicationHUD> createState() => _CommunicationHUDState();
}

class _CommunicationHUDState extends State<CommunicationHUD>
    with SingleTickerProviderStateMixin {
  late AnimationController _pulseController;
  late Animation<double> _pulseAnimation;

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    )..repeat(reverse: true);

    _pulseAnimation = Tween<double>(begin: 0.8, end: 1.0).animate(
      CurvedAnimation(
        parent: _pulseController,
        curve: Curves.easeInOut,
      ),
    );
  }

  @override
  void dispose() {
    _pulseController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      margin: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.15),
            blurRadius: 20,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(24),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 15, sigmaY: 15),
          child: Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: isDark
                    ? [
                        Colors.white.withOpacity(0.15),
                        Colors.white.withOpacity(0.05),
                      ]
                    : [
                        Colors.white.withOpacity(0.4),
                        Colors.white.withOpacity(0.2),
                      ],
              ),
              border: Border.all(
                color: widget.isTransmitting
                    ? AppTheme.primaryBlue.withOpacity(0.6)
                    : Colors.white.withOpacity(0.3),
                width: widget.isTransmitting ? 2 : 1.5,
              ),
              borderRadius: BorderRadius.circular(24),
            ),
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Header
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          FaIcon(
                            FontAwesomeIcons.walkie,
                            color: AppTheme.primaryBlue,
                            size: 20,
                          ),
                          const SizedBox(width: 10),
                          Text(
                            'Walkie-Talkie',
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w700,
                              color: isDark ? Colors.white : Colors.black87,
                            ),
                          ),
                        ],
                      ),
                      if (widget.onClose != null)
                        GestureDetector(
                          onTap: widget.onClose,
                          child: Icon(
                            Icons.close,
                            color: isDark ? Colors.white60 : Colors.black54,
                            size: 20,
                          ),
                        ),
                    ],
                  ),
                  const SizedBox(height: 20),

                  // Channel Info
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: isDark
                          ? Colors.white.withOpacity(0.1)
                          : Colors.white.withOpacity(0.5),
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(
                        color: Colors.white.withOpacity(0.2),
                        width: 1,
                      ),
                    ),
                    child: Column(
                      children: [
                        Text(
                          widget.channelName,
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.w700,
                            color: AppTheme.primaryBlue,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Container(
                              width: 8,
                              height: 8,
                              decoration: BoxDecoration(
                                color: widget.activeUsers > 0
                                    ? Colors.green
                                    : Colors.grey,
                                shape: BoxShape.circle,
                              ),
                            ),
                            const SizedBox(width: 6),
                            Text(
                              '${widget.activeUsers} Active',
                              style: TextStyle(
                                fontSize: 13,
                                color: isDark ? Colors.white60 : Colors.black54,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 20),

                  // Audio Level Indicator
                  if (widget.isTransmitting) _buildAudioLevelIndicator(isDark),
                  if (widget.isTransmitting) const SizedBox(height: 20),

                  // Push-to-Talk Button
                  AnimatedBuilder(
                    animation: _pulseAnimation,
                    builder: (context, child) {
                      return Transform.scale(
                        scale: widget.isTransmitting ? _pulseAnimation.value : 1.0,
                        child: GestureDetector(
                          onTapDown: (_) => widget.onPushToTalk?.call(),
                          onTapUp: (_) => widget.onReleaseTalk?.call(),
                          onTapCancel: () => widget.onReleaseTalk?.call(),
                          child: Container(
                            width: 120,
                            height: 120,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              gradient: widget.isTransmitting
                                  ? AppTheme.primaryGradient
                                  : LinearGradient(
                                      colors: [
                                        Colors.grey.shade700,
                                        Colors.grey.shade600,
                                      ],
                                    ),
                              boxShadow: widget.isTransmitting
                                  ? [
                                      BoxShadow(
                                        color: AppTheme.primaryBlue.withOpacity(0.6),
                                        blurRadius: 30,
                                        spreadRadius: 5,
                                      ),
                                    ]
                                  : [
                                      BoxShadow(
                                        color: Colors.black.withOpacity(0.2),
                                        blurRadius: 10,
                                        offset: const Offset(0, 4),
                                      ),
                                    ],
                            ),
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(
                                  widget.isTransmitting
                                      ? Icons.mic
                                      : Icons.mic_none,
                                  color: Colors.white,
                                  size: 40,
                                ),
                                const SizedBox(height: 8),
                                Text(
                                  widget.isTransmitting ? 'RELEASE' : 'PUSH',
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontSize: 12,
                                    fontWeight: FontWeight.w700,
                                    letterSpacing: 1.5,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 12),
                  Text(
                    widget.isTransmitting
                        ? 'Broadcasting...'
                        : 'Hold to Talk',
                    style: TextStyle(
                      fontSize: 14,
                      color: widget.isTransmitting
                          ? AppTheme.primaryBlue
                          : (isDark ? Colors.white60 : Colors.black54),
                      fontWeight: widget.isTransmitting
                          ? FontWeight.w600
                          : FontWeight.w400,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildAudioLevelIndicator(bool isDark) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
      decoration: BoxDecoration(
        color: isDark
            ? Colors.white.withOpacity(0.05)
            : Colors.white.withOpacity(0.3),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: List.generate(
          20,
          (index) => AnimatedContainer(
            duration: Duration(milliseconds: 100 + (index * 50)),
            width: 3,
            height: 8 + (index % 5) * 4,
            margin: const EdgeInsets.symmetric(horizontal: 2),
            decoration: BoxDecoration(
              color: AppTheme.primaryBlue.withOpacity(0.3 + (index % 5) * 0.15),
              borderRadius: BorderRadius.circular(2),
            ),
          ),
        ),
      ),
    );
  }
}
