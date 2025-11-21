# the-UI

A React Native mobile app with Expo for car enthusiast community management.

## Features

### 7 Main Pages
1. **Welcome/Login** - User authentication and onboarding
2. **Chats** - Group chats with multiple GC support and sub-chats
3. **Map** - Real-time location tracking for group members
4. **Groups** - Community management with FB integration, news, and events
5. **Settings** - Privacy controls and app configuration
6. **Comms While Driving** - Safe communication mode with voice commands
7. **Profile** - User profile with stats and digital cards

### Widgets & Features

#### Map & Tracking
- **Map Tracking Widget** - Real-time location tracking for GC members on map
- Member status indicators (driving/parked)
- Distance and location updates

#### Communication
- **Multiple GC Support** - Manage multiple group chats simultaneously
- **Sub Chats** - Create threaded conversations within main chats
- Quick messages for driving mode
- Group voice calls

#### Social & Events
- **FB Groups Integration** - Connect and manage Facebook groups
- **Blogs/News Widget** - Categorized articles and community content
- **Calendar Widget** - Google-style calendar with event management
- **SoCal Meets Widget** - Local car meets and events with RSVP
- **Tags System** - Role-based permissions (org/admin/cc)

#### Media & Controls
- **Music Control Widget** - Full playback controls for in-car use
- **Turbo Sound Opening** - Customizable sound effects on app launch
- Support for multiple sound profiles

#### Membership
- **Cards System (MVP)** - Digital membership cards with:
  - Join cards
  - Stats cards (meets attended, posts)
  - Mod/Admin role cards
  - Printable versions
  - Option to order physical metal cards

#### Privacy
- **Public/Private Settings** - Granular privacy controls
- Location sharing toggle
- Activity status visibility
- Message permissions

## Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your mobile device (iOS/Android)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd the-UI
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Scan the QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run in web browser

## Project Structure

```
the-UI/
├── App.js                      # Main app entry with navigation
├── src/
│   ├── screens/               # Main app screens
│   │   ├── WelcomeScreen.js
│   │   ├── ChatsScreen.js
│   │   ├── MapScreen.js
│   │   ├── GroupsScreen.js
│   │   ├── SettingsScreen.js
│   │   ├── CommsDrivingScreen.js
│   │   └── ProfileScreen.js
│   ├── widgets/               # Reusable widget components
│   │   ├── MapTrackingWidget.js
│   │   ├── MusicControlWidget.js
│   │   ├── SubChatWidget.js
│   │   ├── CardsWidget.js
│   │   ├── FBGroupsWidget.js
│   │   ├── BlogsNewsWidget.js
│   │   ├── CalendarWidget.js
│   │   ├── SoCalMeetsWidget.js
│   │   ├── TagsWidget.js
│   │   ├── PrivacySettingsWidget.js
│   │   └── TurboSoundWidget.js
│   ├── components/            # Shared components (to be added)
│   └── utils/                 # Utility functions (to be added)
├── package.json
└── app.json

```

## Technologies Used

- **React Native** - Cross-platform mobile framework
- **Expo** - Development and build platform
- **React Navigation** - Navigation library (Bottom Tabs + Stack)
- **React Native Maps** - Map integration
- **Expo Location** - GPS and location services
- **Expo Calendar** - Calendar integration
- **Expo AV** - Audio/video playback
- **AsyncStorage** - Local data persistence

## Permissions Required

The app requires the following permissions:
- **Location** - For map tracking and nearby events
- **Calendar** - For event management
- **Notifications** - For event reminders

## Next Steps / TODO

- [ ] Connect to backend API
- [ ] Implement real authentication
- [ ] Add push notifications
- [ ] Integrate actual music player
- [ ] Add image upload for profiles
- [ ] Implement real-time chat with WebSockets
- [ ] Add payment integration for physical cards
- [ ] Implement actual Facebook SDK integration
- [ ] Add offline mode support
- [ ] Implement data persistence with AsyncStorage

## Contributing

This is an MVP with mock data. All widgets are ready to be connected to backend APIs.

## License

[Add your license here]
