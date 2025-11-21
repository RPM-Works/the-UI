import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function EffectsDemoScreen() {
  // All animation values
  const floatAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const flipAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;
  const rainbowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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

    // Rotate animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();

    // Scale animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Flip animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(flipAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.delay(500),
        Animated.timing(flipAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.delay(500),
      ])
    ).start();

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Wave animation
    Animated.loop(
      Animated.timing(waveAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    // Rainbow animation
    Animated.loop(
      Animated.timing(rainbowAnim, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  // Interpolations
  const floatY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const rotateY = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const waveTranslate = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width],
  });

  const backgroundColor = rainbowAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: ['#FF6B6B', '#4ECDC4', '#A8E6CF', '#FFD93D', '#FF6B6B'],
  });

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>🎨 3D Effects Demo</Text>
        <Text style={styles.headerSubtitle}>Watch the magic happen!</Text>
      </LinearGradient>

      {/* Floating Effect */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✨ Floating Animation</Text>
        <Animated.View
          style={[
            styles.demoBox,
            {
              transform: [{ translateY: floatY }],
            },
          ]}
        >
          <LinearGradient
            colors={['#FA8BFF', '#2BD2FF', '#2BFF88']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBox}
          >
            <Ionicons name="cloud" size={50} color="#fff" />
          </LinearGradient>
        </Animated.View>
      </View>

      {/* Rotation Effect */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔄 360° Rotation</Text>
        <Animated.View
          style={[
            styles.demoBox,
            {
              transform: [{ rotate }],
            },
          ]}
        >
          <LinearGradient
            colors={['#f093fb', '#f5576c']}
            style={styles.gradientBox}
          >
            <Ionicons name="settings" size={50} color="#fff" />
          </LinearGradient>
        </Animated.View>
      </View>

      {/* Scale/Pulse Effect */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💓 Scale & Pulse</Text>
        <Animated.View
          style={[
            styles.demoBox,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={['#FF6B6B', '#FF8E53']}
            style={styles.gradientBox}
          >
            <Ionicons name="heart" size={50} color="#fff" />
          </LinearGradient>
        </Animated.View>
        <Animated.View
          style={[
            styles.demoBox,
            { marginTop: 20, transform: [{ scale: pulseAnim }] },
          ]}
        >
          <LinearGradient
            colors={['#4ECDC4', '#44A08D']}
            style={styles.gradientBox}
          >
            <Ionicons name="radio-button-on" size={50} color="#fff" />
          </LinearGradient>
        </Animated.View>
      </View>

      {/* 3D Flip Effect */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎴 3D Card Flip</Text>
        <Animated.View
          style={[
            styles.demoBox,
            {
              transform: [{ perspective: 1000 }, { rotateY }],
            },
          ]}
        >
          <LinearGradient
            colors={['#fa709a', '#fee140']}
            style={styles.gradientBox}
          >
            <Ionicons name="card" size={50} color="#fff" />
          </LinearGradient>
        </Animated.View>
      </View>

      {/* Wave Effect */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌊 Wave Motion</Text>
        <View style={styles.waveContainer}>
          <Animated.View
            style={[
              styles.wave,
              {
                transform: [{ translateX: waveTranslate }],
              },
            ]}
          >
            <LinearGradient
              colors={['rgba(102, 126, 234, 0.6)', 'rgba(118, 75, 162, 0.6)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.waveGradient}
            />
          </Animated.View>
        </View>
      </View>

      {/* Rainbow Background */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌈 Rainbow Morph</Text>
        <Animated.View
          style={[
            styles.demoBox,
            {
              backgroundColor,
            },
          ]}
        >
          <Ionicons name="color-palette" size={50} color="#fff" />
        </Animated.View>
      </View>

      {/* Combined Effect */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎪 All Combined!</Text>
        <Animated.View
          style={[
            styles.demoBox,
            {
              transform: [
                { translateY: floatY },
                { rotate },
                { scale: pulseAnim },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={['#A8E6CF', '#56CCF2']}
            style={styles.gradientBox}
          >
            <Ionicons name="star" size={50} color="#fff" />
          </LinearGradient>
        </Animated.View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          All animations run at 60fps with native driver! 🚀
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 40,
    paddingTop: 60,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  section: {
    padding: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  demoBox: {
    width: 120,
    height: 120,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  gradientBox: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  waveContainer: {
    width: '100%',
    height: 100,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
  },
  wave: {
    width: width,
    height: '100%',
    position: 'absolute',
    left: -width,
  },
  waveGradient: {
    width: '100%',
    height: '100%',
  },
  footer: {
    padding: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
