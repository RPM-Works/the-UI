# Burnout - React Native

Apple-style 3D UI for car enthusiast social app built with React Native.

## Features

- **Instagram-Style Post Creation** - Full modal with photo upload, captions, location, categories
- **Events & Posts Feed** - Dual-tab interface with events calendar and social feed
- **Profile Card Flip Animation** - 3D card flip revealing QR code, achievements, and social links
- **Glassmorphism UI** - Beautiful frosted glass effects throughout the app
- **Dark Mode Support** - Automatic light/dark theme switching
- **Smooth Animations** - 60fps animations with React Native Reanimated

## Installation

```bash
# Install dependencies
npm install

# iOS specific
cd ios && pod install && cd ..

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## Project Structure

```
react-native/
├── App.js                          # Main app with navigation
├── src/
│   ├── theme/
│   │   └── AppTheme.js            # Complete theme configuration
│   ├── components/
│   │   ├── PrimaryButton.js       # Gradient button with glow
│   │   ├── GlassButton.js         # Glass button with blur
│   │   ├── ProfileCard.js         # Flippable profile card
│   │   └── CreatePostModal.js     # Instagram post creator
│   └── screens/
│       ├── HomeScreen.js          # Home feed
│       ├── ProfileScreen.js       # Profile with cards
│       └── EventsScreen.js        # Events & posts tabs
├── package.json
└── README.md
```

## Components

### ProfileCard

3D flippable card with front/back sides:

```jsx
<ProfileCard
  username="TheMasterBender"
  carModel="2023 Subaru WRX STI"
  mods={['Stage 3 Turbo', 'Coilover Suspension']}
  stats={{ Posts: 156, Meets: 42, Miles: 12500 }}
  onTap={() => console.log('Flipped!')}
/>
```

**Features:**
- Tap to flip 180 degrees
- Front: Car image, stats, mods, Instagram link
- Back: QR code, achievements badges, social links
- Smooth 800ms flip animation

### CreatePostModal

Instagram-style post creation:

```jsx
<CreatePostModal
  visible={modalVisible}
  onClose={() => setModalVisible(false)}
  onPost={(postData) => console.log(postData)}
/>
```

**Features:**
- Photo upload with preview
- Caption and location fields
- Category selection
- Privacy toggle (Public/Private)
- Share and draft buttons

### PrimaryButton

Apple blue gradient button:

```jsx
<PrimaryButton
  text="Share Post"
  icon="share"
  onPress={() => {}}
  height={54}
/>
```

### GlassButton

Glassmorphic secondary button:

```jsx
<GlassButton
  text="Cancel"
  icon="times"
  onPress={() => {}}
  width="100%"
/>
```

## Screens

### HomeScreen

- Search bar
- Quick action buttons (Routes, Walkie)
- Posts feed with likes/comments
- Bottom tab navigation

### ProfileScreen

- Multiple profile cards (swipeable)
- Tap card to flip and see QR/achievements
- Share profile and view stats buttons

### EventsScreen

- **Events Tab**: Event cards with location, date, attendance
- **Posts Tab**: Instagram-style posts with captions
- Floating action button to create new posts
- Full post creation modal

## Theme

All colors and styles in `src/theme/AppTheme.js`:

```js
AppTheme.colors.primaryBlue      // #007AFF
AppTheme.colors.darkBackground   // #000000
AppTheme.colors.lightBackground  // #F5F5F5
AppTheme.gradients.primary       // ['#007AFF', '#0051D5']
AppTheme.shadows.card            // Card shadow config
AppTheme.animation.flip          // 800ms
```

## Navigation

Bottom tab navigator with 5 tabs:
- Routes (placeholder)
- Home
- Posts (Events & Posts)
- News (placeholder)
- Chat (placeholder)

Glassmorphic floating tab bar with blur effects.

## Dependencies

- `react-native` - Core framework
- `react-native-reanimated` - Smooth animations
- `react-native-gesture-handler` - Touch gestures
- `react-native-vector-icons` - FontAwesome icons
- `@react-navigation/native` - Navigation
- `@react-navigation/bottom-tabs` - Tab navigator
- `react-native-blur` - Blur effects
- `react-native-linear-gradient` - Gradients
- `react-native-svg` - SVG support

## Development

```bash
# Start Metro bundler
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Clear cache
npm start -- --reset-cache
```

## Notes

- Minimum iOS version: 13.0
- Minimum Android API level: 21 (Lollipop)
- Uses React Native 0.72.0
- Supports iPhone X+ safe areas
- Optimized for 60fps animations

## License

Demo/Example project - use freely.
