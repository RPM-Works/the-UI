# Implementation Notes - Burnout Flutter App

## Overview

This document provides technical details about the implementation based on the provided design screenshots.

## Design Analysis from Screenshots

### Screenshot 1: Events Page
- Top tabs: "For You" and "Events" (Events is active/bold)
- 4 circular group icons (BMW logo + 3 placeholders)
- Events table with columns: Day, Group, Description, Location, Cost, Attendee Limit
- Sample event: "2/31/26 | Pnw Oil Leak Club | Group meet and drive | 1234 ur moms | $5.00 | 25"
- Multiple empty rows in the table

### Screenshot 2: User Profile (@the_master_bender)
- Circular profile picture (car image)
- Username in blue
- 3 tabs: Posts, Sparks?, Auto-Bits
- Empty content area below tabs

### Screenshot 3: Car Profile Detail
- Profile section at top
- Username: @the_master_bender
- Car: "2003 Bmw M3 Six Speed Manual"
- "Note for mods put a link to a full mods list?"
- Modifications section with details
- Accounts section with Instagram handle
- Blue placeholder box
- News card at bottom with image and long description

### Screenshot 4: Loading/Blank State
- Mostly empty black screen (likely loading state)

### Screenshot 5: Home Feed
- Large profile circle at top
- "Hi, Chris" greeting in blue
- "Whens the next drive?" question text
- White search bar with gray placeholder
- News card with placeholder image and heading
- Same long description text
- Bottom navigation with 5 icons
- Editor notes about Map and Routes features

## Color Palette Extracted

```dart
Primary Blue: #4169E1 (Royal Blue)
Background: #000000 (Pure Black)
Card Background: #0A0A0A
Border Blue: #4169E1
Text White: #FFFFFF
Text Gray: #B0B0B0
Sky Blue (image placeholder): #87CEEB
```

## Typography

**Font Family**: Inter (Google Fonts)

**Sizes Used**:
- Display: 32px (Hi, Chris), 28px (Question text)
- Headlines: 24px (Page titles), 20px (Usernames), 18px (News headings)
- Body: 16px, 14px, 13px
- Small: 12px

**Weights**:
- Bold: Headings, active tabs, usernames
- Semi-bold: Section headers
- Normal: Body text
- Medium: Labels

## Component Specifications

### Bottom Navigation Bar
- **Height**: 70px
- **Icons**: 28px (standard), 36px (add button)
- **Color**: Blue when active, gray when inactive
- **Background**: Pure black with 1px top border

### Cards
- **Background**: #0A0A0A
- **Border**: 2.5px solid blue
- **Border Radius**: 12px
- **Padding**: 16px
- **Shadow**: Blue glow effect (blur: 15px, opacity: 0.5)
- **Margin**: 16px horizontal, 8px vertical

### Group Circles
- **Size**: 120px diameter
- **Border**: 3px solid blue
- **Background**: Card background or image
- **Icon size**: 48px

### Search Bar
- **Background**: White
- **Border Radius**: 24px
- **Height**: ~50px
- **Padding**: 20px horizontal, 16px vertical
- **Icon**: Gray search icon on left

### Events Table
- **Header background**: Blue
- **Cell borders**: 1px blue
- **Row height**: ~50px
- **Text color**: White on blue (header), white on black (data)

## Screen Dimensions Considered

Designed for mobile portrait:
- Common sizes: iPhone 15 Pro (393x852), iPhone 15 Pro Max (430x932)
- Android: Various (360x800 to 428x926)
- Tablet support: Can scale up with max-width container

## Animations to Consider (Future)

1. **Card tap**: Scale animation (0.98x)
2. **Navigation**: Smooth tab transitions
3. **Page transitions**: Slide or fade
4. **Pull-to-refresh**: Standard iOS/Android pattern
5. **Image loading**: Fade-in when loaded

## Accessibility Features Implemented

1. **Semantic labels**: All buttons have aria-labels
2. **Color contrast**: White text on black (21:1 ratio)
3. **Touch targets**: All buttons >44px for easy tapping
4. **Text scaling**: Uses theme text styles that scale

## Performance Optimizations

1. **Const constructors**: Used throughout
2. **Lazy loading**: ScrollView widgets
3. **Image caching**: cached_network_image package
4. **Widget reuse**: Modular component structure

## Responsive Design Strategy

```dart
// Desktop/Tablet (future enhancement)
if (width > 768) {
  - Max content width: 600px
  - Center content
  - Larger text sizes
}

// Mobile
- Full width
- Bottom navigation
- Scrollable content
```

## Navigation Flow

```
App Start
    ↓
MainNavigator (Home screen by default)
    ↓
Bottom Nav (5 tabs)
├── Routes (Index 0)
├── Home (Index 1) ← Default
├── Add (Index 2)
├── News (Index 3)
└── Chat (Index 4)

Named Routes:
- /home → MainNavigator
- /profile → ProfileScreen
- /car-profile → CarProfileScreen
- /events → EventsScreen
```

## Data Flow (When Backend Added)

```
UI Layer (Screens/Widgets)
    ↓
State Management (Provider/Riverpod)
    ↓
Repository Layer (API calls)
    ↓
Models (Data classes)
    ↓
API/Backend
```

## Testing Strategy

1. **Unit tests**: Models, utilities
2. **Widget tests**: Individual components
3. **Integration tests**: Full user flows
4. **Golden tests**: UI regression testing

## Known Limitations / TODOs

1. No real data - all placeholder content
2. No authentication
3. No backend integration
4. Map screen is placeholder
5. Add post functionality not implemented
6. Chat is placeholder
7. No image upload
8. No real-time features
9. No offline support
10. No state persistence

## Future Enhancements

### Phase 1: Core Features
- Authentication (Firebase/Supabase)
- Backend API integration
- Image upload (Firebase Storage/Cloudinary)
- Real user profiles

### Phase 2: Social Features
- Real-time chat (WebSocket/Firebase)
- Post creation and editing
- Like/comment system
- Follow/unfollow users

### Phase 3: Advanced Features
- Map integration (Google Maps)
- Location tracking
- Event RSVP
- Push notifications
- Search functionality

### Phase 4: Polish
- Animations and transitions
- Dark/light theme toggle
- Settings screen
- Onboarding flow
- Analytics

## Development Timeline Estimate

- **MVP (Current)**: ✅ Complete
- **Phase 1**: 2-3 weeks
- **Phase 2**: 3-4 weeks
- **Phase 3**: 4-5 weeks
- **Phase 4**: 2-3 weeks

**Total to Production**: 11-15 weeks with 1 developer

## Code Quality

- **Analysis**: Using flutter_lints package
- **Formatting**: Run `flutter format .`
- **Linting**: Run `flutter analyze`
- **Testing**: Run `flutter test`

## Deployment

### Android
```bash
flutter build apk --release
flutter build appbundle --release  # For Play Store
```

### iOS
```bash
flutter build ios --release
# Then archive in Xcode for App Store
```

## Questions Answered

**Q: Why Flutter over React Native?**
A: Better performance, single codebase, strong typing with Dart

**Q: Why not use a UI library?**
A: Custom components match exact design specs better

**Q: State management choice?**
A: Start simple (StatefulWidget), migrate to Provider/Riverpod when needed

**Q: Backend recommendation?**
A: Firebase (quick start) or Supabase (more control) or custom Node.js/Go API

---

**Implementation Date**: December 2025
**Flutter Version**: 3.0.0+
**Dart Version**: 3.0.0+
