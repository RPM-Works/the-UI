import 'package:flutter/material.dart';
import '../constants/apple_theme.dart';
import '../widgets/apple_content_card.dart';

/// News screen showing automotive news and updates
class NewsScreen extends StatelessWidget {
  const NewsScreen({super.key});

  final List<Map<String, dynamic>> _news = const [
    {
      'title': 'New Nissan Z NISMO Announced',
      'source': 'AutoWeek',
      'time': '3h ago',
      'description':
          'Nissan reveals track-focused Z with 420hp twin-turbo V6, upgraded suspension, and aggressive aero package. The latest iteration brings serious performance upgrades.',
      'category': 'News',
    },
    {
      'title': 'Best Turbo Kits for GR Supra',
      'source': 'Speed Academy',
      'time': '6h ago',
      'description':
          'We test 5 popular turbo upgrades for the B58 engine. See which one made the most power and best value for your money.',
      'category': 'Tech',
    },
    {
      'title': 'Formula Drift Finals Recap',
      'source': 'Drift HQ',
      'time': '1d ago',
      'description':
          'Fredric Aasbo takes the championship with stunning final battle. Full highlights and interview inside. What a season!',
      'category': 'Racing',
    },
    {
      'title': 'Toyota GR Corolla Review',
      'source': 'Motor Trend',
      'time': '2d ago',
      'description':
          'Is the 300hp hot hatch worth the hype? We put it through its paces on the track and street to find out.',
      'category': 'Review',
    },
    {
      'title': 'E85 vs Pump Gas: The Truth',
      'source': 'Engineering Explained',
      'time': '3d ago',
      'description':
          'Deep dive into the science of E85 fuel. Power gains, costs, and everything you need to know before switching.',
      'category': 'Tech',
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 20),

            // Header
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Text(
                'News',
                style: TextStyle(
                  fontSize: 34,
                  fontWeight: FontWeight.bold,
                  color: AppleTheme.appleBlue,
                ),
              ),
            ),

            const SizedBox(height: 8),

            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Text(
                'Latest automotive news and updates',
                style: TextStyle(
                  fontSize: 17,
                  color: Colors.white.withOpacity(0.6),
                ),
              ),
            ),

            const SizedBox(height: 24),

            // News list
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.only(bottom: 100, left: 16, right: 16),
                itemCount: _news.length,
                itemBuilder: (context, index) {
                  final article = _news[index];
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 16),
                    child: AppleContentCard(
                      title: article['title']!,
                      subtitle: '${article['source']} • ${article['time']}',
                      description: article['description']!,
                      gradient: LinearGradient(
                        colors: _getNewsGradient(article['category']!),
                      ),
                      tags: [article['category']!],
                      onTap: () {
                        // Handle news tap
                      },
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  List<Color> _getNewsGradient(String category) {
    switch (category) {
      case 'News':
        return [
          AppleTheme.appleBlue.withOpacity(0.4),
          AppleTheme.applePurple.withOpacity(0.4),
        ];
      case 'Tech':
        return [
          AppleTheme.appleOrange.withOpacity(0.4),
          AppleTheme.appleRed.withOpacity(0.4),
        ];
      case 'Racing':
        return [
          AppleTheme.appleRed.withOpacity(0.4),
          AppleTheme.applePurple.withOpacity(0.4),
        ];
      case 'Review':
        return [
          AppleTheme.appleGreen.withOpacity(0.4),
          AppleTheme.appleBlue.withOpacity(0.4),
        ];
      default:
        return [
          AppleTheme.appleBlue.withOpacity(0.4),
          AppleTheme.appleGreen.withOpacity(0.4),
        ];
    }
  }
}
