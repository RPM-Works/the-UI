import 'package:flutter/material.dart';
import '../constants/app_colors.dart';

/// User profile screen with tabs (Posts, Sparks, Auto-Bits)
class ProfileScreen extends StatefulWidget {
  final String username;
  final String? profileImageUrl;

  const ProfileScreen({
    super.key,
    this.username = '@the_master_bender',
    this.profileImageUrl,
  });

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.backgroundColor,
      body: SafeArea(
        child: Column(
          children: [
            const SizedBox(height: 20),

            // Profile header
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Row(
                children: [
                  // Profile picture
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
                    child: widget.profileImageUrl != null
                        ? ClipOval(
                            child: Image.network(
                              widget.profileImageUrl!,
                              fit: BoxFit.cover,
                              errorBuilder: (context, error, stackTrace) {
                                return const Icon(
                                  Icons.directions_car,
                                  color: AppColors.primaryBlue,
                                  size: 48,
                                );
                              },
                            ),
                          )
                        : const Icon(
                            Icons.directions_car,
                            color: AppColors.primaryBlue,
                            size: 48,
                          ),
                  ),
                  const SizedBox(width: 16),

                  // Username
                  Text(
                    widget.username,
                    style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                          fontSize: 24,
                        ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),

            // Tab bar
            Container(
              decoration: const BoxDecoration(
                border: Border(
                  bottom: BorderSide(
                    color: AppColors.primaryBlue,
                    width: 2,
                  ),
                ),
              ),
              child: TabBar(
                controller: _tabController,
                indicatorColor: AppColors.primaryBlue,
                indicatorWeight: 3,
                labelColor: AppColors.primaryBlue,
                unselectedLabelColor: AppColors.textGray,
                labelStyle: Theme.of(context).textTheme.titleMedium,
                tabs: const [
                  Tab(text: 'Posts'),
                  Tab(text: 'Sparks?'),
                  Tab(text: 'Auto-Bits'),
                ],
              ),
            ),

            // Tab content
            Expanded(
              child: TabBarView(
                controller: _tabController,
                children: [
                  // Posts tab
                  _buildPostsTab(),

                  // Sparks tab
                  _buildEmptyTab('Sparks coming soon'),

                  // Auto-Bits tab
                  _buildEmptyTab('Auto-Bits coming soon'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPostsTab() {
    return Center(
      child: Text(
        'No posts yet',
        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: AppColors.textGray,
            ),
      ),
    );
  }

  Widget _buildEmptyTab(String message) {
    return Center(
      child: Text(
        message,
        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: AppColors.textGray,
            ),
      ),
    );
  }
}
