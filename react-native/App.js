import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppTheme from './src/theme/AppTheme';
import EventsScreen from './src/screens/EventsScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const PlaceholderScreen = ({ title }) => {
  const isDark = useColorScheme() === 'dark';
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDark ? AppTheme.colors.darkBackground : AppTheme.colors.lightBackground,
    }}>
      <Icon name="construction" size={80} color={`${AppTheme.colors.primaryBlue}80`} />
      <Text style={{
        fontSize: 28,
        fontWeight: '700',
        color: AppTheme.colors.primaryBlue,
        marginTop: 24,
      }}>
        {title}
      </Text>
      <Text style={{
        fontSize: 16,
        color: isDark ? '#FFFFFF99' : '#00000099',
        marginTop: 12,
      }}>
        Coming Soon
      </Text>
    </View>
  );
};

function App() {
  const isDark = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#000' : '#FFF' }}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              position: 'absolute',
              bottom: 20,
              left: 20,
              right: 20,
              height: 90,
              borderRadius: 30,
              backgroundColor: isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.2)',
              borderTopWidth: 0,
              ...AppTheme.shadows.elevation,
            },
            tabBarActiveTintColor: AppTheme.colors.primaryBlue,
            tabBarInactiveTintColor: isDark ? '#FFFFFF99' : '#00000099',
            tabBarLabelStyle: {
              fontSize: 10,
              fontWeight: '600',
              marginTop: 4,
            },
            tabBarIconStyle: {
              marginTop: 12,
            },
          }}>
          <Tab.Screen
            name="Routes"
            component={() => <PlaceholderScreen title="Routes" />}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="route" size={22} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="home" size={22} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Posts"
            component={EventsScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="wrench" size={22} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="News"
            component={() => <PlaceholderScreen title="News" />}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="newspaper" size={22} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Chat"
            component={() => <PlaceholderScreen title="Chat" />}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="comment" size={22} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
