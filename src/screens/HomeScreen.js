import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeScreen({ navigation }) {
  const user = {
    username: '@the_master bender',
    carModel: '2003 Bmw M3 Six Speed Manual',
    modifications: 'Custom widebody, air suspension, independent throttle bodies, custom wheels, and of course boost.',
    carImage: 'https://via.placeholder.com/150x120/4169E1/FFFFFF?text=BMW+M3',
  };

  const newsItem = {
    heading: 'News: Heading',
    description: 'Stay up to date with the latest car news and updates from the TG TV team. Check out our Car News page for more stories about builds, meets, and the latest in the automotive world.',
    image: 'https://via.placeholder.com/100x100/87CEEB/FFFFFF?text=📰',
  };

  const navigationItems = [
    { id: 'car', icon: 'car-sport-outline', label: 'Garage' },
    { id: 'home', icon: 'home-outline', label: 'Home' },
    { id: 'add', icon: 'add-circle-outline', label: 'Post' },
    { id: 'news', icon: 'newspaper-outline', label: 'News' },
    { id: 'chat', icon: 'chatbubbles-outline', label: 'Chat' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* User Profile Card */}
        <View style={styles.card}>
          <View style={styles.profileSection}>
            <Image
              source={{ uri: user.carImage }}
              style={styles.carImage}
              resizeMode="cover"
            />
            <View style={styles.profileInfo}>
              <Text style={styles.username}>{user.username}</Text>
              <Text style={styles.carModel}>{user.carModel}</Text>
            </View>
          </View>

          <View style={styles.modificationsSection}>
            <Text style={styles.modificationsHeader}>Modifications</Text>
            <Text style={styles.modificationsText}>{user.modifications}</Text>
          </View>

          <View style={styles.cardDivider} />
        </View>

        {/* News Card */}
        <View style={styles.card}>
          <View style={styles.newsSection}>
            <Image
              source={{ uri: newsItem.image }}
              style={styles.newsImage}
              resizeMode="cover"
            />
            <View style={styles.newsContent}>
              <Text style={styles.newsHeading}>{newsItem.heading}</Text>
            </View>
          </View>
          <Text style={styles.newsDescription}>{newsItem.description}</Text>
          <View style={styles.cardDivider} />
        </View>

        {/* Spacer for bottom nav */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {navigationItems.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={styles.navItem}
            onPress={() => {
              if (item.id === 'chat') navigation.navigate('Chats');
              if (item.id === 'home') navigation.navigate('Main');
            }}
          >
            <Icon
              name={item.icon}
              size={item.id === 'add' ? 36 : 28}
              color="#4169E1"
              style={item.id === 'add' && styles.addIcon}
            />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#0a0a0a',
    borderWidth: 2.5,
    borderColor: '#4169E1',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#4169E1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  profileSection: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  carImage: {
    width: 150,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  username: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4169E1',
    marginBottom: 8,
  },
  carModel: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
  },
  modificationsSection: {
    marginBottom: 12,
  },
  modificationsHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4169E1',
    marginBottom: 8,
  },
  modificationsText: {
    fontSize: 13,
    color: '#FFFFFF',
    lineHeight: 20,
  },
  cardDivider: {
    height: 2,
    backgroundColor: '#4169E1',
    marginTop: 12,
    shadowColor: '#4169E1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
  newsSection: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  newsImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#87CEEB',
  },
  newsContent: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  newsHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4169E1',
  },
  newsDescription: {
    fontSize: 13,
    color: '#4169E1',
    lineHeight: 20,
    marginBottom: 12,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#000000',
    borderTopWidth: 1,
    borderTopColor: '#1a1a1a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  addIcon: {
    transform: [{ scale: 1.2 }],
  },
});
