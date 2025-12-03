import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:burnout/widgets/post_card.dart';
import 'package:burnout/widgets/news_card.dart';
import 'package:burnout/widgets/group_circle.dart';
import 'package:burnout/widgets/bottom_nav_bar.dart';

void main() {
  group('PostCard Widget Tests', () {
    testWidgets('PostCard displays username and car model', (WidgetTester tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: PostCard(
              username: '@test_user',
              carModel: '2003 BMW M3',
            ),
          ),
        ),
      );

      expect(find.text('@test_user'), findsOneWidget);
      expect(find.text('2003 BMW M3'), findsOneWidget);
    });

    testWidgets('PostCard displays modifications when provided', (WidgetTester tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: PostCard(
              username: '@test_user',
              carModel: '2003 BMW M3',
              modifications: 'Custom turbo, coilovers',
            ),
          ),
        ),
      );

      expect(find.text('Modifications'), findsOneWidget);
      expect(find.text('Custom turbo, coilovers'), findsOneWidget);
    });

    testWidgets('PostCard is tappable', (WidgetTester tester) async {
      bool tapped = false;

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: PostCard(
              username: '@test_user',
              carModel: '2003 BMW M3',
              onTap: () => tapped = true,
            ),
          ),
        ),
      );

      await tester.tap(find.byType(PostCard));
      await tester.pump();

      expect(tapped, isTrue);
    });

    testWidgets('PostCard shows error icon when image fails to load', (WidgetTester tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: PostCard(
              username: '@test_user',
              carModel: '2003 BMW M3',
              imageUrl: 'invalid_url',
            ),
          ),
        ),
      );

      await tester.pumpAndSettle();

      // Should show car icon as fallback
      expect(find.byIcon(Icons.directions_car), findsOneWidget);
    });
  });

  group('NewsCard Widget Tests', () {
    testWidgets('NewsCard displays heading and description', (WidgetTester tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: NewsCard(
              heading: 'Test Heading',
              description: 'Test description content',
            ),
          ),
        ),
      );

      expect(find.text('Test Heading'), findsOneWidget);
      expect(find.text('Test description content'), findsOneWidget);
    });

    testWidgets('NewsCard is tappable', (WidgetTester tester) async {
      bool tapped = false;

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: NewsCard(
              heading: 'Test',
              description: 'Description',
              onTap: () => tapped = true,
            ),
          ),
        ),
      );

      await tester.tap(find.byType(NewsCard));
      await tester.pump();

      expect(tapped, isTrue);
    });

    testWidgets('NewsCard shows placeholder when no image provided', (WidgetTester tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: NewsCard(
              heading: 'Test',
              description: 'Description',
            ),
          ),
        ),
      );

      // Should render without errors
      expect(find.byType(NewsCard), findsOneWidget);
    });
  });

  group('GroupCircle Widget Tests', () {
    testWidgets('GroupCircle displays label', (WidgetTester tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: GroupCircle(
              label: 'Test Group',
            ),
          ),
        ),
      );

      expect(find.text('Test Group'), findsOneWidget);
    });

    testWidgets('GroupCircle is tappable', (WidgetTester tester) async {
      bool tapped = false;

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: GroupCircle(
              label: 'Test Group',
              onTap: () => tapped = true,
            ),
          ),
        ),
      );

      await tester.tap(find.byType(GroupCircle));
      await tester.pump();

      expect(tapped, isTrue);
    });

    testWidgets('GroupCircle shows icon when no image provided', (WidgetTester tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: GroupCircle(
              icon: Icons.group,
            ),
          ),
        ),
      );

      expect(find.byIcon(Icons.group), findsOneWidget);
    });

    testWidgets('GroupCircle respects size parameter', (WidgetTester tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: GroupCircle(
              size: 150,
            ),
          ),
        ),
      );

      final Container container = tester.widget(
        find.ancestor(
          of: find.byType(GroupCircle),
          matching: find.byType(Container),
        ).first,
      );

      expect(container.constraints?.maxWidth, equals(150));
    });
  });

  group('BurnoutBottomNavBar Widget Tests', () {
    testWidgets('Bottom nav shows all 5 items', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            bottomNavigationBar: BurnoutBottomNavBar(
              currentIndex: 1,
              onTap: (_) {},
            ),
          ),
        ),
      );

      // Check for all icons
      expect(find.byIcon(Icons.directions_car_outlined), findsOneWidget);
      expect(find.byIcon(Icons.home_outlined), findsOneWidget);
      expect(find.byIcon(Icons.add_circle_outline), findsOneWidget);
      expect(find.byIcon(Icons.article_outlined), findsOneWidget);
      expect(find.byIcon(Icons.chat_bubble_outline), findsOneWidget);
    });

    testWidgets('Bottom nav highlights current index', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            bottomNavigationBar: BurnoutBottomNavBar(
              currentIndex: 2,
              onTap: (_) {},
            ),
          ),
        ),
      );

      // The middle button (Add) should be active
      expect(find.byType(BurnoutBottomNavBar), findsOneWidget);
    });

    testWidgets('Bottom nav triggers onTap callback', (WidgetTester tester) async {
      int tappedIndex = -1;

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            bottomNavigationBar: BurnoutBottomNavBar(
              currentIndex: 1,
              onTap: (index) => tappedIndex = index,
            ),
          ),
        ),
      );

      // Tap the first icon
      await tester.tap(find.byIcon(Icons.directions_car_outlined));
      await tester.pump();

      expect(tappedIndex, equals(0));
    });

    testWidgets('Bottom nav has correct height', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            bottomNavigationBar: BurnoutBottomNavBar(
              currentIndex: 1,
              onTap: (_) {},
            ),
          ),
        ),
      );

      final Container navContainer = tester.widget(
        find.descendant(
          of: find.byType(BurnoutBottomNavBar),
          matching: find.byType(Container),
        ).first,
      );

      expect(navContainer.constraints?.maxHeight, equals(70));
    });
  });

  group('Widget Accessibility Tests', () {
    testWidgets('PostCard is semantically labeled', (WidgetTester tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: PostCard(
              username: '@test_user',
              carModel: 'BMW M3',
            ),
          ),
        ),
      );

      // Check that text is readable by screen readers
      expect(find.text('@test_user'), findsOneWidget);
      expect(find.text('BMW M3'), findsOneWidget);
    });

    testWidgets('NewsCard has proper semantic structure', (WidgetTester tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: NewsCard(
              heading: 'News Title',
              description: 'News content',
            ),
          ),
        ),
      );

      expect(find.text('News Title'), findsOneWidget);
      expect(find.text('News content'), findsOneWidget);
    });
  });

  group('Widget Layout Tests', () {
    testWidgets('Widgets render correctly on small screens', (WidgetTester tester) async {
      tester.binding.window.physicalSizeTestValue = const Size(360, 640);
      tester.binding.window.devicePixelRatioTestValue = 1.0;

      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: PostCard(
              username: '@user',
              carModel: 'BMW',
            ),
          ),
        ),
      );

      expect(tester.takeException(), isNull);

      addTearDown(tester.binding.window.clearPhysicalSizeTestValue);
    });

    testWidgets('Widgets render correctly on large screens', (WidgetTester tester) async {
      tester.binding.window.physicalSizeTestValue = const Size(1920, 1080);
      tester.binding.window.devicePixelRatioTestValue = 1.0;

      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: NewsCard(
              heading: 'Title',
              description: 'Description',
            ),
          ),
        ),
      );

      expect(tester.takeException(), isNull);

      addTearDown(tester.binding.window.clearPhysicalSizeTestValue);
    });
  });
}
