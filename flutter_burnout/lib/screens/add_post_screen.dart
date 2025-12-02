import 'package:flutter/material.dart';
import '../constants/app_colors.dart';

/// Add new post screen
class AddPostScreen extends StatelessWidget {
  const AddPostScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.backgroundColor,
      body: SafeArea(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 120,
                height: 120,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: AppColors.primaryBlue,
                    width: 3,
                  ),
                ),
                child: const Icon(
                  Icons.add_circle_outline,
                  color: AppColors.primaryBlue,
                  size: 60,
                ),
              ),
              const SizedBox(height: 24),
              Text(
                'Create Post',
                style: Theme.of(context).textTheme.headlineLarge,
              ),
              const SizedBox(height: 16),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 32),
                child: Text(
                  'Share your car build, events, or automotive content',
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: AppColors.textGray,
                      ),
                  textAlign: TextAlign.center,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
