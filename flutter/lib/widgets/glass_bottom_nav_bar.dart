import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'dart:ui';
import '../theme/app_theme.dart';

/// Apple-style floating dock navigation bar with glassmorphism
class GlassBottomNavBar extends StatefulWidget {
  final int currentIndex;
  final Function(int) onTap;

  const GlassBottomNavBar({
    Key? key,
    required this.currentIndex,
    required this.onTap,
  }) : super(key: key);

  @override
  State<GlassBottomNavBar> createState() => _GlassBottomNavBarState();
}

class _GlassBottomNavBarState extends State<GlassBottomNavBar>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  int _tappedIndex = -1;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
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

    return Container(
      height: 90,
      margin: const EdgeInsets.only(bottom: 20, left: 20, right: 20),
      decoration: BoxDecoration(
        borderRadius: AppTheme.navBarRadius,
        boxShadow: AppTheme.elevationShadow,
      ),
      child: ClipRRect(
        borderRadius: AppTheme.navBarRadius,
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
          child: Container(
            decoration: BoxDecoration(
              color: isDark
                  ? Colors.black.withOpacity(0.3)
                  : Colors.white.withOpacity(0.2),
              border: Border.all(
                color: Colors.white.withOpacity(0.3),
                width: 1,
              ),
              borderRadius: AppTheme.navBarRadius,
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                _buildNavItem(
                  icon: FontAwesomeIcons.route,
                  label: 'Routes',
                  index: 0,
                ),
                _buildNavItem(
                  icon: FontAwesomeIcons.house,
                  label: 'Home',
                  index: 1,
                ),
                _buildNavItem(
                  icon: FontAwesomeIcons.wrench,
                  label: 'Posts',
                  index: 2,
                ),
                _buildNavItem(
                  icon: FontAwesomeIcons.newspaper,
                  label: 'News',
                  index: 3,
                ),
                _buildNavItem(
                  icon: FontAwesomeIcons.comment,
                  label: 'Chat',
                  index: 4,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem({
    required IconData icon,
    required String label,
    required int index,
  }) {
    final isActive = widget.currentIndex == index;
    final isTapped = _tappedIndex == index;

    return GestureDetector(
      onTapDown: (_) {
        setState(() => _tappedIndex = index);
        _controller.forward();
      },
      onTapUp: (_) {
        setState(() => _tappedIndex = -1);
        _controller.reverse();
        widget.onTap(index);
      },
      onTapCancel: () {
        setState(() => _tappedIndex = -1);
        _controller.reverse();
      },
      child: AnimatedBuilder(
        animation: _controller,
        builder: (context, child) {
          final scale = isTapped
              ? 1.0 - (_controller.value * 0.15) // Spring physics scale
              : 1.0;

          return Transform.scale(
            scale: scale,
            child: Container(
              width: 60,
              padding: const EdgeInsets.symmetric(vertical: 12),
              decoration: BoxDecoration(
                gradient: isActive
                    ? LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [
                          AppTheme.primaryBlue.withOpacity(0.3),
                          AppTheme.primaryBlue.withOpacity(0.1),
                        ],
                      )
                    : null,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Icon with glow effect when active
                  Container(
                    decoration: BoxDecoration(
                      boxShadow: isActive
                          ? [
                              BoxShadow(
                                color: AppTheme.primaryBlue.withOpacity(0.6),
                                blurRadius: 12,
                                spreadRadius: 2,
                              ),
                            ]
                          : null,
                    ),
                    child: FaIcon(
                      icon,
                      size: 22,
                      color: isActive
                          ? AppTheme.primaryBlue
                          : Colors.white.withOpacity(0.6),
                    ),
                  ),
                  const SizedBox(height: 4),
                  // Label
                  Text(
                    label,
                    style: TextStyle(
                      fontSize: 10,
                      fontWeight: isActive ? FontWeight.w600 : FontWeight.w400,
                      color: isActive
                          ? AppTheme.primaryBlue
                          : Colors.white.withOpacity(0.6),
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
