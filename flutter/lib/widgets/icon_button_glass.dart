import 'package:flutter/material.dart';
import 'dart:ui';
import '../theme/app_theme.dart';

/// Circular glass icon button with spring animation
class IconButtonGlass extends StatefulWidget {
  final IconData icon;
  final VoidCallback onPressed;
  final double size;
  final Color? iconColor;
  final bool isPrimary;

  const IconButtonGlass({
    Key? key,
    required this.icon,
    required this.onPressed,
    this.size = 48,
    this.iconColor,
    this.isPrimary = false,
  }) : super(key: key);

  @override
  State<IconButtonGlass> createState() => _IconButtonGlassState();
}

class _IconButtonGlassState extends State<IconButtonGlass>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;
  bool _isPressed = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );

    // Spring animation
    _scaleAnimation = Tween<double>(begin: 1.0, end: 0.85).animate(
      CurvedAnimation(
        parent: _controller,
        curve: Curves.elasticOut,
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Transform.scale(
          scale: _scaleAnimation.value,
          child: GestureDetector(
            onTapDown: (_) {
              setState(() => _isPressed = true);
              _controller.forward();
            },
            onTapUp: (_) {
              setState(() => _isPressed = false);
              _controller.reverse();
              widget.onPressed();
            },
            onTapCancel: () {
              setState(() => _isPressed = false);
              _controller.reverse();
            },
            child: Container(
              width: widget.size,
              height: widget.size,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                boxShadow: widget.isPrimary
                    ? [
                        BoxShadow(
                          color: AppTheme.primaryBlue.withOpacity(0.3),
                          blurRadius: 12,
                          offset: const Offset(0, 4),
                        ),
                      ]
                    : [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.1),
                          blurRadius: 8,
                          offset: const Offset(0, 4),
                        ),
                      ],
              ),
              child: widget.isPrimary
                  ? _buildPrimaryButton(isDark)
                  : _buildGlassButton(isDark),
            ),
          ),
        );
      },
    );
  }

  Widget _buildPrimaryButton(bool isDark) {
    return Container(
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        gradient: AppTheme.primaryGradient,
      ),
      child: Material(
        color: Colors.transparent,
        child: Container(
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [
                Colors.white.withOpacity(0.3),
                Colors.transparent,
              ],
              stops: const [0.0, 0.5],
            ),
          ),
          child: Center(
            child: Icon(
              widget.icon,
              color: widget.iconColor ?? Colors.white,
              size: widget.size * 0.45,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildGlassButton(bool isDark) {
    return ClipOval(
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
        child: Container(
          decoration: BoxDecoration(
            color: isDark
                ? Colors.white.withOpacity(0.1)
                : Colors.white.withOpacity(0.3),
            border: Border.all(
              color: Colors.white.withOpacity(0.2),
              width: 1,
            ),
            shape: BoxShape.circle,
          ),
          child: Center(
            child: Icon(
              widget.icon,
              color: widget.iconColor ??
                  (isDark ? Colors.white : AppTheme.primaryBlue),
              size: widget.size * 0.45,
            ),
          ),
        ),
      ),
    );
  }
}
