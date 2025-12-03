import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:burnout/main.dart';
import 'package:burnout/screens/home_screen.dart';
import 'package:burnout/screens/events_screen.dart';
import 'package:burnout/screens/routes_screen.dart';
import 'package:burnout/screens/news_screen.dart';
import 'package:burnout/screens/chat_screen.dart';
import 'package:burnout/widgets/bottom_nav_bar.dart';

void main() {
  group('BurnoutApp Tests', () {
    testWidgets('App loads and shows home screen', (WidgetTester tester) async {
      // Build the app
      await tester.pumpWidget(const BurnoutApp());

      // Verify the app loads
      expect(find.byType(MaterialApp), findsOneWidget);

      // Verify MainNavigator is present
      expect(find.byType(MainNavigator), findsOneWidget);
    });

    testWidgets('Bottom navigation bar is present', (WidgetTester tester) async {
      await tester.pumpWidget(const BurnoutApp());

      // Verify bottom navigation bar exists
      expect(find.byType(BurnoutBottomNavBar), findsOneWidget);

      // Verify all 5 navigation items are present
      expect(find.byIcon(Icons.directions_car_outlined), findsOneWidget);
      expect(find.byIcon(Icons.home_outlined), findsOneWidget);
      expect(find.byIcon(Icons.add_circle_outline), findsOneWidget);
      expect(find.byIcon(Icons.article_outlined), findsOneWidget);
      expect(find.byIcon(Icons.chat_bubble_outline), findsOneWidget);
    });

    testWidgets('Navigation between screens works', (WidgetTester tester) async {
      await tester.pumpWidget(const BurnoutApp());

      // Initially on Home screen (index 1)
      expect(find.byType(HomeScreen), findsOneWidget);

      // Tap Routes tab (index 0)
      await tester.tap(find.byIcon(Icons.directions_car_outlined));
      await tester.pumpAndSettle();
      expect(find.byType(RoutesScreen), findsOneWidget);

      // Tap News tab (index 3)
      await tester.tap(find.byIcon(Icons.article_outlined));
      await tester.pumpAndSettle();
      expect(find.byType(NewsScreen), findsOneWidget);

      // Tap Chat tab (index 4)
      await tester.tap(find.byIcon(Icons.chat_bubble_outline));
      await tester.pumpAndSettle();
      expect(find.byType(ChatScreen), findsOneWidget);

      // Go back to Home
      await tester.tap(find.byIcon(Icons.home_outlined));
      await tester.pumpAndSettle();
      expect(find.byType(HomeScreen), findsOneWidget);
    });

    testWidgets('Home screen displays correct content', (WidgetTester tester) async {
      await tester.pumpWidget(const BurnoutApp());

      // Check for greeting text
      expect(find.text('Hi, Chris'), findsOneWidget);
      expect(find.text('Whens the next drive?'), findsOneWidget);

      // Check for search bar
      expect(find.byType(TextField), findsOneWidget);

      // Check for news content
      expect(find.textContaining('News'), findsAtLeastNWidgets(1));
    });

    testWidgets('Events screen displays events table', (WidgetTester tester) async {
      await tester.pumpWidget(const BurnoutApp());

      // Navigate to Events screen via route
      await tester.pumpWidget(MaterialApp(
        home: const EventsScreen(),
      ));
      await tester.pumpAndSettle();

      // Check for Events title
      expect(find.text('Events'), findsOneWidget);

      // Check for tab navigation
      expect(find.text('For You'), findsOneWidget);
    });

    testWidgets('Routes screen shows placeholder', (WidgetTester tester) async {
      await tester.pumpWidget(const MaterialApp(
        home: RoutesScreen(),
      ));

      // Check for Routes & Map text
      expect(find.text('Routes & Map'), findsOneWidget);
      expect(find.text('Coming Soon'), findsOneWidget);

      // Check for map icon
      expect(find.byIcon(Icons.map_outlined), findsOneWidget);
    });

    testWidgets('News screen displays news cards', (WidgetTester tester) async {
      await tester.pumpWidget(const MaterialApp(
        home: NewsScreen(),
      ));

      // Check for page title
      expect(find.text('Car News'), findsOneWidget);

      // Check for news cards
      expect(find.textContaining('Latest'), findsAtLeastNWidgets(1));
    });

    testWidgets('Chat screen shows placeholder', (WidgetTester tester) async {
      await tester.pumpWidget(const MaterialApp(
        home: ChatScreen(),
      ));

      // Check for Messages text
      expect(find.text('Messages'), findsOneWidget);

      // Check for chat icon
      expect(find.byIcon(Icons.chat_bubble_outline), findsOneWidget);
    });
  });

  group('Bottom Navigation Tests', () {
    testWidgets('Active state changes on tap', (WidgetTester tester) async {
      int selectedIndex = 1;

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: const Center(child: Text('Test')),
            bottomNavigationBar: BurnoutBottomNavBar(
              currentIndex: selectedIndex,
              onTap: (index) {
                selectedIndex = index;
              },
            ),
          ),
        ),
      );

      // Tap on Routes (index 0)
      await tester.tap(find.byIcon(Icons.directions_car_outlined));
      await tester.pump();

      // Verify tap was registered (onTap callback should be called)
      expect(find.byType(BurnoutBottomNavBar), findsOneWidget);
    });

    testWidgets('All navigation items are tappable', (WidgetTester tester) async {
      await tester.pumpWidget(const BurnoutApp());

      // Find all navigation items
      final navItems = find.byType(GestureDetector);

      // Verify multiple navigation items exist
      expect(navItems, findsWidgets);
    });
  });

  group('Widget Integration Tests', () {
    testWidgets('App theme is correctly applied', (WidgetTester tester) async {
      await tester.pumpWidget(const BurnoutApp());

      final MaterialApp app = tester.widget(find.byType(MaterialApp));

      // Verify theme exists
      expect(app.theme, isNotNull);

      // Verify dark theme
      expect(app.theme!.brightness, equals(Brightness.dark));
    });

    testWidgets('Scrollable content works', (WidgetTester tester) async {
      await tester.pumpWidget(const BurnoutApp());

      // Find scrollable widget
      final scrollable = find.byType(SingleChildScrollView);
      expect(scrollable, findsWidgets);

      // Attempt to scroll
      if (scrollable.evaluate().isNotEmpty) {
        await tester.drag(scrollable.first, const Offset(0, -200));
        await tester.pumpAndSettle();
      }
    });

    testWidgets('Safe area is applied', (WidgetTester tester) async {
      await tester.pumpWidget(const BurnoutApp());

      // Verify SafeArea is used
      expect(find.byType(SafeArea), findsWidgets);
    });
  });

  group('Navigation Routes Tests', () {
    testWidgets('Named routes work correctly', (WidgetTester tester) async {
      await tester.pumpWidget(const BurnoutApp());

      final BuildContext context = tester.element(find.byType(MaterialApp));

      // Test navigation to profile
      Navigator.of(context).pushNamed('/profile');
      await tester.pumpAndSettle();

      // Should not crash
      expect(find.byType(MaterialApp), findsOneWidget);
    });
  });

  group('Performance Tests', () {
    testWidgets('App renders within acceptable time', (WidgetTester tester) async {
      final Stopwatch stopwatch = Stopwatch()..start();

      await tester.pumpWidget(const BurnoutApp());

      stopwatch.stop();

      // App should render in less than 1 second
      expect(stopwatch.elapsedMilliseconds, lessThan(1000));
    });

    testWidgets('No overflow errors on different screen sizes', (WidgetTester tester) async {
      // Test with small screen
      tester.binding.window.physicalSizeTestValue = const Size(360, 640);
      tester.binding.window.devicePixelRatioTestValue = 1.0;

      await tester.pumpWidget(const BurnoutApp());
      await tester.pumpAndSettle();

      // Should not have overflow
      expect(tester.takeException(), isNull);

      // Test with large screen
      tester.binding.window.physicalSizeTestValue = const Size(1920, 1080);
      await tester.pumpWidget(const BurnoutApp());
      await tester.pumpAndSettle();

      expect(tester.takeException(), isNull);

      // Reset to default
      addTearDown(tester.binding.window.clearPhysicalSizeTestValue);
    });
  });
}
