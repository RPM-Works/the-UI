# Burnout - Apple-Style 3D UI Flutter Library

A complete Flutter widget library implementing Apple-style design with glassmorphism, 3D effects, and smooth animations for a car enthusiast social app.

## Features

- Apple Wallet-style profile cards with 3D rotation
- Glassmorphic UI components with backdrop blur
- Floating dock-style bottom navigation
- Multi-layer shadow patterns
- Spring physics animations
- 60fps smooth performance
- Light and dark mode support
- Full accessibility support

## Installation

### Dependencies

Add the following to your `pubspec.yaml`:

```yaml
dependencies:
  flutter:
    sdk: flutter
  glassmorphism: ^3.0.0
  flutter_animate: ^4.5.0
  font_awesome_flutter: ^10.6.0
  shimmer: ^3.0.0
  provider: ^6.1.1
```

Run:
```bash
flutter pub get
```

## Widget Library

### 1. Bottom Navigation Bar

Floating dock-style navigation with glassmorphism and spring animations.

**Usage:**
```dart
GlassBottomNavBar(
  currentIndex: _currentIndex,
  onTap: (index) {
    setState(() => _currentIndex = index);
  },
)
```

**Features:**
- 90px height with 20px bottom margin
- Backdrop blur (sigmaX: 10, sigmaY: 10)
- 5 navigation items
- Spring animation on tap (scale to 0.85)
- Active state gradient glow

---

### 2. Profile Card

Apple Wallet-style profile card with 3D rotation and glassmorphism.

**Usage:**
```dart
ProfileCard(
  username: 'TheMasterBender',
  carModel: '2023 Subaru WRX STI',
  carImage: 'assets/car.jpg',
  mods: [
    'Stage 3 Turbo Kit',
    'Coilover Suspension',
    'Custom Exhaust',
  ],
  stats: {
    'Posts': 156,
    'Meets': 42,
    'Miles': 12500,
  },
  onTap: () {
    print('Card tapped');
  },
)
```

**Features:**
- 3D rotation with Matrix4 transforms
- Spring animation (Curves.elasticOut)
- Scale animation (1.0 to 1.05)
- QR code button
- Stats in glass containers
- Modifications list

---

### 3. Primary Button

Apple blue gradient button with glow effect.

**Usage:**
```dart
PrimaryButton(
  text: 'Start Navigation',
  icon: Icons.navigation,
  onPressed: () {
    // Handle press
  },
)
```

**Features:**
- Gradient from #007AFF to #0051D5
- Inner glow overlay
- Scale to 0.95 on press
- Optional icon support

---

### 4. Glass Button

Secondary glass button with backdrop blur.

**Usage:**
```dart
GlassButton(
  text: 'Cancel',
  icon: Icons.close,
  onPressed: () {
    // Handle press
  },
)
```

**Features:**
- Backdrop blur effect
- Semi-transparent background
- Opacity animation on press

---

### 5. Icon Button Glass

Circular glass icon button with spring animation.

**Usage:**
```dart
IconButtonGlass(
  icon: Icons.edit,
  onPressed: () {
    // Handle press
  },
  isPrimary: true, // Use primary blue gradient
  size: 48,
)
```

**Features:**
- Spring animation (Curves.elasticOut)
- Primary or glass variant
- Customizable size

---

### 6. Content Card

Apple-style content card for posts and news.

**Usage:**
```dart
ContentCard(
  title: 'Epic Car Meet',
  subtitle: 'Join us this weekend!',
  imageUrl: 'assets/event.jpg',
  onTap: () {
    // Handle tap
  },
  useGlassOverlay: false,
  actions: [
    Icon(Icons.favorite),
    Text('234'),
  ],
)
```

**Features:**
- Multi-layer shadows
- Optional glass overlay
- Custom content support
- Action buttons row
- Scale animation on press

---

### 7. Glass Search Bar

Pill-shaped search bar with glassmorphism.

**Usage:**
```dart
GlassSearchBar(
  placeholder: 'Search...',
  onChanged: (value) {
    print('Search: $value');
  },
  onSubmitted: (value) {
    // Handle submit
  },
)
```

**Features:**
- 44px height (Apple touch target)
- Backdrop blur
- Focus state border animation
- Clear button when text present

---

### 8. Routes HUD

Routes HUD with map preview and navigation info.

**Usage:**
```dart
RoutesHUD(
  destination: 'Sunset Boulevard',
  eta: '15 min',
  distance: '8.3 mi',
  speed: 45,
  onNavigate: () {
    // Start navigation
  },
  onClose: () {
    // Close HUD
  },
)
```

**Features:**
- Map preview section
- Speed indicator
- ETA and distance chips
- Navigation button

---

### 9. Communication HUD

Walkie-talkie interface with push-to-talk.

**Usage:**
```dart
CommunicationHUD(
  channelName: 'Car Crew Channel',
  activeUsers: 8,
  isTransmitting: false,
  onPushToTalk: () {
    // Start transmission
  },
  onReleaseTalk: () {
    // Stop transmission
  },
  onClose: () {
    // Close HUD
  },
)
```

**Features:**
- Push-to-talk button (120x120px)
- Pulse animation when transmitting
- Audio level indicator
- Active users display
- Channel info

---

### 10. Slide-Up Modal

Bottom sheet modal with spring animation and swipe-to-dismiss.

**Usage:**
```dart
SlideUpModal.show(
  context: context,
  title: 'Filter Posts',
  initialChildSize: 0.6,
  child: ModalContent(
    children: [
      Text('Modal Content'),
      // Add your content
    ],
  ),
)
```

**Features:**
- Spring slide animation
- Drag handle
- Swipe to dismiss
- Glassmorphic background
- Customizable sizes

---

## Theme Configuration

Access theme constants:

```dart
import 'package:burnout_ui/theme/app_theme.dart';

// Colors
AppTheme.primaryBlue      // #007AFF
AppTheme.primaryBlueDark  // #0051D5
AppTheme.secondaryPurple  // #7B68EE

// Gradients
AppTheme.primaryGradient  // Blue gradient
AppTheme.secondaryGradient // Purple gradient

// Shadows
AppTheme.multiLayerShadow // Multi-layer shadow pattern
AppTheme.buttonShadow     // Button shadow

// Animation Curves
AppTheme.springCurve      // Curves.elasticOut
AppTheme.smoothCurve      // Curves.easeInOutCubic
```

## Example Screens

### Home Screen

```dart
import 'package:burnout_ui/screens/home_screen.dart';

// Use in your app
MaterialApp(
  home: HomeScreen(),
)
```

**Features:**
- Posts feed with content cards
- Search bar
- Quick action buttons (Routes, Walkie)
- Filter modal
- Bottom navigation

### Profile Screen

```dart
import 'package:burnout_ui/screens/profile_screen.dart';

// Use in your app
MaterialApp(
  home: ProfileScreen(),
)
```

**Features:**
- Profile cards
- Edit profile modal
- Car gallery modal
- Share functionality
- Stats view

## Running the App

```bash
# Get dependencies
flutter pub get

# Run on iOS
flutter run -d ios

# Run on Android
flutter run -d android

# Build for production
flutter build apk --release  # Android
flutter build ios --release  # iOS
```

## Design Specifications

### Colors

- **Primary Blue:** `#007AFF`
- **Primary Blue Dark:** `#0051D5`
- **Secondary Purple:** `#7B68EE`
- **Accent Green:** `#32D74B`
- **Error Red:** `#FF3B30`
- **Warning Orange:** `#FF9500`

### Typography

- **Display Large:** 32px, Bold
- **Display Medium:** 24px, Semi-Bold
- **Body Large:** 16px, Regular
- **Body Medium:** 14px, Regular
- **Caption:** 12px, Regular

### Shadows

**Multi-layer Pattern:**
- Light from top-left: `Offset(-4, -4)`, blur: 15px, white 50% opacity
- Dark from bottom-right: `Offset(4, 4)`, blur: 15px, black 20% opacity

**Button Shadow:**
- `Offset(0, 8)`, blur: 20px, primary blue 30% opacity

### Animations

- **Duration:** 150-600ms
- **Curves:** elasticOut, easeInOutCubic, fastOutSlowIn
- **Target:** 60fps

### Accessibility

- **Minimum touch targets:** 44x44pt (Apple guidelines)
- **Contrast ratios:** WCAG AA compliant
- **Screen reader support:** Semantic labels on all interactive elements

## Project Structure

```
flutter/
├── lib/
│   ├── main.dart                 # App entry point
│   ├── theme/
│   │   └── app_theme.dart        # Theme configuration
│   ├── widgets/
│   │   ├── widgets.dart          # Export file
│   │   ├── glass_bottom_nav_bar.dart
│   │   ├── profile_card.dart
│   │   ├── primary_button.dart
│   │   ├── glass_button.dart
│   │   ├── icon_button_glass.dart
│   │   ├── content_card.dart
│   │   ├── glass_search_bar.dart
│   │   ├── routes_hud.dart
│   │   ├── communication_hud.dart
│   │   └── slide_up_modal.dart
│   └── screens/
│       ├── home_screen.dart
│       └── profile_screen.dart
├── pubspec.yaml
└── README.md
```

## Performance Tips

1. **Use const constructors** wherever possible
2. **Avoid rebuilding entire widget tree** - use AnimatedBuilder for animations
3. **Optimize images** - use appropriate resolutions
4. **Cache expensive operations** - especially blur filters
5. **Test on real devices** - ensure 60fps on target devices

## Browser/Platform Support

- **iOS:** 13.0+
- **Android:** API 21+ (Lollipop)
- **Web:** Modern browsers with backdrop-filter support

## License

This is a demo/example project. Use freely for your projects.

## Credits

Design inspired by Apple's iOS design system and Wallet app.
