import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'constants/app_theme.dart';
import 'constants/app_colors.dart';
import 'screens/home_screen.dart';
import 'screens/routes_screen.dart';
import 'screens/add_post_screen.dart';
import 'screens/news_screen.dart';
import 'screens/chat_screen.dart';
import 'screens/events_screen.dart';
import 'screens/profile_screen.dart';
import 'screens/car_profile_screen.dart';
import 'widgets/bottom_nav_bar.dart';

void main() {
  // Set system UI overlay style
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.light,
      systemNavigationBarColor: AppColors.backgroundColor,
      systemNavigationBarIconBrightness: Brightness.light,
    ),
  );

  runApp(const BurnoutApp());
}

class BurnoutApp extends StatelessWidget {
  const BurnoutApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Burnout',
      theme: AppTheme.darkTheme,
      debugShowCheckedModeBanner: false,
      home: const MainNavigator(),
      routes: {
        '/home': (context) => const MainNavigator(),
        '/profile': (context) => const ProfileScreen(),
        '/car-profile': (context) => const CarProfileScreen(),
        '/events': (context) => const EventsScreen(),
      },
    );
  }
}

/// Main navigation controller with bottom navigation bar
class MainNavigator extends StatefulWidget {
  const MainNavigator({super.key});

  @override
  State<MainNavigator> createState() => _MainNavigatorState();
}

class _MainNavigatorState extends State<MainNavigator> {
  int _currentIndex = 1; // Start on Home screen

  // Define all main screens
  final List<Widget> _screens = const [
    RoutesScreen(),
    HomeScreen(),
    AddPostScreen(),
    NewsScreen(),
    ChatScreen(),
  ];

  void _onTabTapped(int index) {
    setState(() {
      _currentIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.backgroundColor,
      body: _screens[_currentIndex],
      bottomNavigationBar: BurnoutBottomNavBar(
        currentIndex: _currentIndex,
        onTap: _onTabTapped,
      ),
    );
  }
}
