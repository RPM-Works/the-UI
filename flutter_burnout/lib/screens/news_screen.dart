import 'package:flutter/material.dart';
import '../constants/app_colors.dart';
import '../widgets/news_card.dart';

/// News screen showing automotive news and updates
class NewsScreen extends StatelessWidget {
  const NewsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.backgroundColor,
      appBar: AppBar(
        title: const Text('Car News'),
      ),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.symmetric(vertical: 16),
          children: const [
            NewsCard(
              heading: 'Latest Updates',
              description:
                  'Keep up to date with latest car news, reviews, galleries, and announcements from the TG TV team on our Car News page.',
            ),
            NewsCard(
              heading: 'Featured Story',
              description:
                  'The Top Gear Editorial team publishes several news articles daily to make sure you are up to speed with the latest developments in the car motoring industry.',
            ),
            NewsCard(
              heading: 'Community Highlights',
              description:
                  'Check out the amazing builds and events from our community members around the world.',
            ),
          ],
        ),
      ),
    );
  }
}
