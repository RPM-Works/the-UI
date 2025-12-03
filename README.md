# 🍎 Apple-Style 3D UI for Burnout App

Complete Apple-inspired UI component library for the Burnout car enthusiast social media app, featuring glassmorphism, multi-layer shadows, smooth animations, and depth effects.

## 📁 Project Structure

```
the-UI/
├── flutter_burnout/          # Flutter app with Apple UI components
│   ├── lib/
│   │   ├── constants/
│   │   │   └── apple_theme.dart           # Complete design system
│   │   ├── widgets/
│   │   │   ├── apple_bottom_nav.dart      # Floating dock navigation
│   │   │   ├── apple_buttons.dart         # Button components
│   │   │   ├── apple_profile_card.dart    # Wallet-style cards
│   │   │   ├── apple_content_card.dart    # Content cards
│   │   │   ├── apple_glass_widgets.dart   # Glass components
│   │   │   ├── apple_huds.dart            # HUD elements
│   │   │   └── apple_modals.dart          # Modals & dialogs
│   │   └── screens/
│   │       └── apple_demo_screen.dart     # Complete demo
│   ├── APPLE_UI_DOCUMENTATION.md          # Full API reference
│   └── APPLE_UI_QUICKSTART.md             # Quick start guide
│
└── apple-ui-test.html        # HTML demo (no Flutter needed)
```

## 🚀 Quick Start

### Option 1: Flutter App (Production)

```bash
cd flutter_burnout
flutter pub get
flutter run
```

### Option 2: HTML Demo (Quick Preview)

Simply open `apple-ui-test.html` in any browser:

```bash
open apple-ui-test.html
# or
python -m http.server 8000
# Then: http://localhost:8000/apple-ui-test.html
```

## 🎨 Components

### Navigation
- **AppleBottomNav** - Floating glassmorphic bottom navigation bar

### Buttons
- **ApplePrimaryButton** - Gradient blue button with glow
- **AppleSecondaryButton** - Glass background button
- **AppleIconButton** - Circular glass icon button
- **ApplePillButton** - Small pill buttons for tags/filters

### Cards
- **AppleProfileCard** - Apple Wallet-style profile cards with 3D rotation
- **AppleContentCard** - Full-featured content cards for posts/news
- **AppleCompactCard** - Compact list item cards

### Glass Components
- **AppleGlassContainer** - Reusable glassmorphic container
- **AppleSearchBar** - Search field with glass effect
- **AppleGlassSection** - Section container with header
- **AppleStatDisplay** - Statistics display with icons
- **AppleInfoBadge** - Small info badges

### HUDs
- **AppleRoutesHUD** - Floating route information HUD
- **AppleCommunicationHUD** - Walkie-talkie push-to-talk interface

### Modals
- **showAppleBottomSheet()** - Bottom sheet modal
- **showAppleDialog()** - Alert dialog
- **showAppleLoading()** - Loading indicator

## ✨ Features

- **Glassmorphism** - Backdrop blur effects with semi-transparent backgrounds
- **Multi-Layer Shadows** - Depth and elevation using layered shadows
- **Smooth Animations** - 60fps spring physics and elastic transitions
- **Haptic Feedback** - Native-feeling interactions
- **Light/Dark Mode** - Full theme support
- **Accessibility** - 44pt minimum touch targets, high contrast
- **Cross-Platform** - iOS and Android support

## 📖 Documentation

See [`flutter_burnout/APPLE_UI_DOCUMENTATION.md`](flutter_burnout/APPLE_UI_DOCUMENTATION.md) for:
- Complete API reference
- Usage examples
- Customization guides
- Design guidelines
- Best practices
- Troubleshooting

## 🎯 Design References

Components inspired by:
- iOS Control Center (glassmorphism)
- Apple Wallet (card stacking & 3D effects)
- Apple Maps (HUD overlays)
- iOS App Icons (depth and shadows)
- Apple Music (card designs)

## 💻 Requirements

### Flutter
- Flutter SDK >=3.0.0
- Dart >=3.0.0

### Dependencies
```yaml
glassmorphism: ^3.0.0
flutter_animate: ^4.5.0
font_awesome_flutter: ^10.6.0
shimmer: ^3.0.0
```

## 🎨 Usage Example

```dart
import 'package:burnout/constants/apple_theme.dart';
import 'package:burnout/widgets/apple_bottom_nav.dart';
import 'package:burnout/widgets/apple_buttons.dart';

Scaffold(
  body: Column(
    children: [
      AppleSearchBar(placeholder: 'Search...'),
      ApplePrimaryButton(
        text: 'Get Started',
        icon: Icons.arrow_forward,
        onPressed: () {},
      ),
    ],
  ),
  bottomNavigationBar: AppleBottomNav(
    currentIndex: 0,
    onTap: (index) {},
  ),
)
```

## 🌐 Browser Demo

The HTML demo (`apple-ui-test.html`) showcases all components with interactive examples:

- ✅ No installation required
- ✅ Works in any modern browser
- ✅ Touch-friendly
- ✅ Responsive design
- ✅ Perfect for quick previews

## 📱 Testing

1. **Flutter Demo:**
   ```bash
   cd flutter_burnout
   flutter run
   ```

2. **HTML Demo:**
   - Open `apple-ui-test.html` in browser
   - Test interactions (click, hover, type)
   - Use mobile emulation in dev tools

## 🛠️ Development

### Flutter Project Structure
```
flutter_burnout/lib/
├── constants/        # Theme & design tokens
├── widgets/          # Reusable UI components
└── screens/          # Demo & example screens
```

### Key Design Tokens (AppleTheme)
```dart
// Colors
AppleTheme.appleBlue        // #007AFF
AppleTheme.glassLight       // rgba(255,255,255,0.15)

// Shadows
AppleTheme.cardShadows      // Multi-layer depth
AppleTheme.floatingShadows  // For floating elements

// Blur
AppleTheme.standardBlur     // sigmaX: 10, sigmaY: 10

// Animations
AppleTheme.durationFast     // 150ms
AppleTheme.spring           // Spring curve
```

## 🎯 Priority Components

Implemented in order:
1. ✅ Bottom Navigation Bar
2. ✅ Buttons (Primary, Secondary, Icon, Pill)
3. ✅ Profile Cards (Apple Wallet style)
4. ✅ Content Cards
5. ✅ Glass Containers & Search Bar
6. ✅ Routes HUD
7. ✅ Communication HUD
8. ✅ Modals & Dialogs

## 📄 License

Part of the Burnout car enthusiast social media app project.

---

**Built with Flutter & Love 🚗💨**

For detailed documentation, see [APPLE_UI_DOCUMENTATION.md](flutter_burnout/APPLE_UI_DOCUMENTATION.md)
