import 'package:flutter/material.dart';
import '../constants/app_colors.dart';

/// Circular group icon widget with optional image/logo
class GroupCircle extends StatelessWidget {
  final String? imageUrl;
  final String? label;
  final double size;
  final VoidCallback? onTap;
  final IconData? icon;

  const GroupCircle({
    super.key,
    this.imageUrl,
    this.label,
    this.size = 120,
    this.onTap,
    this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Column(
        children: [
          Container(
            width: size,
            height: size,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(
                color: AppColors.primaryBlue,
                width: 3,
              ),
              color: AppColors.cardBackground,
            ),
            child: imageUrl != null
                ? ClipOval(
                    child: Image.network(
                      imageUrl!,
                      fit: BoxFit.cover,
                      errorBuilder: (context, error, stackTrace) {
                        return _buildPlaceholder();
                      },
                    ),
                  )
                : _buildPlaceholder(),
          ),
          if (label != null) ...[
            const SizedBox(height: 8),
            Text(
              label!,
              style: Theme.of(context).textTheme.bodyMedium,
              textAlign: TextAlign.center,
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildPlaceholder() {
    return Container(
      decoration: const BoxDecoration(
        shape: BoxShape.circle,
        color: AppColors.primaryBlue,
      ),
      child: Center(
        child: Icon(
          icon ?? Icons.group,
          color: AppColors.textWhite,
          size: size * 0.4,
        ),
      ),
    );
  }
}
