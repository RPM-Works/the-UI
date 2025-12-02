import 'package:flutter/material.dart';
import '../constants/app_colors.dart';
import '../widgets/news_card.dart';

/// Home Feed screen with personalized greeting and search
class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.backgroundColor,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 20),

              // Profile picture and greeting
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Row(
                  children: [
                    Container(
                      width: 80,
                      height: 80,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        border: Border.all(
                          color: AppColors.primaryBlue,
                          width: 3,
                        ),
                        color: AppColors.darkGray,
                      ),
                      child: const Icon(
                        Icons.person,
                        color: AppColors.primaryBlue,
                        size: 40,
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 16),

              // Greeting
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Text(
                  'Hi, Chris',
                  style: Theme.of(context).textTheme.displayMedium?.copyWith(
                        color: AppColors.primaryBlue,
                        fontSize: 32,
                      ),
                ),
              ),

              const SizedBox(height: 8),

              // Question
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Text(
                  'Whens the next drive?',
                  style: Theme.of(context).textTheme.displayMedium?.copyWith(
                        fontSize: 28,
                      ),
                ),
              ),

              const SizedBox(height: 24),

              // Search bar
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Container(
                  decoration: BoxDecoration(
                    color: AppColors.textWhite,
                    borderRadius: BorderRadius.circular(24),
                  ),
                  child: TextField(
                    decoration: InputDecoration(
                      hintText: 'Search',
                      hintStyle: Theme.of(context).textTheme.bodyLarge?.copyWith(
                            color: AppColors.textGray,
                          ),
                      prefixIcon: const Icon(
                        Icons.search,
                        color: AppColors.textGray,
                      ),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(24),
                        borderSide: BorderSide.none,
                      ),
                      filled: true,
                      fillColor: AppColors.textWhite,
                      contentPadding: const EdgeInsets.symmetric(
                        horizontal: 20,
                        vertical: 16,
                      ),
                    ),
                    style: const TextStyle(color: AppColors.backgroundColor),
                  ),
                ),
              ),

              const SizedBox(height: 32),

              // News section
              const NewsCard(
                heading: 'News:\nHeading',
                description:
                    'Keep up to date with latest car news, reviews, galleries, and announcements from the TG TV team on our Car News page. The Top Gear Editorial team publishes several news articles daily to make sure you are up to speed with the latest developments in the car motoring industry.',
              ),

              const SizedBox(height: 16),

              // Additional content can go here
              // For example, more news cards, featured posts, etc.
            ],
          ),
        ),
      ),
    );
  }
}
