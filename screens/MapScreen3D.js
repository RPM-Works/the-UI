import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';
import MapTrackingWidget from '../widgets/MapTrackingWidget';
import MusicControlWidget from '../widgets/MusicControlWidget';

export default function MapScreen3D() {
  const [location, setLocation] = useState(null);
  const [members, setMembers] = useState([
    { id: '1', name: 'John', latitude: 33.7175, longitude: -117.8311, status: 'driving' },
    { id: '2', name: 'Sarah', latitude: 33.7275, longitude: -117.8411, status: 'parked' },
    { id: '3', name: 'Mike', latitude: 33.7075, longitude: -117.8211, status: 'driving' },
  ]);
  const [showMusicControl, setShowMusicControl] = useState(false);

  // Animation values
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const musicButtonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();

    // Entrance animation for music button
    Animated.spring(musicButtonAnim, {
      toValue: 1,
      tension: 20,
      friction: 7,
      delay: 500,
      useNativeDriver: true,
    }).start();

    // Pulse animation for markers
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Rotation for music button
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    // Float animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const getMarkerColor = (status) => {
    return status === 'driving' ? '#4CAF50' : '#FF9800';
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const floatY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const AnimatedMarkerWrapper = ({ member, index }) => {
    const markerScale = useRef(new Animated.Value(0)).current;
    const markerPulse = useRef(new Animated.Value(1)).current;

    useEffect(() => {
      // Entrance animation
      Animated.spring(markerScale, {
        toValue: 1,
        delay: index * 200,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }).start();

      // Continuous pulse
      Animated.loop(
        Animated.sequence([
          Animated.timing(markerPulse, {
            toValue: 1.2,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(markerPulse, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, []);

    return (
      <Marker
        coordinate={{
          latitude: member.latitude,
          longitude: member.longitude,
        }}
        title={member.name}
        description={`Status: ${member.status}`}
        pinColor={getMarkerColor(member.status)}
      />
    );
  };

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={location}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {members.map((member, index) => (
            <AnimatedMarkerWrapper key={member.id} member={member} index={index} />
          ))}
        </MapView>
      )}

      {/* Floating overlay with glassmorphism */}
      <Animated.View
        style={[
          styles.overlayContainer,
          {
            transform: [{ translateY: floatY }],
          },
        ]}
      >
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.6)']}
          style={styles.overlay}
        >
          <View style={styles.statsRow}>
            <Animated.View
              style={[
                styles.statBubble,
                {
                  transform: [{ scale: pulseAnim }],
                },
              ]}
            >
              <LinearGradient
                colors={['#4CAF50', '#8BC34A']}
                style={styles.statBubbleGradient}
              >
                <Ionicons name="car-sport" size={20} color="#fff" />
                <Text style={styles.statText}>2</Text>
              </LinearGradient>
            </Animated.View>

            <Animated.View
              style={[
                styles.statBubble,
                {
                  transform: [{ scale: pulseAnim }],
                },
              ]}
            >
              <LinearGradient
                colors={['#FF9800', '#FF5722']}
                style={styles.statBubbleGradient}
              >
                <Ionicons name="location" size={20} color="#fff" />
                <Text style={styles.statText}>1</Text>
              </LinearGradient>
            </Animated.View>

            <Animated.View
              style={[
                styles.statBubble,
                {
                  transform: [{ scale: pulseAnim }],
                },
              ]}
            >
              <LinearGradient
                colors={['#2196F3', '#03A9F4']}
                style={styles.statBubbleGradient}
              >
                <Ionicons name="people" size={20} color="#fff" />
                <Text style={styles.statText}>3</Text>
              </LinearGradient>
            </Animated.View>
          </View>
        </LinearGradient>
      </Animated.View>

      <MapTrackingWidget members={members} />

      {/* Animated music button */}
      <Animated.View
        style={[
          styles.musicButtonContainer,
          {
            transform: [
              { scale: musicButtonAnim },
              { rotate },
            ],
            opacity: musicButtonAnim,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => setShowMusicControl(!showMusicControl)}
        >
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.musicButton}
          >
            <Ionicons name="musical-notes" size={28} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      {showMusicControl && (
        <MusicControlWidget onClose={() => setShowMusicControl(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  overlayContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
  },
  overlay: {
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statBubble: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  statBubbleGradient: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  musicButtonContainer: {
    position: 'absolute',
    bottom: 100,
    right: 20,
  },
  musicButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
});
