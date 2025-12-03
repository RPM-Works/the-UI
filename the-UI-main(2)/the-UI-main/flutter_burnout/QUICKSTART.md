# Burnout Flutter App - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Flutter

If you don't have Flutter installed:

```bash
# macOS
brew install flutter

# Or download from: https://docs.flutter.dev/get-started/install
```

Verify installation:
```bash
flutter doctor
```

### Step 2: Navigate to Project

```bash
cd the-UI/flutter_burnout
```

### Step 3: Get Dependencies

```bash
flutter pub get
```

### Step 4: Run the App

**On iOS Simulator (macOS only):**
```bash
open -a Simulator
flutter run
```

**On Android Emulator:**
```bash
# Open Android Studio > AVD Manager > Start emulator
flutter run
```

**On Physical Device:**
```bash
# Connect your device via USB
# Enable USB debugging (Android) or trust computer (iOS)
flutter run
```

## 📱 What You'll See

The app opens to the **Home Feed** with:
- Personalized greeting ("Hi, Chris")
- Search bar
- News feed cards

### Bottom Navigation (5 Tabs)

1. **Routes** (Car icon) - Map and driving routes
2. **Home** (House icon) - Main feed (default)
3. **Add** (Plus icon) - Create new post
4. **News** (Article icon) - Automotive news
5. **Chat** (Bubble icon) - Messages

## 🎨 Design Highlights

- **Royal Blue (#4169E1)** - Primary accent color
- **Pure Black (#000000)** - Background
- **Glowing blue borders** - Card styling
- **Inter font** - Clean, modern typography

## 🏗️ Project Structure

```
lib/
├── main.dart              # App entry point
├── constants/             # Colors and theme
├── screens/              # 8 main screens
└── widgets/              # Reusable components
```

## 🛠️ Key Files

- **main.dart** - Navigation and app setup
- **app_colors.dart** - All color constants
- **app_theme.dart** - Theme configuration
- **bottom_nav_bar.dart** - Bottom navigation
- **home_screen.dart** - Home feed
- **events_screen.dart** - Events table

## 🔧 Hot Reload

While the app is running, make changes and press:
- **`r`** - Hot reload
- **`R`** - Hot restart
- **`q`** - Quit

## 📸 Testing on iOS Simulator

```bash
# List available simulators
xcrun simctl list devices

# Run on specific iPhone model
flutter run -d "iPhone 15 Pro"
```

## 📱 Testing on Android Emulator

```bash
# List available emulators
flutter emulators

# Launch specific emulator
flutter emulators --launch <emulator_id>

# Run app
flutter run
```

## 🐛 Troubleshooting

**Problem: "No devices found"**
```bash
flutter devices  # Check available devices
```

**Problem: "Package not found"**
```bash
flutter clean
flutter pub get
```

**Problem: "Build failed"**
```bash
flutter clean
flutter pub get
flutter run
```

## 📦 Dependencies

All dependencies are in `pubspec.yaml`:
- `google_fonts` - Typography
- `flutter_svg` - SVG support
- `cached_network_image` - Image loading

## 🎯 Next Steps

1. **Add your own data** - Replace placeholder content
2. **Customize colors** - Edit `app_colors.dart`
3. **Add features** - Implement TODOs in README.md
4. **Connect backend** - Add API integration
5. **Add authentication** - Implement user login

## 📚 Learn More

- [Flutter Documentation](https://docs.flutter.dev/)
- [Flutter Cookbook](https://docs.flutter.dev/cookbook)
- [Flutter Samples](https://flutter.github.io/samples/)

## 💡 Tips

- Use **hot reload** (`r`) to see changes instantly
- Check **Flutter DevTools** for debugging
- Use **const** constructors for better performance
- Follow **Material Design** guidelines

---

Happy coding! 🏎️💙
