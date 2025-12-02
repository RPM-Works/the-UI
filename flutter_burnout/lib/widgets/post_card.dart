import 'package:flutter/material.dart';
import '../constants/app_colors.dart';

/// Reusable card widget for displaying car posts
class PostCard extends StatelessWidget {
  final String username;
  final String carModel;
  final String? imageUrl;
  final String? modifications;
  final VoidCallback? onTap;

  const PostCard({
    super.key,
    required this.username,
    required this.carModel,
    this.imageUrl,
    this.modifications,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: AppColors.cardBackground,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: AppColors.borderBlue,
            width: 2.5,
          ),
          boxShadow: [
            BoxShadow(
              color: AppColors.blueShadow,
              blurRadius: 15,
              spreadRadius: 0,
            ),
          ],
        ),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Profile section with car image
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Car image
                  if (imageUrl != null)
                    Container(
                      width: 150,
                      height: 120,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(8),
                        color: AppColors.darkGray,
                      ),
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(8),
                        child: Image.network(
                          imageUrl!,
                          fit: BoxFit.cover,
                          errorBuilder: (context, error, stackTrace) {
                            return Container(
                              color: AppColors.darkGray,
                              child: const Icon(
                                Icons.directions_car,
                                color: AppColors.primaryBlue,
                                size: 48,
                              ),
                            );
                          },
                        ),
                      ),
                    ),
                  const SizedBox(width: 16),
                  // Profile info
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          username,
                          style: Theme.of(context).textTheme.headlineMedium,
                        ),
                        const SizedBox(height: 8),
                        Text(
                          carModel,
                          style: Theme.of(context).textTheme.bodyMedium,
                        ),
                      ],
                    ),
                  ),
                ],
              ),

              // Modifications section
              if (modifications != null) ...[
                const SizedBox(height: 12),
                Text(
                  'Modifications',
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                        fontSize: 16,
                      ),
                ),
                const SizedBox(height: 8),
                Text(
                  modifications!,
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: AppColors.textWhite,
                        fontSize: 13,
                      ),
                ),
              ],

              // Divider
              const SizedBox(height: 12),
              Container(
                height: 2,
                decoration: BoxDecoration(
                  color: AppColors.borderBlue,
                  boxShadow: [
                    BoxShadow(
                      color: AppColors.blueShadow,
                      blurRadius: 8,
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
