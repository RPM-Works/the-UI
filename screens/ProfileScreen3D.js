import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import CardsWidget from '../widgets/CardsWidget';

export default function ProfileScreen3D({ navigation }) {
  const [user] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    memberSince: 'January 2024',
    groups: 12,
    meets: 8,
    posts: 45,
  });

  const profileAnim = useRef(new Animated.Value(0)).current;
  const statsAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(profileAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(statsAnim, {
        toValue: 1,
        delay: 200,
        tension: 30,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous rotation for avatar
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      })
    ).start();

    // Pulse animation for stats
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const AnimatedMenuItem = ({ icon, text, onPress, delay = 0 }) => {
    const itemAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
      Animated.spring(itemAnim, {
        toValue: 1,
        delay,
        tension: 30,
        friction: 7,
        useNativeDriver: true,
      }).start();
    }, []);

    const handlePressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    };

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
      >
        <Animated.View
          style={[
            styles.menuItem,
            {
              opacity: itemAnim,
              transform: [
                { scale: scaleAnim },
                {
                  translateX: itemAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={['#f093fb', '#f5576c']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.menuGradient}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={icon} size={24} color="#fff" />
            </View>
            <Text style={styles.menuText}>{text}</Text>
            <Ionicons name="chevron-forward" size={24} color="rgba(255,255,255,0.7)" />
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const profileScale = profileAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#fa709a', '#fee140']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <Animated.View
          style={[
            styles.header,
            {
              transform: [{ scale: profileScale }],
              opacity: profileAnim,
            },
          ]}
        >
          <View style={styles.profileImageContainer}>
            <Animated.View
              style={[
                styles.profileRing,
                {
                  transform: [{ rotate }],
                },
              ]}
            />
            <Animated.View
              style={[
                styles.profileImage,
                {
                  transform: [{ scale: pulseAnim }],
                },
              ]}
            >
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.profileImageGradient}
              >
                <Ionicons name="person" size={50} color="#fff" />
              </LinearGradient>
            </Animated.View>
            <TouchableOpacity style={styles.editButton}>
              <LinearGradient
                colors={['#f093fb', '#f5576c']}
                style={styles.editButtonGradient}
              >
                <Ionicons name="camera" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.memberSince}>Member since {user.memberSince}</Text>
        </Animated.View>
      </LinearGradient>

      <Animated.View
        style={[
          styles.stats,
          {
            transform: [
              { scale: statsAnim },
              {
                translateY: statsAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
            opacity: statsAnim,
          },
        ]}
      >
        <LinearGradient
          colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.7)']}
          style={styles.statsGradient}
        >
          <Animated.View
            style={[
              styles.statItem,
              { transform: [{ scale: pulseAnim }] },
            ]}
          >
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.statCircle}
            >
              <Text style={styles.statValue}>{user.groups}</Text>
            </LinearGradient>
            <Text style={styles.statLabel}>Groups</Text>
          </Animated.View>
          
          <View style={styles.statDivider} />
          
          <Animated.View
            style={[
              styles.statItem,
              { transform: [{ scale: pulseAnim }] },
            ]}
          >
            <LinearGradient
              colors={['#fa709a', '#fee140']}
              style={styles.statCircle}
            >
              <Text style={styles.statValue}>{user.meets}</Text>
            </LinearGradient>
            <Text style={styles.statLabel}>Meets</Text>
          </Animated.View>
          
          <View style={styles.statDivider} />
          
          <Animated.View
            style={[
              styles.statItem,
              { transform: [{ scale: pulseAnim }] },
            ]}
          >
            <LinearGradient
              colors={['#f093fb', '#f5576c']}
              style={styles.statCircle}
            >
              <Text style={styles.statValue}>{user.posts}</Text>
            </LinearGradient>
            <Text style={styles.statLabel}>Posts</Text>
          </Animated.View>
        </LinearGradient>
      </Animated.View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Cards</Text>
        <CardsWidget showAll={true} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Activity</Text>
        <AnimatedMenuItem icon="calendar" text="My Events" delay={400} />
        <AnimatedMenuItem icon="images" text="My Photos" delay={500} />
        <AnimatedMenuItem icon="car-sport" text="My Rides" delay={600} />
      </View>

      <View style={styles.section}>
        <AnimatedMenuItem
          icon="settings"
          text="Settings"
          delay={700}
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 50,
  },
  headerGradient: {
    paddingVertical: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  header: {
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profileRing: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    top: -20,
    left: -20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  profileImageGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    position: 'absolute',
    right: -5,
    bottom: -5,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#fff',
  },
  editButtonGradient: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  email: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 5,
  },
  memberSince: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  stats: {
    marginHorizontal: 20,
    marginTop: -30,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  statsGradient: {
    flexDirection: 'row',
    paddingVertical: 25,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  section: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  menuItem: {
    marginBottom: 15,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  menuGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});
