# Apple-Style 3D UI Components for Flutter

Complete widget library implementing Apple-inspired glassmorphism, multi-layer shadows, smooth animations, and depth effects for the Burnout car enthusiast app.

## 📦 Installation

### Dependencies

Add these packages to your `pubspec.yaml`:

```yaml
dependencies:
  glassmorphism: ^3.0.0
  flutter_animate: ^4.5.0
  font_awesome_flutter: ^10.6.0
  shimmer: ^3.0.0
```

Run:
```bash
flutter pub get
```

## 🎨 Theme System

### AppleTheme (`lib/constants/apple_theme.dart`)

Central theme configuration with all Apple-style design tokens:

#### Colors
```dart
AppleTheme.appleBlue        // Primary blue (#007AFF)
AppleTheme.appleGreen       // Accent green (#34C759)
AppleTheme.appleOrange      // Accent orange (#FF9500)
AppleTheme.appleRed         // Accent red (#FF3B30)
AppleTheme.glassLight       // Semi-transparent white
AppleTheme.glassDark        // Semi-transparent black
```

#### Gradients
```dart
AppleTheme.primaryGradient  // Blue gradient for buttons
AppleTheme.glowGradient     // Glow effect for active states
AppleTheme.glassGradient    // Glass overlay gradient
```

#### Shadows
```dart
AppleTheme.cardShadows      // Multi-layer card shadows
AppleTheme.floatingShadows  // Floating element shadows
AppleTheme.buttonShadows    // Button glow shadows
AppleTheme.neumorphicShadows // Depth effect shadows
```

#### Blur Filters
```dart
AppleTheme.standardBlur     // sigmaX: 10, sigmaY: 10
AppleTheme.strongBlur       // sigmaX: 20, sigmaY: 20
AppleTheme.lightBlur        // sigmaX: 5, sigmaY: 5
```

#### Border Radius
```dart
AppleTheme.radiusSmall      // 8px
AppleTheme.radiusMedium     // 12px
AppleTheme.radiusLarge      // 16px
AppleTheme.radiusXLarge     // 20px
AppleTheme.radiusXXLarge    // 24px
AppleTheme.radiusPill       // 30px
```

#### Animation Curves
```dart
AppleTheme.easeInOutCubic   // Smooth transitions
AppleTheme.elasticOut       // Bounce effect
AppleTheme.fastOutSlowIn    // Natural motion
AppleTheme.spring           // Spring physics
```

## 🧩 Components

### 1. Bottom Navigation Bar

**File:** `lib/widgets/apple_bottom_nav.dart`

Apple-style floating dock navigation bar with glassmorphism.

#### Features
- Glassmorphic background with backdrop blur
- Multi-layer shadows for depth
- Spring scale animation on tap
- Haptic feedback
- Active state with gradient glow

#### Usage
```dart
AppleBottomNav(
  currentIndex: 1,
  onTap: (index) {
    setState(() => _currentIndex = index);
  },
)
```

#### Navigation Items
- **Routes** (Index 0): Map/Routes icon
- **Home** (Index 1): Home icon
- **Posts** (Index 2): Wrench icon
- **News** (Index 3): Article icon
- **Chat** (Index 4): Chat bubble icon

---

### 2. Buttons

**File:** `lib/widgets/apple_buttons.dart`

#### ApplePrimaryButton
Primary action button with gradient and glow effect.

```dart
ApplePrimaryButton(
  text: 'Get Started',
  icon: Icons.arrow_forward,
  onPressed: () {},
  isLoading: false,
)
```

**Properties:**
- `text`: Button text
- `onPressed`: Tap callback
- `icon`: Optional leading icon
- `width`: Optional width (default: auto)
- `height`: Button height (default: 50px)
- `isLoading`: Show loading indicator

**Features:**
- Apple Blue gradient background
- Soft glow shadow
- Scale animation on press (0.95x)
- Haptic feedback

#### AppleSecondaryButton
Glass-style secondary button.

```dart
AppleSecondaryButton(
  text: 'Cancel',
  icon: Icons.close,
  onPressed: () {},
)
```

**Features:**
- Glassmorphic background
- Backdrop blur
- Opacity change on press
- Subtle elevation

#### AppleIconButton
Circular glass icon button.

```dart
AppleIconButton(
  icon: Icons.favorite,
  size: 44.0,
  onPressed: () {},
  iconColor: Colors.white,
)
```

**Features:**
- Circular shape
- Glass background
- Spring scale animation
- Haptic feedback

#### ApplePillButton
Small pill-shaped button for tags/filters.

```dart
ApplePillButton(
  text: 'Racing',
  icon: Icons.sports_motorsports,
  isSelected: true,
  onPressed: () {},
)
```

---

### 3. Profile Cards

**File:** `lib/widgets/apple_profile_card.dart`

Apple Wallet-style swipeable profile cards.

#### Features
- 3D rotation on tilt
- Glassmorphic design
- Parallax effect
- Tap to expand with bounce animation
- Card entry spring animation

#### Usage
```dart
AppleProfileCard(
  carModel: '2023 Nissan GTR',
  userName: '@drift_king',
  carImageUrl: 'url',
  horsePower: 650,
  topSpeed: 195,
  year: '2023',
  mods: ['Turbo Kit', 'Carbon Body Kit'],
  isExpanded: false,
  onTap: () {},
)
```

**Card Elements:**
- Car photo background
- User stats in glass containers
- Modifications list
- QR code section
- Drop shadow for depth

---

### 4. Content Cards

**File:** `lib/widgets/apple_content_card.dart`

#### AppleContentCard
Full-featured content card for posts and news.

```dart
AppleContentCard(
  title: 'Modified GTR Build',
  subtitle: '@user · 2h ago',
  description: 'Just finished installing...',
  imageUrl: 'url',
  tags: ['GTR', 'Turbo'],
  hasGlassOverlay: true,
  onTap: () {},
)
```

**Features:**
- Multi-layer shadows
- Optional image section
- Glass overlay option
- Smooth press animation
- Tag display

#### AppleCompactCard
Compact card for list items.

```dart
AppleCompactCard(
  icon: Icons.person,
  title: 'User Name',
  subtitle: 'Last message',
  trailing: Text('2h ago'),
  onTap: () {},
  accentColor: AppleTheme.appleBlue,
)
```

---

### 5. Glass Widgets

**File:** `lib/widgets/apple_glass_widgets.dart`

#### AppleGlassContainer
Reusable glassmorphic container.

```dart
AppleGlassContainer(
  padding: EdgeInsets.all(16),
  borderRadius: AppleTheme.radiusLarge,
  child: YourWidget(),
)
```

#### AppleSearchBar
Apple-style search field with glassmorphism.

```dart
AppleSearchBar(
  placeholder: 'Search...',
  onChanged: (value) {},
  onClear: () {},
  autofocus: false,
)
```

**Features:**
- Pill shape
- Glass background
- Magnifying glass icon
- Clear button (appears on input)
- Focus expand animation
- Inset shadow

#### AppleGlassSection
Section container with header.

```dart
AppleGlassSection(
  title: 'Latest Posts',
  trailing: TextButton(...),
  child: YourContent(),
)
```

#### AppleStatDisplay
Glass container for statistics.

```dart
AppleStatDisplay(
  label: 'Events',
  value: '12',
  icon: Icons.event,
  accentColor: AppleTheme.appleOrange,
)
```

#### AppleInfoBadge
Small glass badge for info.

```dart
AppleInfoBadge(
  text: '+12',
  icon: Icons.trending_up,
  color: AppleTheme.appleGreen,
)
```

---

### 6. HUD Elements

**File:** `lib/widgets/apple_huds.dart`

#### AppleRoutesHUD
Floating glass container for route information.

```dart
AppleRoutesHUD(
  routeName: 'Mountain Pass',
  distance: '45.2 mi',
  duration: '1h 20m',
  eta: '3:45 PM',
  isExpanded: false,
  onToggle: () {},
)
```

**Features:**
- Map preview with blur edges
- Route stats with gradient text
- Compact/expanded states
- Smooth animation transition

#### AppleCommunicationHUD
Walkie-talkie style communication interface.

```dart
AppleCommunicationHUD(
  activeUsers: ['user1', 'user2'],
  isRecording: false,
  onPushToTalk: () {},
  onRelease: () {},
)
```

**Features:**
- Circular push-to-talk button
- Pulse animation when recording
- Active speaker indicators
- Glass background
- Slide up/down animation

---

### 7. Modals

**File:** `lib/widgets/apple_modals.dart`

#### Bottom Sheet Modal
```dart
showAppleBottomSheet(
  context: context,
  child: YourContent(),
  isDismissible: true,
  enableDrag: true,
  height: 500,
);
```

**Features:**
- Slide up animation (spring physics)
- Top rounded corners (24px)
- Drag handle
- Glassmorphic background
- Backdrop blur
- Swipe to dismiss

#### Alert Dialog
```dart
showAppleDialog(
  context: context,
  title: 'Confirm Action',
  message: 'Are you sure?',
  actions: [
    AppleDialogAction(
      label: 'Confirm',
      isDefault: true,
      onPressed: () {},
    ),
    AppleDialogAction(
      label: 'Cancel',
      isDestructive: true,
      onPressed: () {},
    ),
  ],
);
```

**Action Types:**
- `isDefault`: Blue text, bold
- `isDestructive`: Red text
- Regular: White text

#### Loading Modal
```dart
showAppleLoading(
  context,
  message: 'Loading...',
);

// Dismiss
Navigator.pop(context);
```

---

## 📱 Example Screens

**File:** `lib/screens/apple_demo_screen.dart`

Complete demo showcasing all components:

1. **Home Screen**: Search, stats, content feed
2. **Profile Screen**: Profile card, action buttons, stats
3. **Routes Screen**: Map with route HUD, communication HUD
4. **News Screen**: Filtered content cards
5. **Chat Screen**: Compact cards for conversations

### Using Demo Screen
```dart
// In your app
MaterialApp(
  home: AppleDemoScreen(),
)
```

---

## 🎯 Design Guidelines

### Touch Targets
Minimum 44x44pt per Apple Human Interface Guidelines:
```dart
AppleTheme.minTouchTarget // 44.0
```

### Accessibility
- High contrast ratios
- Clear visual hierarchy
- Haptic feedback
- Descriptive labels

### Performance
- 60fps animations
- Efficient blur usage
- Optimized shadows
- Proper disposal of controllers

### Light/Dark Mode Support
All components support both:
```dart
// Light mode glass
AppleTheme.glassLight
Colors.white.withOpacity(0.15)

// Dark mode glass
AppleTheme.glassDark
Colors.black.withOpacity(0.3)
```

---

## 🛠️ Customization

### Custom Glass Container
```dart
AppleGlassContainer(
  backgroundColor: Colors.purple.withOpacity(0.2),
  borderColor: Colors.purple.withOpacity(0.3),
  borderRadius: BorderRadius.circular(24),
  blur: ImageFilter.blur(sigmaX: 15, sigmaY: 15),
  child: YourWidget(),
)
```

### Custom Button Colors
```dart
// Extend ApplePrimaryButton or create custom
Container(
  decoration: BoxDecoration(
    gradient: LinearGradient(
      colors: [Colors.purple, Colors.blue],
    ),
    borderRadius: AppleTheme.radiusMedium,
    boxShadow: AppleTheme.buttonShadows,
  ),
  child: Material(
    color: Colors.transparent,
    child: InkWell(
      onTap: () {},
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Text('Custom Button'),
      ),
    ),
  ),
)
```

---

## 📐 Component Architecture

### File Structure
```
lib/
├── constants/
│   ├── apple_theme.dart        # Theme configuration
│   ├── app_colors.dart         # Original app colors
│   └── app_theme.dart          # Original app theme
├── widgets/
│   ├── apple_bottom_nav.dart   # Bottom navigation
│   ├── apple_buttons.dart      # All button types
│   ├── apple_content_card.dart # Content cards
│   ├── apple_glass_widgets.dart # Glass components
│   ├── apple_huds.dart         # HUD elements
│   ├── apple_modals.dart       # Modals & dialogs
│   └── apple_profile_card.dart # Profile cards
└── screens/
    └── apple_demo_screen.dart  # Demo & examples
```

### Animation Controllers
All animated widgets properly dispose controllers:
```dart
@override
void dispose() {
  _controller.dispose();
  super.dispose();
}
```

---

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   flutter pub get
   ```

2. **Import components:**
   ```dart
   import 'constants/apple_theme.dart';
   import 'widgets/apple_bottom_nav.dart';
   import 'widgets/apple_buttons.dart';
   // ... other imports
   ```

3. **Use in your screen:**
   ```dart
   Scaffold(
     body: YourContent(),
     bottomNavigationBar: AppleBottomNav(
       currentIndex: 0,
       onTap: (index) {},
     ),
   )
   ```

---

## 📝 Best Practices

### 1. Use Theme Constants
Always use `AppleTheme` constants for consistency:
```dart
// Good
padding: EdgeInsets.all(AppleTheme.spacing16)

// Avoid
padding: EdgeInsets.all(16)
```

### 2. Haptic Feedback
Add haptic feedback for better UX:
```dart
HapticFeedback.lightImpact();  // Light tap
HapticFeedback.mediumImpact(); // Button press
HapticFeedback.selectionClick(); // Toggle/select
```

### 3. Animation Durations
Use consistent durations:
```dart
AppleTheme.durationFast    // 150ms - UI feedback
AppleTheme.durationMedium  // 300ms - Transitions
AppleTheme.durationSlow    // 500ms - Page changes
AppleTheme.durationSpring  // 600ms - Spring effects
```

### 4. Backdrop Blur Performance
Limit blur usage for performance:
- Use on static/semi-static elements
- Avoid animating blur values
- Use ClipRRect to contain blur area

---

## 🎨 Design References

Based on:
- iOS Control Center (glassmorphism)
- Apple Wallet (card stacking)
- Apple Maps (HUD overlays)
- iOS App Icons (depth & shadows)
- Apple Music (card designs)

---

## 📱 Testing

Test on:
- iOS devices (native platform)
- Android devices (cross-platform)
- Different screen sizes
- Light and dark modes
- Various iOS versions

---

## 🐛 Troubleshooting

### Blur not working on Android
Ensure `ClipRRect` wraps `BackdropFilter`:
```dart
ClipRRect(
  borderRadius: borderRadius,
  child: BackdropFilter(
    filter: ImageFilter.blur(...),
    child: Container(...),
  ),
)
```

### Shadows not visible
Check background color contrast:
```dart
// Shadows show on dark backgrounds
Container(
  decoration: BoxDecoration(
    color: Colors.black,
    boxShadow: AppleTheme.cardShadows,
  ),
)
```

### Animation lag
Reduce complexity:
- Limit simultaneous animations
- Use `AnimatedBuilder` for efficiency
- Profile with DevTools

---

## 📄 License

Part of the Burnout app project.

---

## 🤝 Contributing

When adding components:
1. Follow Apple HIG guidelines
2. Add documentation comments
3. Include usage examples
4. Test on iOS and Android
5. Ensure accessibility

---

**Created for Burnout - The Gen Z Car Enthusiast App**
