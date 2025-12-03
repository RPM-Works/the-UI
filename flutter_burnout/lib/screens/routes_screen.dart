import 'package:flutter/material.dart';
import '../constants/apple_theme.dart';
import '../widgets/apple_huds.dart';
import '../widgets/apple_content_card.dart';

/// Routes/Map screen with HUD overlays
class RoutesScreen extends StatefulWidget {
  const RoutesScreen({super.key});

  @override
  State<RoutesScreen> createState() => _RoutesScreenState();
}

class _RoutesScreenState extends State<RoutesScreen> {
  bool _isHUDExpanded = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: SafeArea(
        child: Stack(
          children: [
            // Map placeholder (will be replaced with actual map)
            Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    Colors.grey.shade900,
                    Colors.black,
                  ],
                ),
              ),
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      Icons.map,
                      size: 100,
                      color: AppleTheme.appleBlue.withOpacity(0.3),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'Map Integration Coming Soon',
                      style: TextStyle(
                        fontSize: 20,
                        color: Colors.white.withOpacity(0.5),
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Routes HUD
            Positioned(
              top: 16,
              left: 16,
              right: 16,
              child: AppleRoutesHUD(
                routeName: 'Angeles Crest Classic',
                distance: '45.2 mi',
                duration: '1h 35m',
                elevation: '4,842 ft',
                difficulty: 'Intermediate',
                activeUsers: 12,
                isExpanded: _isHUDExpanded,
                onToggleExpand: () {
                  setState(() {
                    _isHUDExpanded = !_isHUDExpanded;
                  });
                },
              ),
            ),

            // Routes list (scrollable from bottom)
            DraggableScrollableSheet(
              initialChildSize: 0.3,
              minChildSize: 0.3,
              maxChildSize: 0.8,
              builder: (context, scrollController) {
                return Container(
                  decoration: BoxDecoration(
                    color: Colors.black.withOpacity(0.9),
                    borderRadius: const BorderRadius.only(
                      topLeft: Radius.circular(24),
                      topRight: Radius.circular(24),
                    ),
                  ),
                  child: ListView(
                    controller: scrollController,
                    padding: const EdgeInsets.all(16),
                    children: [
                      // Drag handle
                      Center(
                        child: Container(
                          width: 40,
                          height: 5,
                          margin: const EdgeInsets.only(bottom: 20),
                          decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.3),
                            borderRadius: BorderRadius.circular(3),
                          ),
                        ),
                      ),

                      // Title
                      Text(
                        'Popular Routes',
                        style: TextStyle(
                          fontSize: 28,
                          fontWeight: FontWeight.bold,
                          color: AppleTheme.appleBlue,
                        ),
                      ),
                      const SizedBox(height: 20),

                      // Route cards
                      AppleContentCard(
                        title: 'Angeles Crest Classic',
                        subtitle: '45.2 mi • 1h 35m',
                        description:
                            'The legendary Angeles Crest Highway. Sweeping corners, amazing views, and perfect pavement. 4,842 ft elevation.',
                        gradient: LinearGradient(
                          colors: [
                            AppleTheme.appleBlue.withOpacity(0.4),
                            AppleTheme.appleGreen.withOpacity(0.4),
                          ],
                        ),
                        tags: const ['Intermediate', '⭐ 4.8', '234 reviews'],
                        onTap: () {},
                      ),
                      const SizedBox(height: 16),
                      AppleContentCard(
                        title: 'Pacific Coast Highway',
                        subtitle: '78.3 mi • 2h 15m',
                        description:
                            'Scenic coastal drive with ocean views. Perfect for a relaxed weekend cruise. 1,234 ft elevation.',
                        gradient: LinearGradient(
                          colors: [
                            AppleTheme.appleOrange.withOpacity(0.4),
                            AppleTheme.applePurple.withOpacity(0.4),
                          ],
                        ),
                        tags: const ['Easy', '⭐ 4.9', '567 reviews'],
                        onTap: () {},
                      ),
                      const SizedBox(height: 16),
                      AppleContentCard(
                        title: 'Palomar Mountain',
                        subtitle: '52.7 mi • 1h 48m',
                        description:
                            'Technical mountain road with 21 miles of tight switchbacks. Not for beginners! 5,558 ft elevation.',
                        gradient: LinearGradient(
                          colors: [
                            AppleTheme.appleRed.withOpacity(0.4),
                            AppleTheme.appleOrange.withOpacity(0.4),
                          ],
                        ),
                        tags: const ['Advanced', '⭐ 4.7', '189 reviews'],
                        onTap: () {},
                      ),
                      const SizedBox(height: 100), // Space for bottom nav
                    ],
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
