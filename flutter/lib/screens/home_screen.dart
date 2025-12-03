import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../theme/app_theme.dart';
import '../widgets/widgets.dart';

/// Home screen showcasing the main feed and navigation
class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 1; // Start at Home

  final List<Map<String, dynamic>> _samplePosts = [
    {
      'title': 'Epic Meet at Sunset Boulevard',
      'subtitle': 'Join us this weekend for the biggest car meet of the year!',
      'likes': 234,
      'comments': 45,
    },
    {
      'title': 'New Turbo Install Complete',
      'subtitle': 'Finally got the Stage 3 turbo installed. Ready to test!',
      'likes': 189,
      'comments': 32,
    },
    {
      'title': 'Track Day Results',
      'subtitle': 'Shaved 2 seconds off my lap time. New personal best!',
      'likes': 456,
      'comments': 78,
    },
  ];

  void _showRoutesHUD() {
    showDialog(
      context: context,
      barrierColor: Colors.black.withOpacity(0.5),
      builder: (context) => Center(
        child: RoutesHUD(
          destination: 'Sunset Boulevard Meet',
          eta: '15 min',
          distance: '8.3 mi',
          speed: 45,
          onNavigate: () {
            Navigator.pop(context);
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Navigation started')),
            );
          },
          onClose: () => Navigator.pop(context),
        ),
      ),
    );
  }

  void _showCommunicationHUD() {
    showDialog(
      context: context,
      barrierColor: Colors.black.withOpacity(0.5),
      builder: (context) => Center(
        child: CommunicationHUD(
          channelName: 'Car Crew Channel',
          activeUsers: 8,
          onPushToTalk: () {
            print('Push to talk');
          },
          onReleaseTalk: () {
            print('Release talk');
          },
          onClose: () => Navigator.pop(context),
        ),
      ),
    );
  }

  void _showFilterModal() {
    SlideUpModal.show(
      context: context,
      title: 'Filter Posts',
      initialChildSize: 0.5,
      child: ModalContent(
        children: [
          const Text(
            'Filter by Category',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 16),
          _buildFilterChip('Meets & Events'),
          _buildFilterChip('Modifications'),
          _buildFilterChip('Track Days'),
          _buildFilterChip('For Sale'),
          const SizedBox(height: 24),
          SizedBox(
            width: double.infinity,
            child: PrimaryButton(
              text: 'Apply Filters',
              onPressed: () => Navigator.pop(context),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFilterChip(String label) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: GlassButton(
        text: label,
        onPressed: () {},
        width: double.infinity,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppTheme.darkBackground : AppTheme.lightBackground,
      body: SafeArea(
        child: Column(
          children: [
            // App Bar
            Padding(
              padding: const EdgeInsets.all(16),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Burnout',
                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.w700,
                      color: AppTheme.primaryBlue,
                    ),
                  ),
                  Row(
                    children: [
                      IconButtonGlass(
                        icon: Icons.filter_list,
                        onPressed: _showFilterModal,
                        size: 44,
                      ),
                      const SizedBox(width: 12),
                      IconButtonGlass(
                        icon: Icons.notifications_outlined,
                        onPressed: () {},
                        size: 44,
                      ),
                    ],
                  ),
                ],
              ),
            ),

            // Search Bar
            GlassSearchBar(
              placeholder: 'Search posts, users, events...',
              onChanged: (value) {
                print('Search: $value');
              },
            ),

            // Quick Actions
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Row(
                children: [
                  Expanded(
                    child: PrimaryButton(
                      text: 'Routes',
                      icon: Icons.map,
                      onPressed: _showRoutesHUD,
                      height: 48,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: PrimaryButton(
                      text: 'Walkie',
                      icon: Icons.mic,
                      onPressed: _showCommunicationHUD,
                      height: 48,
                    ),
                  ),
                ],
              ),
            ),

            // Posts Feed
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.only(bottom: 100),
                itemCount: _samplePosts.length,
                itemBuilder: (context, index) {
                  final post = _samplePosts[index];
                  return ContentCard(
                    title: post['title'],
                    subtitle: post['subtitle'],
                    onTap: () {
                      print('Tapped post: ${post['title']}');
                    },
                    actions: [
                      _buildActionButton(
                        FontAwesomeIcons.heart,
                        post['likes'].toString(),
                        isDark,
                      ),
                      const SizedBox(width: 16),
                      _buildActionButton(
                        FontAwesomeIcons.comment,
                        post['comments'].toString(),
                        isDark,
                      ),
                      const SizedBox(width: 16),
                      _buildActionButton(
                        FontAwesomeIcons.share,
                        'Share',
                        isDark,
                      ),
                    ],
                  );
                },
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: GlassBottomNavBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() => _currentIndex = index);
        },
      ),
    );
  }

  Widget _buildActionButton(IconData icon, String label, bool isDark) {
    return Row(
      children: [
        FaIcon(
          icon,
          size: 16,
          color: isDark ? Colors.white60 : Colors.black54,
        ),
        const SizedBox(width: 6),
        Text(
          label,
          style: TextStyle(
            fontSize: 13,
            color: isDark ? Colors.white60 : Colors.black54,
          ),
        ),
      ],
    );
  }
}
