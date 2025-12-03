import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'constants/apple_theme.dart';
import 'screens/home_screen.dart';
import 'screens/routes_screen.dart';
import 'screens/add_post_screen.dart';
import 'screens/news_screen.dart';
import 'screens/chat_screen.dart';
import 'screens/events_screen.dart';
import 'screens/profile_screen.dart';
import 'screens/car_profile_screen.dart';
import 'widgets/apple_bottom_nav.dart';

void main() {
  // Set system UI overlay style
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.light,
      systemNavigationBarColor: Colors.black,
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
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: Colors.black,
        fontFamily: '-apple-system',
        textTheme: const TextTheme(
          displayLarge: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
          bodyLarge: TextStyle(color: Colors.white),
          bodyMedium: TextStyle(color: Colors.white70),
        ),
      ),
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
      backgroundColor: Colors.black,
      body: Stack(
        children: [
          _screens[_currentIndex],
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            child: AppleBottomNav(
              currentIndex: _currentIndex,
              onTap: _onTabTapped,
            ),
          ),
        ],
      ),
    );
  }
}
