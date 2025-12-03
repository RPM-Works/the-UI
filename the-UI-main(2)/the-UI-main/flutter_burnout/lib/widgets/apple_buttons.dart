import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../constants/apple_theme.dart';

// =============================================================================
// PRIMARY BUTTON - Apple Blue gradient with glow
// =============================================================================

/// Primary action button with Apple Blue gradient and soft glow
/// Features: gradient background, inner glow, shadow, press animation
class ApplePrimaryButton extends StatefulWidget {
  final String text;
  final VoidCallback onPressed;
  final double? width;
  final double height;
  final IconData? icon;
  final bool isLoading;

  const ApplePrimaryButton({
    super.key,
    required this.text,
    required this.onPressed,
    this.width,
    this.height = AppleTheme.buttonHeight,
    this.icon,
    this.isLoading = false,
  });

  @override
  State<ApplePrimaryButton> createState() => _ApplePrimaryButtonState();
}

class _ApplePrimaryButtonState extends State<ApplePrimaryButton> {
  bool _isPressed = false;

  void _handleTapDown(TapDownDetails details) {
    setState(() => _isPressed = true);
    HapticFeedback.lightImpact();
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
      onTap: widget.isLoading ? null : widget.onPressed,
      child: AnimatedContainer(
        duration: AppleTheme.durationFast,
        curve: AppleTheme.spring,
        width: widget.width,
        height: widget.height,
        decoration: AppleTheme.primaryButtonDecoration(
          isPressed: _isPressed,
        ).copyWith(
          boxShadow: _isPressed ? [] : AppleTheme.buttonShadows,
        ),
        child: Material(
          color: Colors.transparent,
          child: Container(
            alignment: Alignment.center,
            padding: const EdgeInsets.symmetric(
              horizontal: AppleTheme.spacing20,
            ),
            child: widget.isLoading
                ? const SizedBox(
                    width: 24,
                    height: 24,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                    ),
                  )
                : Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      if (widget.icon != null) ...[
                        Icon(
                          widget.icon,
                          color: Colors.white,
                          size: 20,
                        ),
                        const SizedBox(width: AppleTheme.spacing8),
                      ],
                      Text(
                        widget.text,
                        style: AppleTheme.headline.copyWith(
                          color: Colors.white,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
          ),
        ),
      ),
    );
  }
}

// =============================================================================
// SECONDARY BUTTON - Glass style with blur
// =============================================================================

/// Secondary button with glassmorphic design
/// Features: semi-transparent, backdrop blur, subtle elevation, press animation
class AppleSecondaryButton extends StatefulWidget {
  final String text;
  final VoidCallback onPressed;
  final double? width;
  final double height;
  final IconData? icon;

  const AppleSecondaryButton({
    super.key,
    required this.text,
    required this.onPressed,
    this.width,
    this.height = AppleTheme.buttonHeight,
    this.icon,
  });

  @override
  State<AppleSecondaryButton> createState() => _AppleSecondaryButtonState();
}

class _AppleSecondaryButtonState extends State<AppleSecondaryButton> {
  bool _isPressed = false;

  void _handleTapDown(TapDownDetails details) {
    setState(() => _isPressed = true);
    HapticFeedback.lightImpact();
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
      onTap: widget.onPressed,
      child: AnimatedOpacity(
        duration: AppleTheme.durationFast,
        opacity: _isPressed ? 0.7 : 1.0,
        child: Container(
          width: widget.width,
          height: widget.height,
          decoration: BoxDecoration(
            borderRadius: AppleTheme.radiusMedium,
            boxShadow: AppleTheme.cardShadows,
          ),
          child: ClipRRect(
            borderRadius: AppleTheme.radiusMedium,
            child: BackdropFilter(
              filter: AppleTheme.standardBlur,
              child: Container(
                decoration: BoxDecoration(
                  color: AppleTheme.glassLight,
                  border: Border.all(
                    color: AppleTheme.glassLightBorder,
                    width: 1,
                  ),
                  borderRadius: AppleTheme.radiusMedium,
                ),
                alignment: Alignment.center,
                padding: const EdgeInsets.symmetric(
                  horizontal: AppleTheme.spacing20,
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    if (widget.icon != null) ...[
                      Icon(
                        widget.icon,
                        color: Colors.white,
                        size: 20,
                      ),
                      const SizedBox(width: AppleTheme.spacing8),
                    ],
                    Text(
                      widget.text,
                      style: AppleTheme.headline.copyWith(
                        color: Colors.white,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

// =============================================================================
// ICON BUTTON - Circular glass with spring animation
// =============================================================================

/// Icon button with circular glass effect and spring animation
/// Features: circular shape, glass background, spring scale on press, haptic feedback
class AppleIconButton extends StatefulWidget {
  final IconData icon;
  final VoidCallback onPressed;
  final double size;
  final Color? iconColor;
  final Color? backgroundColor;

  const AppleIconButton({
    super.key,
    required this.icon,
    required this.onPressed,
    this.size = 44.0,
    this.iconColor,
    this.backgroundColor,
  });

  @override
  State<AppleIconButton> createState() => _AppleIconButtonState();
}

class _AppleIconButtonState extends State<AppleIconButton>
    with SingleTickerProviderStateMixin {
  late AnimationController _scaleController;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _scaleController = AnimationController(
      vsync: this,
      duration: AppleTheme.durationFast,
    );
    _scaleAnimation = Tween<double>(begin: 1.0, end: 0.9).animate(
      CurvedAnimation(
        parent: _scaleController,
        curve: AppleTheme.spring,
      ),
    );
  }

  @override
  void dispose() {
    _scaleController.dispose();
    super.dispose();
  }

  void _handleTapDown(TapDownDetails details) {
    _scaleController.forward();
    HapticFeedback.lightImpact();
  }

  void _handleTapUp(TapUpDetails details) {
    _scaleController.reverse();
  }

  void _handleTapCancel() {
    _scaleController.reverse();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: _handleTapDown,
      onTapUp: _handleTapUp,
      onTapCancel: _handleTapCancel,
      onTap: widget.onPressed,
      child: AnimatedBuilder(
        animation: _scaleAnimation,
        builder: (context, child) {
          return Transform.scale(
            scale: _scaleAnimation.value,
            child: Container(
              width: widget.size,
              height: widget.size,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                boxShadow: AppleTheme.cardShadows,
              ),
              child: ClipOval(
                child: BackdropFilter(
                  filter: AppleTheme.standardBlur,
                  child: Container(
                    decoration: BoxDecoration(
                      color: widget.backgroundColor ?? AppleTheme.glassLight,
                      border: Border.all(
                        color: AppleTheme.glassLightBorder,
                        width: 1,
                      ),
                      shape: BoxShape.circle,
                    ),
                    child: Icon(
                      widget.icon,
                      color: widget.iconColor ?? Colors.white,
                      size: widget.size * 0.45,
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

// =============================================================================
// PILL BUTTON - Small rounded button for tags/chips
// =============================================================================

/// Small pill-shaped button for tags, filters, or chips
class ApplePillButton extends StatefulWidget {
  final String text;
  final VoidCallback onPressed;
  final bool isSelected;
  final IconData? icon;

  const ApplePillButton({
    super.key,
    required this.text,
    required this.onPressed,
    this.isSelected = false,
    this.icon,
  });

  @override
  State<ApplePillButton> createState() => _ApplePillButtonState();
}

class _ApplePillButtonState extends State<ApplePillButton> {
  bool _isPressed = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) {
        setState(() => _isPressed = true);
        HapticFeedback.selectionClick();
      },
      onTapUp: (_) => setState(() => _isPressed = false),
      onTapCancel: () => setState(() => _isPressed = false),
      onTap: widget.onPressed,
      child: AnimatedContainer(
        duration: AppleTheme.durationFast,
        curve: AppleTheme.fastOutSlowIn,
        padding: const EdgeInsets.symmetric(
          horizontal: AppleTheme.spacing16,
          vertical: AppleTheme.spacing8,
        ),
        decoration: BoxDecoration(
          color: widget.isSelected
              ? AppleTheme.appleBlue
              : AppleTheme.glassLight,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: widget.isSelected
                ? AppleTheme.appleBlue
                : AppleTheme.glassLightBorder,
            width: 1,
          ),
          boxShadow: widget.isSelected ? AppleTheme.buttonShadows : [],
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (widget.icon != null) ...[
              Icon(
                widget.icon,
                size: 14,
                color: widget.isSelected
                    ? Colors.white
                    : Colors.white.withOpacity(0.7),
              ),
              const SizedBox(width: 4),
            ],
            Text(
              widget.text,
              style: AppleTheme.footnote.copyWith(
                color: widget.isSelected
                    ? Colors.white
                    : Colors.white.withOpacity(0.7),
                fontWeight: widget.isSelected
                    ? FontWeight.w600
                    : FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
