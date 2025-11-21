# the-UI

A React Native mobile app for car enthusiast community management.

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
- **End-to-End Encryption** - Secure messaging using Olm/Megolm cryptographic ratchets
  - 1-to-1 encryption with Olm sessions
  - Group encryption with Megolm
  - Visual encryption indicators
  - Secure key storage with AsyncStorage
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
- Node.js (v18 or higher)
- npm or yarn
- React Native CLI: `npm install -g react-native-cli`
- For iOS: Xcode, CocoaPods
- For Android: Android Studio, Android SDK

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

3. For iOS (macOS only):
```bash
cd ios && pod install && cd ..
```

4. Run the app:

**Android:**
```bash
npm run android
```

**iOS:**
```bash
npm run ios
```

## Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm test` - Run tests
- `npm run lint` - Run linter

## Project Structure

```
the-UI/
├── index.js                    # App entry point
├── App.js                      # Main app with navigation
├── metro.config.js             # Metro bundler configuration
├── babel.config.js             # Babel configuration
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
│   └── utils/                 # Utility functions
│       └── EncryptionService.js  # E2E encryption service (Olm/Megolm)
├── android/                   # Android native files
├── ios/                       # iOS native files
├── package.json
└── app.json

```

## Technologies Used

- **React Native** - Cross-platform mobile framework
- **React Navigation** - Navigation library (Bottom Tabs + Stack)
- **React Native Maps** - Map integration
- **React Native Geolocation Service** - GPS and location services
- **React Native Vector Icons** - Icon library (Ionicons)
- **React Native Permissions** - Permission handling
- **AsyncStorage** - Local data persistence
- **React Native Community Slider** - Slider component
- **React Native Olm** - End-to-end encryption (Olm & Megolm)

## Permissions Required

The app requires the following permissions:
- **Location** - For map tracking and nearby events
- **Calendar** - For event management
- **Notifications** - For event reminders

## Security & Encryption

This app implements **end-to-end encryption** for all chat messages using:

- **Olm** - For 1-to-1 encrypted messaging (Double Ratchet Algorithm)
- **Megolm** - For efficient group chat encryption
- **Key Management** - Secure storage using AsyncStorage with pickle serialization
- **Perfect Forward Secrecy** - One-time keys ensure past messages can't be decrypted if keys are compromised

### How Encryption Works

1. **Initialization** - On first use, the app creates an Olm account with identity and one-time keys
2. **Session Creation** - When messaging a user, an Olm session is established
3. **Group Chats** - Megolm outbound sessions are created for group encryption
4. **Message Encryption** - All messages are encrypted before sending
5. **Visual Indicators** - Lock icons show encrypted messages and chats

### Using Encryption

Encryption is automatically enabled for all chats. You'll see:
- 🔒 Lock icon next to encrypted messages
- 🛡️ Shield badge in chat headers for E2E encrypted chats
- "E2E Encrypted" text in member count

## Next Steps / TODO

- [ ] Generate Android and iOS native projects (run `npx react-native init` if needed)
- [ ] Configure react-native-vector-icons for iOS and Android
- [ ] Configure react-native-olm native dependencies
- [ ] Set up location permissions in AndroidManifest.xml and Info.plist
- [ ] Connect to backend API with WebSocket support
- [ ] Implement key exchange protocol with server
- [ ] Implement real authentication
- [ ] Add push notifications
- [ ] Integrate actual music player
- [ ] Add image upload for profiles
- [ ] Implement real-time chat with WebSockets
- [ ] Add payment integration for physical cards
- [ ] Implement actual Facebook SDK integration
- [ ] Add offline mode support
- [ ] Implement message backup and restore

## Contributing

This is an MVP with mock data. All widgets are ready to be connected to backend APIs.

## License

[Add your license here]
