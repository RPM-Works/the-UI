import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../constants/apple_theme.dart';

/// Apple-style content card for posts and news
/// Features: rounded corners, multi-layer shadows, glass overlay option,
/// smooth press animation, depth effects
class AppleContentCard extends StatefulWidget {
  final String? imageUrl;
  final String title;
  final String? subtitle;
  final String? description;
  final Widget? trailing;
  final VoidCallback? onTap;
  final bool hasGlassOverlay;
  final List<String>? tags;

  const AppleContentCard({
    super.key,
    this.imageUrl,
    required this.title,
    this.subtitle,
    this.description,
    this.trailing,
    this.onTap,
    this.hasGlassOverlay = false,
    this.tags,
  });

  @override
  State<AppleContentCard> createState() => _AppleContentCardState();
}

class _AppleContentCardState extends State<AppleContentCard> {
  bool _isPressed = false;

  void _handleTapDown(TapDownDetails details) {
    if (widget.onTap != null) {
      setState(() => _isPressed = true);
      HapticFeedback.selectionClick();
    }
  }

  void _handleTapUp(TapUpDetails details) {
    setState(() => _isPressed = false);
  }

  void _handleTapCancel() {
    setState(() => _isPressed = false);
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: _handleTapDown,
      onTapUp: _handleTapUp,
      onTapCancel: _handleTapCancel,
      onTap: widget.onTap,
      child: AnimatedContainer(
        duration: AppleTheme.durationFast,
        curve: Curves.easeInOut,
        transform: Matrix4.identity()
          ..scale(_isPressed ? 0.98 : 1.0),
        margin: const EdgeInsets.symmetric(
          horizontal: AppleTheme.spacing16,
          vertical: AppleTheme.spacing8,
        ),
        decoration: BoxDecoration(
          borderRadius: AppleTheme.radiusXLarge,
          boxShadow: _isPressed ? [] : AppleTheme.cardShadows,
        ),
        child: ClipRRect(
          borderRadius: AppleTheme.radiusXLarge,
          child: Container(
            decoration: BoxDecoration(
              color: widget.hasGlassOverlay
                  ? AppleTheme.glassLight
                  : Colors.white.withOpacity(0.05),
              border: Border.all(
                color: widget.hasGlassOverlay
                    ? AppleTheme.glassLightBorder
                    : Colors.white.withOpacity(0.1),
                width: 1,
              ),
              borderRadius: AppleTheme.radiusXLarge,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Image section (if provided)
                if (widget.imageUrl != null) _buildImageSection(),

                // Content section
                Padding(
                  padding: const EdgeInsets.all(AppleTheme.spacing16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Title and trailing
                      Row(
                        children: [
                          Expanded(
                            child: Text(
                              widget.title,
                              style: AppleTheme.headline.copyWith(
                                color: Colors.white,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ),
                          if (widget.trailing != null) ...[
                            const SizedBox(width: AppleTheme.spacing8),
                            widget.trailing!,
                          ],
                        ],
                      ),

                      // Subtitle
                      if (widget.subtitle != null) ...[
                        const SizedBox(height: 4),
                        Text(
                          widget.subtitle!,
                          style: AppleTheme.subheadline.copyWith(
                            color: Colors.white.withOpacity(0.7),
                          ),
                        ),
                      ],

                      // Description
                      if (widget.description != null) ...[
                        const SizedBox(height: AppleTheme.spacing8),
                        Text(
                          widget.description!,
                          style: AppleTheme.callout.copyWith(
                            color: Colors.white.withOpacity(0.8),
                          ),
                          maxLines: 3,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ],

                      // Tags
                      if (widget.tags != null && widget.tags!.isNotEmpty) ...[
                        const SizedBox(height: AppleTheme.spacing12),
                        _buildTags(),
                      ],
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildImageSection() {
    return Stack(
      children: [
        // Image (placeholder gradient for now)
        Container(
          height: 200,
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
                AppleTheme.appleBlue.withOpacity(0.4),
                AppleTheme.applePurple.withOpacity(0.4),
              ],
            ),
          ),
        ),
        // Gradient overlay
        Positioned(
          bottom: 0,
          left: 0,
          right: 0,
          child: Container(
            height: 80,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  Colors.transparent,
                  Colors.black.withOpacity(0.6),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildTags() {
    return Wrap(
      spacing: 8,
      runSpacing: 8,
      children: widget.tags!
          .map(
            (tag) => Container(
              padding: const EdgeInsets.symmetric(
                horizontal: 12,
                vertical: 6,
              ),
              decoration: BoxDecoration(
                color: AppleTheme.appleBlue.withOpacity(0.2),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: AppleTheme.appleBlue.withOpacity(0.3),
                  width: 1,
                ),
              ),
              child: Text(
                tag,
                style: AppleTheme.caption1.copyWith(
                  color: AppleTheme.appleBlue,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
          )
          .toList(),
    );
  }
}

/// Compact version of content card for lists
class AppleCompactCard extends StatefulWidget {
  final IconData? icon;
  final String title;
  final String? subtitle;
  final Widget? trailing;
  final VoidCallback? onTap;
  final Color? accentColor;

  const AppleCompactCard({
    super.key,
    this.icon,
    required this.title,
    this.subtitle,
    this.trailing,
    this.onTap,
    this.accentColor,
  });

  @override
  State<AppleCompactCard> createState() => _AppleCompactCardState();
}

class _AppleCompactCardState extends State<AppleCompactCard> {
  bool _isPressed = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) {
        if (widget.onTap != null) {
          setState(() => _isPressed = true);
          HapticFeedback.selectionClick();
        }
      },
      onTapUp: (_) => setState(() => _isPressed = false),
      onTapCancel: () => setState(() => _isPressed = false),
      onTap: widget.onTap,
      child: AnimatedContainer(
        duration: AppleTheme.durationFast,
        curve: Curves.easeInOut,
        margin: const EdgeInsets.symmetric(
          horizontal: AppleTheme.spacing16,
          vertical: AppleTheme.spacing4,
        ),
        padding: const EdgeInsets.all(AppleTheme.spacing16),
        decoration: BoxDecoration(
          color: _isPressed
              ? AppleTheme.glassLightActive
              : AppleTheme.glassLight,
          border: Border.all(
            color: AppleTheme.glassLightBorder,
            width: 1,
          ),
          borderRadius: AppleTheme.radiusMedium,
          boxShadow: _isPressed ? [] : AppleTheme.cardShadows,
        ),
        child: Row(
          children: [
            // Icon
            if (widget.icon != null) ...[
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: (widget.accentColor ?? AppleTheme.appleBlue)
                      .withOpacity(0.2),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Icon(
                  widget.icon,
                  color: widget.accentColor ?? AppleTheme.appleBlue,
                  size: 20,
                ),
              ),
              const SizedBox(width: AppleTheme.spacing12),
            ],

            // Title and subtitle
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    widget.title,
                    style: AppleTheme.callout.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  if (widget.subtitle != null) ...[
                    const SizedBox(height: 2),
                    Text(
                      widget.subtitle!,
                      style: AppleTheme.footnote.copyWith(
                        color: Colors.white.withOpacity(0.6),
                      ),
                    ),
                  ],
                ],
              ),
            ),

            // Trailing
            if (widget.trailing != null) ...[
              const SizedBox(width: AppleTheme.spacing8),
              widget.trailing!,
            ],
          ],
        ),
      ),
    );
  }
}
