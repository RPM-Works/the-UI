import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../constants/apple_theme.dart';

/// Apple-style floating dock bottom navigation bar
/// Features: glassmorphism, multi-layer shadows, smooth animations, depth effects
class AppleBottomNav extends StatefulWidget {
  final int currentIndex;
  final Function(int) onTap;

  const AppleBottomNav({
    super.key,
    required this.currentIndex,
    required this.onTap,
  });

  @override
  State<AppleBottomNav> createState() => _AppleBottomNavState();
}

class _AppleBottomNavState extends State<AppleBottomNav>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  int? _pressedIndex;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: AppleTheme.durationFast,
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _handleTap(int index) {
    // Haptic feedback
    HapticFeedback.lightImpact();

    // Trigger spring animation
    _controller.forward().then((_) => _controller.reverse());

    // Call parent callback
    widget.onTap(index);
  }

  void _handleTapDown(int index) {
    setState(() => _pressedIndex = index);
  }

  void _handleTapUp() {
    setState(() => _pressedIndex = null);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: AppleTheme.navBarHeight,
      margin: const EdgeInsets.only(
        bottom: AppleTheme.spacing20,
        left: AppleTheme.spacing20,
        right: AppleTheme.spacing20,
      ),
      decoration: BoxDecoration(
        borderRadius: AppleTheme.radiusPill,
        boxShadow: AppleTheme.floatingShadows,
      ),
      child: ClipRRect(
        borderRadius: AppleTheme.radiusPill,
        child: BackdropFilter(
          filter: AppleTheme.standardBlur,
          child: Container(
            decoration: BoxDecoration(
              color: AppleTheme.glassLight,
              border: Border.all(
                color: AppleTheme.glassLightBorder,
                width: 1,
              ),
              borderRadius: AppleTheme.radiusPill,
            ),
            child: SafeArea(
              top: false,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  _NavItem(
                    icon: Icons.map_outlined,
                    label: 'Routes',
                    isSelected: widget.currentIndex == 0,
                    isPressed: _pressedIndex == 0,
                    onTap: () => _handleTap(0),
                    onTapDown: () => _handleTapDown(0),
                    onTapUp: _handleTapUp,
                  ),
                  _NavItem(
                    icon: Icons.home_outlined,
                    label: 'Home',
                    isSelected: widget.currentIndex == 1,
                    isPressed: _pressedIndex == 1,
                    onTap: () => _handleTap(1),
                    onTapDown: () => _handleTapDown(1),
                    onTapUp: _handleTapUp,
                  ),
                  _NavItem(
                    icon: FontAwesomeIcons.wrench,
                    label: 'Posts',
                    isSelected: widget.currentIndex == 2,
                    isPressed: _pressedIndex == 2,
                    onTap: () => _handleTap(2),
                    onTapDown: () => _handleTapDown(2),
                    onTapUp: _handleTapUp,
                  ),
                  _NavItem(
                    icon: Icons.article_outlined,
                    label: 'News',
                    isSelected: widget.currentIndex == 3,
                    isPressed: _pressedIndex == 3,
                    onTap: () => _handleTap(3),
                    onTapDown: () => _handleTapDown(3),
                    onTapUp: _handleTapUp,
                  ),
                  _NavItem(
                    icon: Icons.chat_bubble_outline,
                    label: 'Chat',
                    isSelected: widget.currentIndex == 4,
                    isPressed: _pressedIndex == 4,
                    onTap: () => _handleTap(4),
                    onTapDown: () => _handleTapDown(4),
                    onTapUp: _handleTapUp,
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

/// Individual navigation item with spring animation
class _NavItem extends StatefulWidget {
  final IconData icon;
  final String label;
  final bool isSelected;
  final bool isPressed;
  final VoidCallback onTap;
  final VoidCallback onTapDown;
  final VoidCallback onTapUp;

  const _NavItem({
    required this.icon,
    required this.label,
    required this.isSelected,
    required this.isPressed,
    required this.onTap,
    required this.onTapDown,
    required this.onTapUp,
  });

  @override
  State<_NavItem> createState() => _NavItemState();
}

class _NavItemState extends State<_NavItem>
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

  @override
  void didUpdateWidget(_NavItem oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.isPressed && !oldWidget.isPressed) {
      _scaleController.forward();
    } else if (!widget.isPressed && oldWidget.isPressed) {
      _scaleController.reverse();
    }
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: widget.onTap,
      onTapDown: (_) => widget.onTapDown(),
      onTapUp: (_) => widget.onTapUp(),
      onTapCancel: widget.onTapUp,
      behavior: HitTestBehavior.opaque,
      child: AnimatedBuilder(
        animation: _scaleAnimation,
        builder: (context, child) {
          return Transform.scale(
            scale: _scaleAnimation.value,
            child: Container(
              width: AppleTheme.minTouchTarget + 8,
              height: AppleTheme.minTouchTarget + 8,
              padding: const EdgeInsets.all(AppleTheme.spacing8),
              decoration: widget.isSelected
                  ? BoxDecoration(
                      borderRadius: AppleTheme.radiusSmall,
                      gradient: AppleTheme.glowGradient,
                    )
                  : null,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Icon with glow effect when selected
                  Container(
                    decoration: widget.isSelected
                        ? BoxDecoration(
                            boxShadow: [
                              BoxShadow(
                                color: AppleTheme.appleBlue.withOpacity(0.5),
                                blurRadius: 8,
                                spreadRadius: 2,
                              ),
                            ],
                          )
                        : null,
                    child: Icon(
                      widget.icon,
                      size: 24,
                      color: widget.isSelected
                          ? AppleTheme.appleBlue
                          : Colors.white.withOpacity(0.6),
                    ),
                  ),
                  const SizedBox(height: 2),
                  // Label text
                  Text(
                    widget.label,
                    style: AppleTheme.caption2.copyWith(
                      color: widget.isSelected
                          ? AppleTheme.appleBlue
                          : Colors.white.withOpacity(0.6),
                      fontWeight: widget.isSelected
                          ? FontWeight.w600
                          : FontWeight.w400,
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
