import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../theme/app_theme.dart';
import '../widgets/widgets.dart';

/// Profile screen showcasing the Apple Wallet-style profile card
class ProfileScreen extends StatefulWidget {
  const ProfileScreen({Key? key}) : super(key: key);

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  int _currentIndex = 0; // Profile tab

  final List<Map<String, dynamic>> _userProfiles = [
    {
      'username': 'TheMasterBender',
      'carModel': '2023 Subaru WRX STI',
      'carImage': 'assets/car1.jpg',
      'mods': [
        'Stage 3 Turbo Kit',
        'Coilover Suspension',
        'Custom Exhaust System',
        'Brembo Brake Kit',
      ],
      'stats': {
        'Posts': 156,
        'Meets': 42,
        'Miles': 12500,
      },
    },
    {
      'username': 'SpeedDemon',
      'carModel': '2022 Honda Civic Type R',
      'carImage': 'assets/car2.jpg',
      'mods': [
        'Carbon Fiber Hood',
        'Racing Seats',
        'Performance Intake',
      ],
      'stats': {
        'Posts': 89,
        'Meets': 28,
        'Miles': 8200,
      },
    },
  ];

  void _showEditProfileModal() {
    SlideUpModal.show(
      context: context,
      title: 'Edit Profile',
      initialChildSize: 0.7,
      child: ModalContent(
        children: [
          _buildEditField('Username', 'TheMasterBender'),
          const SizedBox(height: 16),
          _buildEditField('Car Model', '2023 Subaru WRX STI'),
          const SizedBox(height: 16),
          _buildEditField('Instagram', '@the_master_bender'),
          const SizedBox(height: 24),
          const Text(
            'Modifications',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 12),
          _buildEditField('Mod 1', 'Stage 3 Turbo Kit'),
          const SizedBox(height: 8),
          _buildEditField('Mod 2', 'Coilover Suspension'),
          const SizedBox(height: 8),
          _buildEditField('Mod 3', 'Custom Exhaust System'),
          const SizedBox(height: 24),
          SizedBox(
            width: double.infinity,
            child: PrimaryButton(
              text: 'Save Changes',
              onPressed: () => Navigator.pop(context),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEditField(String label, String value) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: 13,
            fontWeight: FontWeight.w600,
            color: isDark ? Colors.white70 : Colors.black54,
          ),
        ),
        const SizedBox(height: 6),
        TextField(
          decoration: InputDecoration(
            hintText: value,
            filled: true,
            fillColor: isDark
                ? Colors.white.withOpacity(0.05)
                : Colors.white.withOpacity(0.5),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(
                color: Colors.white.withOpacity(0.2),
              ),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(
                color: Colors.white.withOpacity(0.2),
              ),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(
                color: AppTheme.primaryBlue,
                width: 2,
              ),
            ),
          ),
        ),
      ],
    );
  }

  void _showCarGalleryModal() {
    SlideUpModal.show(
      context: context,
      title: 'Car Gallery',
      initialChildSize: 0.8,
      child: ModalContent(
        children: [
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              crossAxisSpacing: 12,
              mainAxisSpacing: 12,
              childAspectRatio: 1.2,
            ),
            itemCount: 6,
            itemBuilder: (context, index) {
              return Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(16),
                  gradient: LinearGradient(
                    colors: [
                      AppTheme.primaryBlue.withOpacity(0.3),
                      AppTheme.primaryBlue.withOpacity(0.1),
                    ],
                  ),
                ),
                child: Center(
                  child: FaIcon(
                    FontAwesomeIcons.car,
                    size: 40,
                    color: AppTheme.primaryBlue.withOpacity(0.5),
                  ),
                ),
              );
            },
          ),
          const SizedBox(height: 16),
          SizedBox(
            width: double.infinity,
            child: GlassButton(
              text: 'Upload New Photo',
              icon: Icons.add_photo_alternate,
              onPressed: () {},
            ),
          ),
        ],
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
                    'Profile',
                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.w700,
                      color: AppTheme.primaryBlue,
                    ),
                  ),
                  Row(
                    children: [
                      IconButtonGlass(
                        icon: Icons.photo_library,
                        onPressed: _showCarGalleryModal,
                        size: 44,
                      ),
                      const SizedBox(width: 12),
                      IconButtonGlass(
                        icon: Icons.edit,
                        onPressed: _showEditProfileModal,
                        size: 44,
                        isPrimary: true,
                      ),
                    ],
                  ),
                ],
              ),
            ),

            // Profile Cards
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.only(bottom: 100),
                itemCount: _userProfiles.length,
                itemBuilder: (context, index) {
                  final profile = _userProfiles[index];
                  return ProfileCard(
                    username: profile['username'],
                    carModel: profile['carModel'],
                    carImage: profile['carImage'],
                    mods: List<String>.from(profile['mods']),
                    stats: Map<String, int>.from(profile['stats']),
                    onTap: () {
                      print('Tapped profile: ${profile['username']}');
                    },
                  );
                },
              ),
            ),

            // Action Buttons
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 0, 16, 100),
              child: Column(
                children: [
                  SizedBox(
                    width: double.infinity,
                    child: PrimaryButton(
                      text: 'Share Profile',
                      icon: Icons.share,
                      onPressed: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Profile shared')),
                        );
                      },
                    ),
                  ),
                  const SizedBox(height: 12),
                  SizedBox(
                    width: double.infinity,
                    child: GlassButton(
                      text: 'View Stats',
                      icon: Icons.bar_chart,
                      onPressed: () {},
                    ),
                  ),
                ],
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
}
