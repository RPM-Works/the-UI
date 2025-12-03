import 'package:flutter/material.dart';
import '../constants/app_colors.dart';
import '../widgets/news_card.dart';

/// Car profile/detail screen showing car information and modifications
class CarProfileScreen extends StatelessWidget {
  const CarProfileScreen({super.key});

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

              // Profile header
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Row(
                  children: [
                    // Car image
                    Container(
                      width: 100,
                      height: 100,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        border: Border.all(
                          color: AppColors.primaryBlue,
                          width: 3,
                        ),
                        color: AppColors.darkGray,
                      ),
                      child: ClipOval(
                        child: Image.network(
                          'https://via.placeholder.com/100',
                          fit: BoxFit.cover,
                          errorBuilder: (context, error, stackTrace) {
                            return const Icon(
                              Icons.directions_car,
                              color: AppColors.primaryBlue,
                              size: 48,
                            );
                          },
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 16),

              // Username
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Text(
                  '@the_master_bender',
                  style: Theme.of(context).textTheme.headlineLarge,
                ),
              ),

              const SizedBox(height: 8),

              // Car model
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Text(
                  '2003 Bmw M3 Six Speed Manual',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
              ),

              const SizedBox(height: 24),

              // Modifications section
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Note for mods put a link to a full mods list?',
                      style: Theme.of(context).textTheme.bodySmall,
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Modifications',
                      style: Theme.of(context).textTheme.headlineMedium,
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Custom widebody, air suspension, independent throttle bodies, custom wheels, and carbon accents',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 24),

              // Accounts section
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Accounts',
                      style: Theme.of(context).textTheme.headlineMedium,
                    ),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        const Icon(
                          Icons.camera_alt,
                          color: AppColors.primaryBlue,
                          size: 20,
                        ),
                        const SizedBox(width: 8),
                        Text(
                          'The_masterbender123',
                          style: Theme.of(context).textTheme.bodyMedium,
                        ),
                      ],
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 32),

              // Blue placeholder box (matching the design)
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Container(
                  width: 150,
                  height: 150,
                  decoration: BoxDecoration(
                    color: AppColors.primaryBlue.withOpacity(0.3),
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(
                      color: AppColors.primaryBlue,
                      width: 2,
                    ),
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
            ],
          ),
        ),
      ),
    );
  }
}
