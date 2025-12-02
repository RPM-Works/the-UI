import 'package:flutter/material.dart';
import '../constants/app_colors.dart';

/// Custom bottom navigation bar matching the Burnout design
class BurnoutBottomNavBar extends StatelessWidget {
  final int currentIndex;
  final Function(int) onTap;

  const BurnoutBottomNavBar({
    super.key,
    required this.currentIndex,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        color: AppColors.backgroundColor,
        border: Border(
          top: BorderSide(
            color: AppColors.dividerColor,
            width: 1,
          ),
        ),
      ),
      child: SafeArea(
        child: Container(
          height: 70,
          padding: const EdgeInsets.only(bottom: 8),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _NavItem(
                icon: Icons.directions_car_outlined,
                isSelected: currentIndex == 0,
                onTap: () => onTap(0),
                label: 'Routes',
              ),
              _NavItem(
                icon: Icons.home_outlined,
                isSelected: currentIndex == 1,
                onTap: () => onTap(1),
                label: 'Home',
              ),
              _NavItem(
                icon: Icons.add_circle_outline,
                isSelected: currentIndex == 2,
                onTap: () => onTap(2),
                label: 'Add',
                isLarge: true,
              ),
              _NavItem(
                icon: Icons.article_outlined,
                isSelected: currentIndex == 3,
                onTap: () => onTap(3),
                label: 'News',
              ),
              _NavItem(
                icon: Icons.chat_bubble_outline,
                isSelected: currentIndex == 4,
                onTap: () => onTap(4),
                label: 'Chat',
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _NavItem extends StatelessWidget {
  final IconData icon;
  final bool isSelected;
  final VoidCallback onTap;
  final String label;
  final bool isLarge;

  const _NavItem({
    required this.icon,
    required this.isSelected,
    required this.onTap,
    required this.label,
    this.isLarge = false,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Container(
        padding: const EdgeInsets.all(8),
        child: Icon(
          icon,
          size: isLarge ? 36 : 28,
          color: isSelected ? AppColors.primaryBlue : AppColors.textGray,
        ),
      ),
    );
  }
}
