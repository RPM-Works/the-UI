# Burnout - Gen Z Car Enthusiast Social Media App

A modern, Flutter-based mobile application for car enthusiasts to connect, share builds, and discover automotive events.

## Features

### Screens Implemented

1. **Home Feed** - Personalized feed with greeting, search, and news
2. **Events** - Browse car meets and events with detailed table view
3. **Routes/Map** - Location-based features for driving routes (placeholder)
4. **News** - Automotive news and community updates
5. **Chat** - Connect with other enthusiasts (placeholder)
6. **Profile** - User profiles with tabs (Posts, Sparks, Auto-Bits)
7. **Car Profile** - Detailed car build information and modifications
8. **Add Post** - Create new content (placeholder)

### Design Features

- **Dark theme** with royal blue (#4169E1) accent color
- **Clean card-based UI** with glowing blue borders
- **Smooth navigation** with bottom tab bar
- **Reusable components** for consistency
- **Responsive layouts** for different screen sizes
- **Google Fonts** (Inter) for modern typography

## Tech Stack

- **Flutter SDK** - Cross-platform mobile framework
- **Dart** - Programming language
- **Google Fonts** - Typography
- **Material Design** - UI components

## Project Structure

```
flutter_burnout/
├── lib/
│   ├── constants/
│   │   ├── app_colors.dart       # Color scheme constants
│   │   └── app_theme.dart        # App-wide theme configuration
│   ├── screens/
│   │   ├── home_screen.dart      # Home feed with greeting
│   │   ├── events_screen.dart    # Events with table layout
│   │   ├── routes_screen.dart    # Map/routes placeholder
│   │   ├── news_screen.dart      # News feed
│   │   ├── chat_screen.dart      # Chat/messages placeholder
│   │   ├── profile_screen.dart   # User profile with tabs
│   │   ├── car_profile_screen.dart # Car detail screen
│   │   └── add_post_screen.dart  # Create post placeholder
│   ├── widgets/
│   │   ├── bottom_nav_bar.dart   # Bottom navigation bar
│   │   ├── post_card.dart        # Reusable post card
│   │   ├── news_card.dart        # Reusable news card
│   │   └── group_circle.dart     # Circular group icon
│   └── main.dart                 # App entry point
├── pubspec.yaml                  # Dependencies
└── README.md                     # This file
```

## Setup Instructions

### Prerequisites

1. **Flutter SDK** (3.0.0 or higher)
   ```bash
   # Check Flutter version
   flutter --version
   ```

2. **IDE** - VS Code or Android Studio with Flutter plugins

3. **Mobile Emulator/Device**
   - iOS: Xcode (macOS only)
   - Android: Android Studio with emulator

### Installation

1. **Navigate to the Flutter project directory**
   ```bash
   cd the-UI/flutter_burnout
   ```

2. **Install dependencies**
   ```bash
   flutter pub get
   ```

3. **Run the app**

   **On iOS Simulator (macOS only):**
   ```bash
   flutter run -d "iPhone 15 Pro"
   ```

   **On Android Emulator:**
   ```bash
   flutter run -d emulator-5554
   ```

   **On Connected Device:**
   ```bash
   # List available devices
   flutter devices

   # Run on specific device
   flutter run -d <device_id>
   ```

4. **Build for release**

   **Android APK:**
   ```bash
   flutter build apk --release
   ```

   **iOS (macOS only):**
   ```bash
   flutter build ios --release
   ```

## Architecture

### Color Scheme

The app uses a Gen Z-focused dark theme:

- **Primary Blue**: `#4169E1` (Royal Blue)
- **Electric Blue**: `#4D4DFF`
- **Background**: `#000000` (Pure Black)
- **Card Background**: `#0A0A0A` (Almost Black)
- **Text White**: `#FFFFFF`
- **Text Gray**: `#B0B0B0`

### Component Structure

#### Reusable Widgets

1. **BurnoutBottomNavBar** - Fixed bottom navigation with 5 tabs
2. **PostCard** - Car post card with image, username, and modifications
3. **NewsCard** - News article card with image and description
4. **GroupCircle** - Circular group/club icon

#### Screen Flow

```
MainNavigator (Bottom Nav)
├── RoutesScreen (Tab 0)
├── HomeScreen (Tab 1) ← Default
├── AddPostScreen (Tab 2)
├── NewsScreen (Tab 3)
└── ChatScreen (Tab 4)

Additional Screens (Navigable)
├── ProfileScreen
├── CarProfileScreen
└── EventsScreen
```

## Styling Constants

### Text Styles

All text uses Google Fonts (Inter family):

- **Display Large**: 32px, Bold
- **Display Medium**: 28px, Bold
- **Headline Large**: 24px, Bold, Blue
- **Headline Medium**: 20px, Semi-bold, Blue
- **Body Large**: 16px, Normal
- **Body Medium**: 14px, Normal
- **Body Small**: 12px, Normal, Gray

### Card Styling

```dart
- Background: #0A0A0A
- Border: 2.5px solid #4169E1
- Border Radius: 12px
- Shadow: Blue glow (0.5 opacity)
```

## State Management

Currently using **StatefulWidget** for simple state management. For production, consider:

- **Provider** - Simple and recommended by Flutter team
- **Riverpod** - Modern, compile-safe state management
- **Bloc** - For complex state logic
- **GetX** - All-in-one solution

## Next Steps / TODO

### High Priority

- [ ] Integrate real map functionality (Google Maps / Apple Maps)
- [ ] Implement authentication (Firebase Auth / Supabase)
- [ ] Connect to backend API
- [ ] Add image upload for posts and profiles
- [ ] Implement real-time chat functionality

### Medium Priority

- [ ] Add animations and transitions
- [ ] Implement infinite scroll for feeds
- [ ] Add pull-to-refresh functionality
- [ ] Create post creation form
- [ ] Add event RSVP functionality
- [ ] Implement search functionality

### Low Priority

- [ ] Add dark/light theme toggle
- [ ] Implement notifications
- [ ] Add analytics
- [ ] Create onboarding flow
- [ ] Add settings screen
- [ ] Implement offline mode

## Testing

Run tests with:

```bash
flutter test
```

## Performance Optimization

For optimal performance:

1. **Use const constructors** wherever possible
2. **Lazy load images** with cached_network_image
3. **Implement pagination** for large lists
4. **Optimize rebuilds** with keys and const widgets

## Contributing

This is a prototype/MVP. To contribute:

1. Fork the repository
2. Create a feature branch
3. Follow Flutter style guide
4. Submit pull request

## Design Reference

The UI matches the provided Canva prototypes with:

- Exact color scheme (#4169E1 royal blue, black backgrounds)
- Card-based layouts with glowing borders
- Clean, modern Gen Z aesthetic
- Touch-friendly interactive elements

## Troubleshooting

### Common Issues

1. **"Flutter not found"**
   - Ensure Flutter is in your PATH
   - Run `flutter doctor` to diagnose

2. **"No devices found"**
   - Start an emulator or connect a physical device
   - Run `flutter devices` to verify

3. **"Package not found"**
   - Run `flutter pub get`
   - Delete `pubspec.lock` and retry

4. **Build errors**
   - Run `flutter clean`
   - Run `flutter pub get`
   - Rebuild the app

## License

[Add your license here]

## Contact

For questions or feedback about the Burnout app, please contact the development team.

---

**Built with Flutter** 💙 **for Car Enthusiasts** 🏎️
