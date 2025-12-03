import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../constants/apple_theme.dart';

// =============================================================================
// GLASS CONTAINER - Reusable glassmorphic container
// =============================================================================

/// Glassmorphic container with backdrop blur and light border
/// Features: backdrop blur, semi-transparent background, light border, soft shadow
class AppleGlassContainer extends StatelessWidget {
  final Widget child;
  final double? width;
  final double? height;
  final EdgeInsetsGeometry? padding;
  final EdgeInsetsGeometry? margin;
  final BorderRadius? borderRadius;
  final Color? backgroundColor;
  final Color? borderColor;
  final List<BoxShadow>? boxShadow;
  final ImageFilter? blur;

  const AppleGlassContainer({
    super.key,
    required this.child,
    this.width,
    this.height,
    this.padding,
    this.margin,
    this.borderRadius,
    this.backgroundColor,
    this.borderColor,
    this.boxShadow,
    this.blur,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      height: height,
      margin: margin,
      decoration: BoxDecoration(
        borderRadius: borderRadius ?? AppleTheme.radiusMedium,
        boxShadow: boxShadow ?? AppleTheme.cardShadows,
      ),
      child: ClipRRect(
        borderRadius: borderRadius ?? AppleTheme.radiusMedium,
        child: BackdropFilter(
          filter: blur ?? AppleTheme.standardBlur,
          child: Container(
            padding: padding,
            decoration: BoxDecoration(
              color: backgroundColor ?? AppleTheme.glassLight,
              border: Border.all(
                color: borderColor ?? AppleTheme.glassLightBorder,
                width: 1,
              ),
              borderRadius: borderRadius ?? AppleTheme.radiusMedium,
            ),
            child: child,
          ),
        ),
      ),
    );
  }
}

// =============================================================================
// SEARCH BAR - Apple-style search field
// =============================================================================

/// Apple-style search bar with glassmorphism
/// Features: pill shape, glass background, subtle inset shadow,
/// magnifying glass icon, clear button, focus animation
class AppleSearchBar extends StatefulWidget {
  final TextEditingController? controller;
  final String placeholder;
  final ValueChanged<String>? onChanged;
  final VoidCallback? onClear;
  final bool autofocus;

  const AppleSearchBar({
    super.key,
    this.controller,
    this.placeholder = 'Search',
    this.onChanged,
    this.onClear,
    this.autofocus = false,
  });

  @override
  State<AppleSearchBar> createState() => _AppleSearchBarState();
}

class _AppleSearchBarState extends State<AppleSearchBar>
    with SingleTickerProviderStateMixin {
  late TextEditingController _controller;
  late AnimationController _focusController;
  late Animation<double> _scaleAnimation;
  final FocusNode _focusNode = FocusNode();
  bool _isFocused = false;
  bool _hasText = false;

  @override
  void initState() {
    super.initState();
    _controller = widget.controller ?? TextEditingController();
    _hasText = _controller.text.isNotEmpty;

    _focusController = AnimationController(
      vsync: this,
      duration: AppleTheme.durationMedium,
    );

    _scaleAnimation = Tween<double>(begin: 1.0, end: 1.02).animate(
      CurvedAnimation(
        parent: _focusController,
        curve: Curves.easeInOut,
      ),
    );

    _focusNode.addListener(() {
      setState(() {
        _isFocused = _focusNode.hasFocus;
        if (_isFocused) {
          _focusController.forward();
        } else {
          _focusController.reverse();
        }
      });
    });

    _controller.addListener(() {
      setState(() {
        _hasText = _controller.text.isNotEmpty;
      });
    });
  }

  @override
  void dispose() {
    _focusNode.dispose();
    _focusController.dispose();
    if (widget.controller == null) {
      _controller.dispose();
    }
    super.dispose();
  }

  void _handleClear() {
    _controller.clear();
    widget.onClear?.call();
    widget.onChanged?.call('');
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _scaleAnimation,
      builder: (context, child) {
        return Transform.scale(
          scale: _scaleAnimation.value,
          child: Container(
            height: 48,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(24),
              boxShadow: _isFocused
                  ? [
                      BoxShadow(
                        color: AppleTheme.appleBlue.withOpacity(0.2),
                        blurRadius: 12,
                        spreadRadius: 2,
                      ),
                    ]
                  : AppleTheme.cardShadows,
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(24),
              child: BackdropFilter(
                filter: AppleTheme.standardBlur,
                child: Container(
                  decoration: BoxDecoration(
                    color: AppleTheme.glassLight,
                    border: Border.all(
                      color: _isFocused
                          ? AppleTheme.appleBlue.withOpacity(0.5)
                          : AppleTheme.glassLightBorder,
                      width: _isFocused ? 2 : 1,
                    ),
                    borderRadius: BorderRadius.circular(24),
                  ),
                  child: Row(
                    children: [
                      // Search icon
                      const Padding(
                        padding: EdgeInsets.symmetric(
                          horizontal: AppleTheme.spacing16,
                        ),
                        child: Icon(
                          Icons.search,
                          color: Colors.white60,
                          size: 20,
                        ),
                      ),

                      // Text field
                      Expanded(
                        child: TextField(
                          controller: _controller,
                          focusNode: _focusNode,
                          autofocus: widget.autofocus,
                          onChanged: widget.onChanged,
                          style: AppleTheme.callout.copyWith(
                            color: Colors.white,
                          ),
                          decoration: InputDecoration(
                            hintText: widget.placeholder,
                            hintStyle: AppleTheme.callout.copyWith(
                              color: Colors.white.withOpacity(0.5),
                            ),
                            border: InputBorder.none,
                            contentPadding: EdgeInsets.zero,
                          ),
                        ),
                      ),

                      // Clear button (appears when text is entered)
                      AnimatedOpacity(
                        opacity: _hasText ? 1.0 : 0.0,
                        duration: AppleTheme.durationFast,
                        child: GestureDetector(
                          onTap: _hasText ? _handleClear : null,
                          child: Container(
                            padding: const EdgeInsets.all(8),
                            margin: const EdgeInsets.only(
                              right: AppleTheme.spacing8,
                            ),
                            decoration: BoxDecoration(
                              color: Colors.white.withOpacity(0.2),
                              shape: BoxShape.circle,
                            ),
                            child: const Icon(
                              Icons.close,
                              color: Colors.white,
                              size: 16,
                            ),
                          ),
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
    );
  }
}

// =============================================================================
// GLASS SECTION - Section with header and glass background
// =============================================================================

/// Glass section container with optional header
class AppleGlassSection extends StatelessWidget {
  final String? title;
  final Widget? trailing;
  final Widget child;
  final EdgeInsetsGeometry? padding;
  final EdgeInsetsGeometry? margin;

  const AppleGlassSection({
    super.key,
    this.title,
    this.trailing,
    required this.child,
    this.padding,
    this.margin,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: margin ??
          const EdgeInsets.symmetric(
            horizontal: AppleTheme.spacing16,
            vertical: AppleTheme.spacing8,
          ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          if (title != null || trailing != null)
            Padding(
              padding: const EdgeInsets.only(
                left: AppleTheme.spacing4,
                right: AppleTheme.spacing4,
                bottom: AppleTheme.spacing12,
              ),
              child: Row(
                children: [
                  if (title != null)
                    Expanded(
                      child: Text(
                        title!,
                        style: AppleTheme.title3.copyWith(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  if (trailing != null) trailing!,
                ],
              ),
            ),

          // Glass container
          AppleGlassContainer(
            padding: padding ?? const EdgeInsets.all(AppleTheme.spacing16),
            child: child,
          ),
        ],
      ),
    );
  }
}

// =============================================================================
// STAT DISPLAY - Glass container for displaying statistics
// =============================================================================

/// Glass container for displaying a statistic with icon
class AppleStatDisplay extends StatelessWidget {
  final String label;
  final String value;
  final IconData icon;
  final Color? accentColor;

  const AppleStatDisplay({
    super.key,
    required this.label,
    required this.value,
    required this.icon,
    this.accentColor,
  });

  @override
  Widget build(BuildContext context) {
    final color = accentColor ?? AppleTheme.appleBlue;

    return AppleGlassContainer(
      padding: const EdgeInsets.all(AppleTheme.spacing16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: color.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Icon(
                  icon,
                  color: color,
                  size: 20,
                ),
              ),
              const Spacer(),
            ],
          ),
          const SizedBox(height: AppleTheme.spacing12),
          Text(
            value,
            style: AppleTheme.title1.copyWith(
              color: Colors.white,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            label,
            style: AppleTheme.footnote.copyWith(
              color: Colors.white.withOpacity(0.6),
            ),
          ),
        ],
      ),
    );
  }
}

// =============================================================================
// INFO BADGE - Small glass badge for displaying info
// =============================================================================

/// Small glass badge for displaying information
class AppleInfoBadge extends StatelessWidget {
  final String text;
  final IconData? icon;
  final Color? color;

  const AppleInfoBadge({
    super.key,
    required this.text,
    this.icon,
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(12),
      child: BackdropFilter(
        filter: AppleTheme.lightBlur,
        child: Container(
          padding: const EdgeInsets.symmetric(
            horizontal: 12,
            vertical: 6,
          ),
          decoration: BoxDecoration(
            color: (color ?? AppleTheme.appleBlue).withOpacity(0.2),
            border: Border.all(
              color: (color ?? AppleTheme.appleBlue).withOpacity(0.3),
              width: 1,
            ),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              if (icon != null) ...[
                Icon(
                  icon,
                  size: 14,
                  color: color ?? AppleTheme.appleBlue,
                ),
                const SizedBox(width: 4),
              ],
              Text(
                text,
                style: AppleTheme.caption1.copyWith(
                  color: color ?? AppleTheme.appleBlue,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
