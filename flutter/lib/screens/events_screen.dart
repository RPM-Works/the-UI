import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../theme/app_theme.dart';
import '../widgets/widgets.dart';
import '../widgets/create_post_modal.dart';

/// Events and Posts screen with Instagram-style feed
class EventsScreen extends StatefulWidget {
  const EventsScreen({Key? key}) : super(key: key);

  @override
  State<EventsScreen> createState() => _EventsScreenState();
}

class _EventsScreenState extends State<EventsScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  int _currentNavIndex = 2; // Posts tab

  final List<Map<String, dynamic>> _events = [
    {
      'username': 'TheMasterBender',
      'avatar': 'assets/avatar1.jpg',
      'title': 'Sunset Boulevard Meet',
      'location': 'Los Angeles, CA',
      'date': 'Saturday, 8:00 PM',
      'images': ['assets/event1.jpg'],
      'likes': 234,
      'comments': 45,
      'attending': 89,
      'description': 'Join us this weekend for the biggest car meet of the year! Bring your best ride and let\'s make some noise! 🚗💨',
      'timestamp': '2 hours ago',
    },
    {
      'username': 'SpeedDemon',
      'avatar': 'assets/avatar2.jpg',
      'title': 'Track Day at Laguna Seca',
      'location': 'Monterey, CA',
      'date': 'Next Sunday',
      'images': ['assets/event2.jpg'],
      'likes': 456,
      'comments': 78,
      'attending': 45,
      'description': 'Testing the new turbo setup at Laguna Seca! Who\'s coming?',
      'timestamp': '5 hours ago',
    },
  ];

  final List<Map<String, dynamic>> _posts = [
    {
      'username': 'TurboKing',
      'avatar': 'assets/avatar3.jpg',
      'images': ['assets/mod1.jpg', 'assets/mod2.jpg'],
      'caption': 'Stage 3 turbo install complete! Can\'t wait to hit the dyno. Expected 450hp+ 💪',
      'location': 'Tokyo Drift Garage',
      'likes': 892,
      'comments': 124,
      'timestamp': '1 hour ago',
      'category': 'Modifications',
    },
    {
      'username': 'DriftQueen',
      'avatar': 'assets/avatar4.jpg',
      'images': ['assets/drift1.jpg'],
      'caption': 'Perfect weather for some sideways action! 🔥',
      'location': 'Ebisu Circuit',
      'likes': 1234,
      'comments': 234,
      'timestamp': '3 hours ago',
      'category': 'Track Days',
    },
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void _showCreatePost() {
    CreatePostModal.show(
      context: context,
      onPost: (postData) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Post shared: ${postData['caption']}'),
            backgroundColor: AppTheme.primaryBlue,
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF000000) : const Color(0xFFF5F5F5),
      body: SafeArea(
        child: Column(
          children: [
            // App Bar with Tabs
            _buildAppBar(isDark),

            // Content
            Expanded(
              child: TabBarView(
                controller: _tabController,
                children: [
                  _buildEventsTab(isDark),
                  _buildPostsTab(isDark),
                ],
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: _buildFloatingActionButton(),
      bottomNavigationBar: GlassBottomNavBar(
        currentIndex: _currentNavIndex,
        onTap: (index) {
          setState(() => _currentNavIndex = index);
        },
      ),
    );
  }

  Widget _buildAppBar(bool isDark) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: isDark
                ? Colors.white.withOpacity(0.1)
                : Colors.black.withOpacity(0.1),
          ),
        ),
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Events & Posts',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.w700,
                  color: AppTheme.primaryBlue,
                ),
              ),
              Row(
                children: [
                  IconButtonGlass(
                    icon: FontAwesomeIcons.bell,
                    onPressed: () {},
                    size: 44,
                  ),
                  const SizedBox(width: 12),
                  IconButtonGlass(
                    icon: FontAwesomeIcons.heart,
                    onPressed: () {},
                    size: 44,
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 16),
          TabBar(
            controller: _tabController,
            indicatorColor: AppTheme.primaryBlue,
            indicatorWeight: 3,
            labelColor: AppTheme.primaryBlue,
            unselectedLabelColor: isDark ? Colors.white60 : Colors.black54,
            labelStyle: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
            ),
            tabs: const [
              Tab(text: 'Events'),
              Tab(text: 'Posts'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildEventsTab(bool isDark) {
    return ListView.builder(
      padding: const EdgeInsets.only(bottom: 100, top: 8),
      itemCount: _events.length,
      itemBuilder: (context, index) {
        final event = _events[index];
        return _buildEventCard(event, isDark);
      },
    );
  }

  Widget _buildPostsTab(bool isDark) {
    return ListView.builder(
      padding: const EdgeInsets.only(bottom: 100, top: 8),
      itemCount: _posts.length,
      itemBuilder: (context, index) {
        final post = _posts[index];
        return _buildPostCard(post, isDark);
      },
    );
  }

  Widget _buildEventCard(Map<String, dynamic> event, bool isDark) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF1C1C1E) : Colors.white,
        borderRadius: BorderRadius.circular(18),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                Container(
                  width: 44,
                  height: 44,
                  decoration: BoxDecoration(
                    gradient: AppTheme.primaryGradient,
                    shape: BoxShape.circle,
                  ),
                  child: const Center(
                    child: FaIcon(
                      FontAwesomeIcons.user,
                      color: Colors.white,
                      size: 20,
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        event['username'],
                        style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.w600,
                          color: isDark ? Colors.white : Colors.black87,
                        ),
                      ),
                      Text(
                        event['timestamp'],
                        style: TextStyle(
                          fontSize: 12,
                          color: isDark ? Colors.white60 : Colors.black54,
                        ),
                      ),
                    ],
                  ),
                ),
                Icon(
                  Icons.more_horiz,
                  color: isDark ? Colors.white60 : Colors.black54,
                ),
              ],
            ),
          ),

          // Event Image
          Container(
            height: 240,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  AppTheme.primaryBlue.withOpacity(0.3),
                  AppTheme.primaryBlue.withOpacity(0.1),
                ],
              ),
            ),
            child: Stack(
              children: [
                Center(
                  child: FaIcon(
                    FontAwesomeIcons.calendarDays,
                    size: 80,
                    color: AppTheme.primaryBlue.withOpacity(0.3),
                  ),
                ),
                Positioned(
                  bottom: 16,
                  left: 16,
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 6,
                    ),
                    decoration: BoxDecoration(
                      color: Colors.black.withOpacity(0.6),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Row(
                      children: [
                        const FaIcon(
                          FontAwesomeIcons.locationDot,
                          size: 12,
                          color: Colors.white,
                        ),
                        const SizedBox(width: 6),
                        Text(
                          event['location'],
                          style: const TextStyle(
                            fontSize: 12,
                            color: Colors.white,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),

          // Event Info
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  event['title'],
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w700,
                    color: isDark ? Colors.white : Colors.black87,
                  ),
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    const FaIcon(
                      FontAwesomeIcons.clock,
                      size: 14,
                      color: AppTheme.primaryBlue,
                    ),
                    const SizedBox(width: 6),
                    Text(
                      event['date'],
                      style: TextStyle(
                        fontSize: 14,
                        color: isDark ? Colors.white70 : Colors.black54,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Text(
                  event['description'],
                  style: TextStyle(
                    fontSize: 14,
                    color: isDark ? Colors.white70 : Colors.black87,
                  ),
                ),
              ],
            ),
          ),

          // Actions
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    _buildActionChip(
                      FontAwesomeIcons.heart,
                      event['likes'].toString(),
                      isDark,
                    ),
                    const SizedBox(width: 12),
                    _buildActionChip(
                      FontAwesomeIcons.comment,
                      event['comments'].toString(),
                      isDark,
                    ),
                    const SizedBox(width: 12),
                    _buildActionChip(
                      FontAwesomeIcons.userGroup,
                      '${event['attending']} going',
                      isDark,
                    ),
                  ],
                ),
                GestureDetector(
                  onTap: () {},
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 16,
                      vertical: 8,
                    ),
                    decoration: BoxDecoration(
                      gradient: AppTheme.primaryGradient,
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: const Text(
                      'I\'m Going',
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w600,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPostCard(Map<String, dynamic> post, bool isDark) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF1C1C1E) : Colors.white,
        borderRadius: BorderRadius.circular(18),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                Container(
                  width: 44,
                  height: 44,
                  decoration: BoxDecoration(
                    gradient: AppTheme.primaryGradient,
                    shape: BoxShape.circle,
                  ),
                  child: const Center(
                    child: FaIcon(
                      FontAwesomeIcons.user,
                      color: Colors.white,
                      size: 20,
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        post['username'],
                        style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.w600,
                          color: isDark ? Colors.white : Colors.black87,
                        ),
                      ),
                      Row(
                        children: [
                          if (post['location'] != null) ...[
                            const FaIcon(
                              FontAwesomeIcons.locationDot,
                              size: 10,
                              color: AppTheme.primaryBlue,
                            ),
                            const SizedBox(width: 4),
                            Text(
                              post['location'],
                              style: TextStyle(
                                fontSize: 12,
                                color: isDark ? Colors.white60 : Colors.black54,
                              ),
                            ),
                          ],
                        ],
                      ),
                    ],
                  ),
                ),
                Icon(
                  Icons.more_horiz,
                  color: isDark ? Colors.white60 : Colors.black54,
                ),
              ],
            ),
          ),

          // Images
          if (post['images'] != null && post['images'].isNotEmpty)
            SizedBox(
              height: 300,
              child: PageView.builder(
                itemCount: post['images'].length,
                itemBuilder: (context, index) {
                  return Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        colors: [
                          AppTheme.primaryBlue.withOpacity(0.3),
                          AppTheme.primaryBlue.withOpacity(0.1),
                        ],
                      ),
                    ),
                    child: Center(
                      child: FaIcon(
                        FontAwesomeIcons.image,
                        size: 80,
                        color: AppTheme.primaryBlue.withOpacity(0.3),
                      ),
                    ),
                  );
                },
              ),
            ),

          // Actions
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    _buildActionChip(
                      FontAwesomeIcons.heart,
                      post['likes'].toString(),
                      isDark,
                    ),
                    const SizedBox(width: 16),
                    _buildActionChip(
                      FontAwesomeIcons.comment,
                      post['comments'].toString(),
                      isDark,
                    ),
                    const SizedBox(width: 16),
                    _buildActionChip(
                      FontAwesomeIcons.share,
                      'Share',
                      isDark,
                    ),
                    const Spacer(),
                    const FaIcon(
                      FontAwesomeIcons.bookmark,
                      size: 20,
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                RichText(
                  text: TextSpan(
                    style: TextStyle(
                      fontSize: 14,
                      color: isDark ? Colors.white87 : Colors.black87,
                    ),
                    children: [
                      TextSpan(
                        text: '${post['username']} ',
                        style: const TextStyle(fontWeight: FontWeight.w600),
                      ),
                      TextSpan(text: post['caption']),
                    ],
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  post['timestamp'],
                  style: TextStyle(
                    fontSize: 12,
                    color: isDark ? Colors.white60 : Colors.black54,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildActionChip(IconData icon, String label, bool isDark) {
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

  Widget _buildFloatingActionButton() {
    return Container(
      width: 60,
      height: 60,
      decoration: BoxDecoration(
        gradient: AppTheme.primaryGradient,
        shape: BoxShape.circle,
        boxShadow: [
          BoxShadow(
            color: AppTheme.primaryBlue.withOpacity(0.4),
            blurRadius: 20,
            spreadRadius: 5,
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: _showCreatePost,
          borderRadius: BorderRadius.circular(30),
          child: const Center(
            child: FaIcon(
              FontAwesomeIcons.plus,
              color: Colors.white,
              size: 24,
            ),
          ),
        ),
      ),
    );
  }
}
