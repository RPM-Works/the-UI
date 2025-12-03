import 'package:flutter/material.dart';
import '../constants/apple_theme.dart';
import '../widgets/apple_profile_card.dart';
import '../widgets/apple_glass_widgets.dart';

/// User profile screen with Apple Wallet-style cards
class ProfileScreen extends StatefulWidget {
  final String username;
  final String? profileImageUrl;

  const ProfileScreen({
    super.key,
    this.username = '@drift_king',
    this.profileImageUrl,
  });

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  int _selectedCardIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.only(bottom: 100), // Space for bottom nav
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 20),

              // Header
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Profile',
                      style: TextStyle(
                        fontSize: 34,
                        fontWeight: FontWeight.bold,
                        color: AppleTheme.appleBlue,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      widget.username,
                      style: const TextStyle(
                        fontSize: 17,
                        color: Colors.white60,
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 32),

              // Profile cards (swipeable)
              SizedBox(
                height: 520,
                child: PageView(
                  onPageChanged: (index) {
                    setState(() {
                      _selectedCardIndex = index;
                    });
                  },
                  children: [
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 24),
                      child: AppleProfileCard(
                        carModel: '2023 Nissan GT-R',
                        carYear: '2023',
                        username: widget.username,
                        horsePower: 650,
                        topSpeed: 195,
                        torque: 580,
                        zeroToSixty: 2.9,
                        modifications: const [
                          'Garrett G30-900 Turbo Kit',
                          'Carbon Fiber Body Kit',
                          'KW V3 Coilover Suspension',
                          'Akrapovic Titanium Exhaust',
                          'Brembo GT-R Big Brake Kit',
                          'Ecutek Custom Tune',
                        ],
                        gradient: LinearGradient(
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                          colors: [
                            AppleTheme.appleRed.withOpacity(0.3),
                            AppleTheme.appleOrange.withOpacity(0.3),
                          ],
                        ),
                        onTap: () {
                          // Handle card tap
                        },
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 24),
                      child: AppleProfileCard(
                        carModel: '2021 Toyota GR Supra',
                        carYear: '2021',
                        username: '@supra_legend',
                        horsePower: 520,
                        topSpeed: 175,
                        torque: 495,
                        zeroToSixty: 3.2,
                        modifications: const [
                          'Pure Turbo 800 Upgrade',
                          'Downpipe & Catless Midpipe',
                          'BC Racing Coilovers',
                          'HKS Blow-Off Valve',
                          'Bootmod3 Stage 2+ Tune',
                        ],
                        gradient: LinearGradient(
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                          colors: [
                            AppleTheme.appleBlue.withOpacity(0.3),
                            AppleTheme.applePurple.withOpacity(0.3),
                          ],
                        ),
                        onTap: () {
                          // Handle card tap
                        },
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 16),

              // Page indicator
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: List.generate(2, (index) {
                  return Container(
                    margin: const EdgeInsets.symmetric(horizontal: 4),
                    width: _selectedCardIndex == index ? 24 : 8,
                    height: 8,
                    decoration: BoxDecoration(
                      color: _selectedCardIndex == index
                          ? AppleTheme.appleBlue
                          : AppleTheme.glassLight,
                      borderRadius: BorderRadius.circular(4),
                    ),
                  );
                }),
              ),

              const SizedBox(height: 32),

              // Stats section
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: AppleGlassSection(
                  title: 'Statistics',
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      children: [
                        Row(
                          children: [
                            Expanded(
                              child: AppleStatDisplay(
                                icon: Icons.photo_library,
                                label: 'Posts',
                                value: '127',
                                iconColor: AppleTheme.appleBlue,
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: AppleStatDisplay(
                                icon: Icons.people,
                                label: 'Followers',
                                value: '2.8K',
                                iconColor: AppleTheme.appleGreen,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        Row(
                          children: [
                            Expanded(
                              child: AppleStatDisplay(
                                icon: Icons.event,
                                label: 'Meets',
                                value: '34',
                                iconColor: AppleTheme.appleOrange,
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: AppleStatDisplay(
                                icon: Icons.sports_score,
                                label: 'Track Days',
                                value: '12',
                                iconColor: AppleTheme.appleRed,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              ),

              const SizedBox(height: 24),

              // Bio section
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: AppleGlassSection(
                  title: 'About',
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Text(
                      'Weekend warrior | Track enthusiast | E85 converted\n\nBuilding the ultimate street/track GT-R. Follow my journey as I push the limits of the VR38DETT platform.',
                      style: TextStyle(
                        fontSize: 15,
                        color: Colors.white.withOpacity(0.8),
                        height: 1.5,
                      ),
                    ),
                  ),
                ),
              ),

              const SizedBox(height: 24),

              // Recent activity
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: AppleGlassSection(
                  title: 'Recent Activity',
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      children: [
                        _buildActivityItem(
                          'Posted turbo kit install',
                          '2 hours ago',
                          Icons.build,
                          AppleTheme.appleOrange,
                        ),
                        const SizedBox(height: 12),
                        _buildActivityItem(
                          'Attended Buttonwillow track day',
                          '3 days ago',
                          Icons.sports_score,
                          AppleTheme.appleRed,
                        ),
                        const SizedBox(height: 12),
                        _buildActivityItem(
                          'Joined Weekend Warriors group',
                          '1 week ago',
                          Icons.group,
                          AppleTheme.appleGreen,
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildActivityItem(
    String title,
    String time,
    IconData icon,
    Color color,
  ) {
    return Row(
      children: [
        Container(
          width: 40,
          height: 40,
          decoration: BoxDecoration(
            color: color.withOpacity(0.2),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Icon(
            icon,
            color: color,
            size: 20,
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: const TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w600,
                  color: Colors.white,
                ),
              ),
              Text(
                time,
                style: TextStyle(
                  fontSize: 13,
                  color: Colors.white.withOpacity(0.6),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
