import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'theme/app_theme.dart';
import 'screens/home_screen.dart';
import 'screens/profile_screen.dart';
import 'screens/events_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  // Set system UI overlay style
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.light,
      systemNavigationBarColor: Colors.transparent,
      systemNavigationBarIconBrightness: Brightness.light,
    ),
  );

  // Lock to portrait mode
  SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);

  runApp(const BurnoutApp());
}

class BurnoutApp extends StatelessWidget {
  const BurnoutApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Burnout - Car Enthusiast',
      debugShowCheckedModeBanner: false,
      theme: _buildLightTheme(),
      darkTheme: _buildDarkTheme(),
      themeMode: ThemeMode.system,
      home: const MainNavigator(),
    );
  }

  ThemeData _buildLightTheme() {
    return ThemeData(
      brightness: Brightness.light,
      scaffoldBackgroundColor: AppTheme.lightBackground,
      primaryColor: AppTheme.primaryBlue,
      fontFamily: 'SF Pro Display',
      textTheme: const TextTheme(
        displayLarge: TextStyle(
          fontSize: 32,
          fontWeight: FontWeight.w700,
          color: Colors.black87,
        ),
        displayMedium: TextStyle(
          fontSize: 24,
          fontWeight: FontWeight.w600,
          color: Colors.black87,
        ),
        bodyLarge: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w400,
          color: Colors.black87,
        ),
        bodyMedium: TextStyle(
          fontSize: 14,
          fontWeight: FontWeight.w400,
          color: Colors.black54,
        ),
      ),
      colorScheme: ColorScheme.light(
        primary: AppTheme.primaryBlue,
        secondary: AppTheme.secondaryPurple,
        surface: Colors.white,
        error: AppTheme.errorRed,
        onPrimary: Colors.white,
        onSecondary: Colors.white,
        onSurface: Colors.black87,
      ),
    );
  }

  ThemeData _buildDarkTheme() {
    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: AppTheme.darkBackground,
      primaryColor: AppTheme.primaryBlue,
      fontFamily: 'SF Pro Display',
      textTheme: const TextTheme(
        displayLarge: TextStyle(
          fontSize: 32,
          fontWeight: FontWeight.w700,
          color: Colors.white,
        ),
        displayMedium: TextStyle(
          fontSize: 24,
          fontWeight: FontWeight.w600,
          color: Colors.white,
        ),
        bodyLarge: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w400,
          color: Colors.white,
        ),
        bodyMedium: TextStyle(
          fontSize: 14,
          fontWeight: FontWeight.w400,
          color: Colors.white70,
        ),
      ),
      colorScheme: ColorScheme.dark(
        primary: AppTheme.primaryBlue,
        secondary: AppTheme.secondaryPurple,
        surface: const Color(0xFF1C1C1E),
        error: AppTheme.errorRed,
        onPrimary: Colors.white,
        onSecondary: Colors.white,
        onSurface: Colors.white,
      ),
    );
  }
}

/// Main navigator that manages navigation between screens
class MainNavigator extends StatefulWidget {
  const MainNavigator({Key? key}) : super(key: key);

  @override
  State<MainNavigator> createState() => _MainNavigatorState();
}

class _MainNavigatorState extends State<MainNavigator> {
  int _currentIndex = 1; // Start at Home

  void _onNavigationTap(int index) {
    setState(() {
      _currentIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    Widget currentScreen;

    switch (_currentIndex) {
      case 0:
        currentScreen = const PlaceholderScreen(title: 'Routes');
        break;
      case 1:
        currentScreen = const HomeScreen();
        break;
      case 2:
        currentScreen = const EventsScreen();
        break;
      case 3:
        currentScreen = const PlaceholderScreen(title: 'News');
        break;
      case 4:
        currentScreen = const PlaceholderScreen(title: 'Chat');
        break;
      default:
        currentScreen = const HomeScreen();
    }

    // Wrap the screen with navigation bar
    return Stack(
      children: [
        currentScreen,
        // The GlassBottomNavBar is already included in each screen
      ],
    );
  }
}

/// Placeholder screen for unimplemented sections
class PlaceholderScreen extends StatelessWidget {
  final String title;

  const PlaceholderScreen({
    Key? key,
    required this.title,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppTheme.darkBackground : AppTheme.lightBackground,
      body: SafeArea(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                Icons.construction,
                size: 80,
                color: AppTheme.primaryBlue.withOpacity(0.5),
              ),
              const SizedBox(height: 24),
              Text(
                title,
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.w700,
                  color: AppTheme.primaryBlue,
                ),
              ),
              const SizedBox(height: 12),
              Text(
                'Coming Soon',
                style: TextStyle(
                  fontSize: 16,
                  color: isDark ? Colors.white60 : Colors.black54,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
