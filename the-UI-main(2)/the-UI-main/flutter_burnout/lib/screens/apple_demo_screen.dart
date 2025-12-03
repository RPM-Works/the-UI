import 'package:flutter/material.dart';
import '../constants/apple_theme.dart';
import '../widgets/apple_bottom_nav.dart';
import '../widgets/apple_buttons.dart';
import '../widgets/apple_content_card.dart';
import '../widgets/apple_glass_widgets.dart';
import '../widgets/apple_profile_card.dart';
import '../widgets/apple_huds.dart';
import '../widgets/apple_modals.dart';

/// Demo screen showcasing all Apple-style 3D UI components
/// This screen demonstrates the complete widget library
class AppleDemoScreen extends StatefulWidget {
  const AppleDemoScreen({super.key});

  @override
  State<AppleDemoScreen> createState() => _AppleDemoScreenState();
}

class _AppleDemoScreenState extends State<AppleDemoScreen> {
  int _currentNavIndex = 1;
  bool _isCardExpanded = false;
  bool _isRouteExpanded = false;
  bool _isRecording = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        children: [
          // Background gradient
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  Colors.black,
                  AppleTheme.appleBlueDark.withOpacity(0.2),
                  Colors.black,
                ],
              ),
            ),
          ),

          // Main content
          SafeArea(
            bottom: false,
            child: _buildContent(),
          ),
        ],
      ),
      bottomNavigationBar: AppleBottomNav(
        currentIndex: _currentNavIndex,
        onTap: (index) {
          setState(() => _currentNavIndex = index);
        },
      ),
    );
  }

  Widget _buildContent() {
    switch (_currentNavIndex) {
      case 0:
        return _buildRoutesDemo();
      case 1:
        return _buildHomeDemo();
      case 2:
        return _buildProfileDemo();
      case 3:
        return _buildNewsDemo();
      case 4:
        return _buildChatDemo();
      default:
        return _buildHomeDemo();
    }
  }

  // ==========================================================================
  // HOME SCREEN DEMO
  // ==========================================================================

  Widget _buildHomeDemo() {
    return CustomScrollView(
      slivers: [
        // App bar
        SliverAppBar(
          floating: true,
          backgroundColor: Colors.transparent,
          elevation: 0,
          title: Text(
            'Burnout',
            style: AppleTheme.largeTitle.copyWith(color: Colors.white),
          ),
          actions: [
            AppleIconButton(
              icon: Icons.notifications_outlined,
              onPressed: () {
                showAppleDialog(
                  context: context,
                  title: 'Notifications',
                  message: 'You have 3 new notifications',
                  actions: [
                    AppleDialogAction(
                      label: 'View',
                      isDefault: true,
                      onPressed: () {},
                    ),
                    AppleDialogAction(
                      label: 'Dismiss',
                      onPressed: () {},
                    ),
                  ],
                );
              },
            ),
            const SizedBox(width: 8),
          ],
        ),

        // Search bar
        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.all(AppleTheme.spacing16),
            child: AppleSearchBar(
              placeholder: 'Search posts, cars, events...',
              onChanged: (value) {},
            ),
          ),
        ),

        // Quick stats
        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.symmetric(
              horizontal: AppleTheme.spacing16,
            ),
            child: Row(
              children: [
                Expanded(
                  child: AppleStatDisplay(
                    label: 'Events',
                    value: '12',
                    icon: Icons.event,
                    accentColor: AppleTheme.appleOrange,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: AppleStatDisplay(
                    label: 'Routes',
                    value: '8',
                    icon: Icons.map,
                    accentColor: AppleTheme.appleGreen,
                  ),
                ),
              ],
            ),
          ),
        ),

        // Feed section
        SliverToBoxAdapter(
          child: AppleGlassSection(
            title: 'Latest Posts',
            trailing: TextButton(
              onPressed: () {},
              child: Text(
                'See All',
                style: AppleTheme.callout.copyWith(
                  color: AppleTheme.appleBlue,
                ),
              ),
            ),
            child: const SizedBox.shrink(),
          ),
        ),

        // Content cards
        SliverList(
          delegate: SliverChildBuilderDelegate(
            (context, index) {
              return AppleContentCard(
                title: 'Modified GTR R35 Build',
                subtitle: '@user${index + 1} · 2h ago',
                description:
                    'Just finished installing the new turbo kit. Can\'t wait to test it out!',
                tags: const ['GTR', 'Turbo', 'Build'],
                hasGlassOverlay: true,
                onTap: () {
                  showAppleBottomSheet(
                    context: context,
                    child: _buildPostDetail(),
                  );
                },
              );
            },
            childCount: 3,
          ),
        ),

        // Bottom spacing for nav bar
        const SliverToBoxAdapter(
          child: SizedBox(height: 120),
        ),
      ],
    );
  }

  // ==========================================================================
  // PROFILE SCREEN DEMO
  // ==========================================================================

  Widget _buildProfileDemo() {
    return CustomScrollView(
      slivers: [
        SliverAppBar(
          floating: true,
          backgroundColor: Colors.transparent,
          elevation: 0,
          title: Text(
            'Profile',
            style: AppleTheme.largeTitle.copyWith(color: Colors.white),
          ),
        ),

        // Profile card
        SliverToBoxAdapter(
          child: AppleProfileCard(
            carModel: '2023 Nissan GTR',
            userName: '@drift_king',
            carImageUrl: '',
            horsePower: 650,
            topSpeed: 195,
            year: '2023',
            mods: const [
              'Turbo Kit Upgrade',
              'Carbon Fiber Body Kit',
              'Coilover Suspension',
              'Exhaust System',
            ],
            isExpanded: _isCardExpanded,
            onTap: () {
              setState(() => _isCardExpanded = !_isCardExpanded);
            },
          ),
        ),

        // Action buttons
        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.all(AppleTheme.spacing16),
            child: Column(
              children: [
                ApplePrimaryButton(
                  text: 'Edit Profile',
                  icon: Icons.edit,
                  onPressed: () {
                    showAppleLoading(context, message: 'Loading...');
                    Future.delayed(const Duration(seconds: 2), () {
                      Navigator.pop(context);
                    });
                  },
                ),
                const SizedBox(height: 12),
                AppleSecondaryButton(
                  text: 'Share Profile',
                  icon: Icons.share,
                  onPressed: () {},
                ),
              ],
            ),
          ),
        ),

        // Stats section
        SliverToBoxAdapter(
          child: AppleGlassSection(
            title: 'Statistics',
            child: Column(
              children: [
                AppleCompactCard(
                  icon: Icons.directions_car,
                  title: 'Total Drives',
                  subtitle: '142 drives',
                  trailing: const AppleInfoBadge(
                    text: '+12',
                    icon: Icons.trending_up,
                  ),
                ),
                const SizedBox(height: 8),
                AppleCompactCard(
                  icon: Icons.favorite,
                  title: 'Followers',
                  subtitle: '2.4k followers',
                  trailing: const AppleInfoBadge(
                    text: '+45',
                    icon: Icons.trending_up,
                    color: AppleTheme.appleGreen,
                  ),
                ),
              ],
            ),
          ),
        ),

        const SliverToBoxAdapter(
          child: SizedBox(height: 120),
        ),
      ],
    );
  }

  // ==========================================================================
  // ROUTES SCREEN DEMO
  // ==========================================================================

  Widget _buildRoutesDemo() {
    return Stack(
      children: [
        // Map placeholder
        Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [
                AppleTheme.appleBlue.withOpacity(0.3),
                AppleTheme.appleGreen.withOpacity(0.3),
              ],
            ),
          ),
        ),

        // Routes HUD
        Positioned(
          top: 60,
          left: 0,
          right: 0,
          child: AppleRoutesHUD(
            routeName: 'Mountain Pass Route',
            distance: '45.2 mi',
            duration: '1h 20m',
            eta: '3:45 PM',
            isExpanded: _isRouteExpanded,
            onToggle: () {
              setState(() => _isRouteExpanded = !_isRouteExpanded);
            },
          ),
        ),

        // Communication HUD
        Positioned(
          bottom: 120,
          left: 0,
          right: 0,
          child: AppleCommunicationHUD(
            activeUsers: const ['user1', 'user2', 'user3'],
            isRecording: _isRecording,
            onPushToTalk: () {
              setState(() => _isRecording = true);
            },
            onRelease: () {
              setState(() => _isRecording = false);
            },
          ),
        ),
      ],
    );
  }

  // ==========================================================================
  // NEWS SCREEN DEMO
  // ==========================================================================

  Widget _buildNewsDemo() {
    return CustomScrollView(
      slivers: [
        SliverAppBar(
          floating: true,
          backgroundColor: Colors.transparent,
          elevation: 0,
          title: Text(
            'News',
            style: AppleTheme.largeTitle.copyWith(color: Colors.white),
          ),
        ),

        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.all(AppleTheme.spacing16),
            child: AppleSearchBar(
              placeholder: 'Search news...',
            ),
          ),
        ),

        // Filter pills
        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.symmetric(
              horizontal: AppleTheme.spacing16,
            ),
            child: Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                ApplePillButton(
                  text: 'All',
                  isSelected: true,
                  onPressed: () {},
                ),
                ApplePillButton(
                  text: 'Events',
                  icon: Icons.event,
                  onPressed: () {},
                ),
                ApplePillButton(
                  text: 'Products',
                  icon: Icons.shopping_bag,
                  onPressed: () {},
                ),
                ApplePillButton(
                  text: 'Racing',
                  icon: Icons.sports_motorsports,
                  onPressed: () {},
                ),
              ],
            ),
          ),
        ),

        const SizedBox(height: 16),

        // News items
        SliverList(
          delegate: SliverChildBuilderDelegate(
            (context, index) {
              return AppleContentCard(
                imageUrl: 'placeholder',
                title: 'New Turbo Kit Released',
                subtitle: 'Auto News · 3h ago',
                description:
                    'The latest turbo kit promises 20% more power with better efficiency...',
                tags: const ['Product', 'Performance'],
                onTap: () {},
              );
            },
            childCount: 5,
          ),
        ),

        const SliverToBoxAdapter(
          child: SizedBox(height: 120),
        ),
      ],
    );
  }

  // ==========================================================================
  // CHAT SCREEN DEMO
  // ==========================================================================

  Widget _buildChatDemo() {
    return CustomScrollView(
      slivers: [
        SliverAppBar(
          floating: true,
          backgroundColor: Colors.transparent,
          elevation: 0,
          title: Text(
            'Messages',
            style: AppleTheme.largeTitle.copyWith(color: Colors.white),
          ),
        ),

        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.all(AppleTheme.spacing16),
            child: AppleSearchBar(
              placeholder: 'Search conversations...',
            ),
          ),
        ),

        SliverList(
          delegate: SliverChildBuilderDelegate(
            (context, index) {
              return AppleCompactCard(
                icon: Icons.person,
                title: 'User ${index + 1}',
                subtitle: 'Last message preview...',
                trailing: Text(
                  '${index + 1}h ago',
                  style: AppleTheme.caption2.copyWith(
                    color: Colors.white.withOpacity(0.6),
                  ),
                ),
                onTap: () {},
                accentColor: AppleTheme.appleBlue,
              );
            },
            childCount: 10,
          ),
        ),

        const SliverToBoxAdapter(
          child: SizedBox(height: 120),
        ),
      ],
    );
  }

  // ==========================================================================
  // POST DETAIL MODAL
  // ==========================================================================

  Widget _buildPostDetail() {
    return Padding(
      padding: const EdgeInsets.all(AppleTheme.spacing20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Post Details',
            style: AppleTheme.title1.copyWith(
              color: Colors.white,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: AppleTheme.spacing20),
          Text(
            'This is a detailed view of the post. In a real app, this would show the full post content, images, comments, and interactions.',
            style: AppleTheme.body.copyWith(
              color: Colors.white.withOpacity(0.8),
            ),
          ),
          const SizedBox(height: AppleTheme.spacing24),
          ApplePrimaryButton(
            text: 'Like',
            icon: Icons.favorite_border,
            onPressed: () {
              Navigator.pop(context);
            },
          ),
          const SizedBox(height: 12),
          AppleSecondaryButton(
            text: 'Share',
            icon: Icons.share,
            onPressed: () {},
          ),
        ],
      ),
    );
  }
}
