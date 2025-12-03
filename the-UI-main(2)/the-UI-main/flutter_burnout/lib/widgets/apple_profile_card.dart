import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../constants/apple_theme.dart';

/// Apple Wallet-style profile card
/// Features: swipeable card stack, 3D rotation, glassmorphic design,
/// parallax tilt effect, tap to expand, bounce animation, drop shadow
class AppleProfileCard extends StatefulWidget {
  final String carModel;
  final String userName;
  final String carImageUrl;
  final int horsePower;
  final int topSpeed;
  final String year;
  final List<String> mods;
  final VoidCallback? onTap;
  final bool isExpanded;

  const AppleProfileCard({
    super.key,
    required this.carModel,
    required this.userName,
    required this.carImageUrl,
    required this.horsePower,
    required this.topSpeed,
    required this.year,
    this.mods = const [],
    this.onTap,
    this.isExpanded = false,
  });

  @override
  State<AppleProfileCard> createState() => _AppleProfileCardState();
}

class _AppleProfileCardState extends State<AppleProfileCard>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;
  late Animation<double> _rotationAnimation;

  Offset _dragOffset = Offset.zero;
  bool _isDragging = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: AppleTheme.durationSpring,
    );

    // Spring animation for tap
    _scaleAnimation = Tween<double>(
      begin: 1.0,
      end: widget.isExpanded ? 1.05 : 0.98,
    ).animate(
      CurvedAnimation(
        parent: _controller,
        curve: Curves.elasticOut,
      ),
    );

    // Rotation for 3D effect
    _rotationAnimation = Tween<double>(
      begin: 0.0,
      end: 0.02,
    ).animate(
      CurvedAnimation(
        parent: _controller,
        curve: Curves.easeInOut,
      ),
    );

    // Entry animation
    Future.delayed(const Duration(milliseconds: 100), () {
      if (mounted) {
        _controller.forward();
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _handleTap() {
    HapticFeedback.mediumImpact();
    _controller.forward().then((_) {
      _controller.reverse();
    });
    widget.onTap?.call();
  }

  void _handlePanUpdate(DragUpdateDetails details) {
    setState(() {
      _isDragging = true;
      _dragOffset = details.localPosition;
    });
  }

  void _handlePanEnd(DragEndDetails details) {
    setState(() {
      _isDragging = false;
      _dragOffset = Offset.zero;
    });
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final cardWidth = size.width - 40;
    final cardHeight = widget.isExpanded ? size.height * 0.7 : 220.0;

    // Calculate parallax offset for tilt effect
    final parallaxX = _isDragging ? (_dragOffset.dx - cardWidth / 2) / 50 : 0.0;
    final parallaxY = _isDragging ? (_dragOffset.dy - cardHeight / 2) / 50 : 0.0;

    return GestureDetector(
      onTap: _handleTap,
      onPanUpdate: _handlePanUpdate,
      onPanEnd: _handlePanEnd,
      child: AnimatedBuilder(
        animation: _controller,
        builder: (context, child) {
          return Transform(
            transform: Matrix4.identity()
              ..setEntry(3, 2, 0.001) // perspective
              ..rotateX(parallaxY * 0.1)
              ..rotateY(-parallaxX * 0.1)
              ..scale(_scaleAnimation.value),
            alignment: Alignment.center,
            child: AnimatedContainer(
              duration: AppleTheme.durationMedium,
              curve: Curves.easeInOutCubic,
              width: cardWidth,
              height: cardHeight,
              margin: const EdgeInsets.symmetric(
                horizontal: AppleTheme.spacing20,
                vertical: AppleTheme.spacing12,
              ),
              decoration: BoxDecoration(
                borderRadius: AppleTheme.radiusXLarge,
                boxShadow: [
                  BoxShadow(
                    color: AppleTheme.appleBlue.withOpacity(0.2),
                    offset: const Offset(0, 20),
                    blurRadius: 40,
                    spreadRadius: 0,
                  ),
                  ...AppleTheme.cardShadows,
                ],
              ),
              child: ClipRRect(
                borderRadius: AppleTheme.radiusXLarge,
                child: BackdropFilter(
                  filter: AppleTheme.standardBlur,
                  child: Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                        colors: [
                          AppleTheme.glassLight,
                          AppleTheme.glassDark,
                        ],
                      ),
                      border: Border.all(
                        color: AppleTheme.glassLightBorder,
                        width: 1,
                      ),
                      borderRadius: AppleTheme.radiusXLarge,
                    ),
                    child: Stack(
                      children: [
                        // Background car image with gradient overlay
                        _buildBackgroundImage(),

                        // Content
                        Padding(
                          padding: const EdgeInsets.all(AppleTheme.spacing20),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              // Header with car model and year
                              _buildHeader(),

                              const Spacer(),

                              // Stats row in glass containers
                              _buildStatsRow(),

                              if (widget.isExpanded) ...[
                                const SizedBox(height: AppleTheme.spacing20),
                                _buildModsList(),
                                const SizedBox(height: AppleTheme.spacing20),
                                _buildQRCode(),
                              ],
                            ],
                          ),
                        ),
                      ],
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

  Widget _buildBackgroundImage() {
    return Positioned.fill(
      child: Stack(
        children: [
          // Car image (placeholder - would use network image in production)
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  AppleTheme.appleBlue.withOpacity(0.3),
                  AppleTheme.appleBlueDark.withOpacity(0.5),
                ],
              ),
            ),
          ),
          // Gradient overlay
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  Colors.transparent,
                  Colors.black.withOpacity(0.7),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHeader() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          widget.carModel,
          style: AppleTheme.title1.copyWith(
            color: Colors.white,
            fontWeight: FontWeight.bold,
            shadows: [
              Shadow(
                color: Colors.black.withOpacity(0.5),
                offset: const Offset(0, 2),
                blurRadius: 4,
              ),
            ],
          ),
        ),
        const SizedBox(height: 4),
        Text(
          widget.year,
          style: AppleTheme.subheadline.copyWith(
            color: Colors.white.withOpacity(0.8),
          ),
        ),
        const SizedBox(height: 4),
        Text(
          widget.userName,
          style: AppleTheme.footnote.copyWith(
            color: Colors.white.withOpacity(0.6),
          ),
        ),
      ],
    );
  }

  Widget _buildStatsRow() {
    return Row(
      children: [
        _buildStatContainer(
          label: 'HP',
          value: widget.horsePower.toString(),
          icon: Icons.speed,
        ),
        const SizedBox(width: AppleTheme.spacing12),
        _buildStatContainer(
          label: 'TOP',
          value: '${widget.topSpeed} mph',
          icon: Icons.trending_up,
        ),
      ],
    );
  }

  Widget _buildStatContainer({
    required String label,
    required String value,
    required IconData icon,
  }) {
    return Expanded(
      child: ClipRRect(
        borderRadius: AppleTheme.radiusMedium,
        child: BackdropFilter(
          filter: AppleTheme.lightBlur,
          child: Container(
            padding: const EdgeInsets.all(AppleTheme.spacing12),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.1),
              border: Border.all(
                color: Colors.white.withOpacity(0.2),
                width: 1,
              ),
              borderRadius: AppleTheme.radiusMedium,
            ),
            child: Row(
              children: [
                Icon(
                  icon,
                  color: AppleTheme.appleBlue,
                  size: 20,
                ),
                const SizedBox(width: 8),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      label,
                      style: AppleTheme.caption2.copyWith(
                        color: Colors.white.withOpacity(0.6),
                      ),
                    ),
                    Text(
                      value,
                      style: AppleTheme.headline.copyWith(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildModsList() {
    return ClipRRect(
      borderRadius: AppleTheme.radiusMedium,
      child: BackdropFilter(
        filter: AppleTheme.lightBlur,
        child: Container(
          padding: const EdgeInsets.all(AppleTheme.spacing16),
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.1),
            border: Border.all(
              color: Colors.white.withOpacity(0.2),
              width: 1,
            ),
            borderRadius: AppleTheme.radiusMedium,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Modifications',
                style: AppleTheme.headline.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 8),
              ...widget.mods.map((mod) => Padding(
                padding: const EdgeInsets.only(bottom: 4),
                child: Row(
                  children: [
                    Container(
                      width: 4,
                      height: 4,
                      decoration: BoxDecoration(
                        color: AppleTheme.appleBlue,
                        shape: BoxShape.circle,
                      ),
                    ),
                    const SizedBox(width: 8),
                    Text(
                      mod,
                      style: AppleTheme.callout.copyWith(
                        color: Colors.white.withOpacity(0.8),
                      ),
                    ),
                  ],
                ),
              )),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildQRCode() {
    return ClipRRect(
      borderRadius: AppleTheme.radiusMedium,
      child: BackdropFilter(
        filter: AppleTheme.lightBlur,
        child: Container(
          height: 120,
          padding: const EdgeInsets.all(AppleTheme.spacing16),
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.9),
            borderRadius: AppleTheme.radiusMedium,
          ),
          child: Row(
            children: [
              // QR code placeholder
              Container(
                width: 88,
                height: 88,
                decoration: BoxDecoration(
                  color: Colors.black,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: const Center(
                  child: Icon(
                    Icons.qr_code,
                    color: Colors.white,
                    size: 60,
                  ),
                ),
              ),
              const SizedBox(width: AppleTheme.spacing16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'Profile QR Code',
                      style: AppleTheme.headline.copyWith(
                        color: Colors.black,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Scan to view full profile',
                      style: AppleTheme.footnote.copyWith(
                        color: Colors.black.withOpacity(0.6),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
