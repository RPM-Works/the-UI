import 'package:flutter/material.dart';
import '../constants/apple_theme.dart';
import '../widgets/apple_glass_widgets.dart';
import '../widgets/apple_content_card.dart';
import '../widgets/apple_buttons.dart';

/// Home Feed screen with Apple-style UI
class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String _selectedFilter = 'All';
  final TextEditingController _searchController = TextEditingController();

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

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
                      'Burnout',
                      style: TextStyle(
                        fontSize: 34,
                        fontWeight: FontWeight.bold,
                        color: AppleTheme.appleBlue,
                      ),
                    ),
                    const SizedBox(height: 4),
                    const Text(
                      'Your car enthusiast community',
                      style: TextStyle(
                        fontSize: 17,
                        color: Colors.white60,
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 24),

              // Search bar
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: AppleSearchBar(
                  controller: _searchController,
                  placeholder: 'Search posts, users, or events...',
                  onChanged: (value) {
                    // Handle search
                  },
                  onClear: () {
                    _searchController.clear();
                  },
                ),
              ),

              const SizedBox(height: 24),

              // Stats row
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Row(
                  children: [
                    Expanded(
                      child: AppleStatDisplay(
                        icon: Icons.event,
                        label: 'Events',
                        value: '12',
                        iconColor: AppleTheme.appleGreen,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: AppleStatDisplay(
                        icon: Icons.map,
                        label: 'Routes',
                        value: '8',
                        iconColor: AppleTheme.appleOrange,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: AppleStatDisplay(
                        icon: Icons.people,
                        label: 'Members',
                        value: '234',
                        iconColor: AppleTheme.appleBlue,
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 24),

              // Filter pills
              SizedBox(
                height: 40,
                child: ListView(
                  scrollDirection: Axis.horizontal,
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  children: [
                    _buildFilterPill('All'),
                    const SizedBox(width: 8),
                    _buildFilterPill('Builds'),
                    const SizedBox(width: 8),
                    _buildFilterPill('Meets'),
                    const SizedBox(width: 8),
                    _buildFilterPill('Racing'),
                    const SizedBox(width: 8),
                    _buildFilterPill('News'),
                  ],
                ),
              ),

              const SizedBox(height: 24),

              // Content feed
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Column(
                  children: [
                    AppleContentCard(
                      title: 'Finally installed the turbo kit! 🔥',
                      subtitle: '@boost_addict • 2h ago',
                      description:
                          'After 6 months of saving, the Garrett G30-900 is finally on. First pulls were insane - hitting 18psi on pump gas. Can\'t wait for dyno day!',
                      gradient: LinearGradient(
                        colors: [
                          AppleTheme.appleRed.withOpacity(0.4),
                          AppleTheme.appleOrange.withOpacity(0.4),
                        ],
                      ),
                      tags: const ['Turbo', 'Build', 'GTR'],
                      stats: const {
                        'likes': 342,
                        'comments': 89,
                        'shares': 23,
                      },
                      onTap: () {},
                    ),
                    const SizedBox(height: 16),
                    AppleContentCard(
                      title: 'Sunset Canyon Run - THIS Weekend!',
                      subtitle: '@socal_meets • 4h ago',
                      description:
                          'Join us Saturday 7AM at Angeles Crest. Classic route, epic views. All cars welcome! RSVP in comments. ☀️🏔️',
                      gradient: LinearGradient(
                        colors: [
                          AppleTheme.appleBlue.withOpacity(0.4),
                          AppleTheme.appleGreen.withOpacity(0.4),
                        ],
                      ),
                      tags: const ['Meet', 'SoCal', 'Canyon'],
                      stats: const {
                        'likes': 567,
                        'comments': 143,
                        'shares': 91,
                      },
                      onTap: () {},
                    ),
                    const SizedBox(height: 16),
                    AppleContentCard(
                      title: 'Track day results - New PB! ⏱️',
                      subtitle: '@circuit_king • 6h ago',
                      description:
                          'Buttonwillow yesterday. New suspension setup paid off - dropped 3 seconds off my best lap. 1:58.4 on street tires!',
                      gradient: LinearGradient(
                        colors: [
                          AppleTheme.applePurple.withOpacity(0.4),
                          AppleTheme.appleRed.withOpacity(0.4),
                        ],
                      ),
                      tags: const ['Track', 'Racing', 'Time Attack'],
                      stats: const {
                        'likes': 891,
                        'comments': 167,
                        'shares': 45,
                      },
                      onTap: () {},
                    ),
                    const SizedBox(height: 16),
                    AppleContentCard(
                      title: 'Carbon fiber hood install 💪',
                      subtitle: '@weight_savings • 8h ago',
                      description:
                          'Just installed the Seibon hood. Saved 35lbs off the front end. The fitment is perfect and the weave pattern is gorgeous!',
                      gradient: LinearGradient(
                        colors: [
                          AppleTheme.applePurple.withOpacity(0.4),
                          AppleTheme.appleGreen.withOpacity(0.4),
                        ],
                      ),
                      tags: const ['Carbon', 'Weight Reduction', 'Mod'],
                      stats: const {
                        'likes': 234,
                        'comments': 56,
                        'shares': 12,
                      },
                      onTap: () {},
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

  Widget _buildFilterPill(String label) {
    final isSelected = _selectedFilter == label;
    return ApplePillButton(
      label: label,
      isSelected: isSelected,
      onPressed: () {
        setState(() {
          _selectedFilter = label;
        });
      },
    );
  }
}
