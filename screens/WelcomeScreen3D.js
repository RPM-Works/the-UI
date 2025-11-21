import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen3D({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Animation values
  const floatAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const backgroundAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      }),
    ]).start();

    // Continuous floating animation
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

    // Continuous rotation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      })
    ).start();

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
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
  }, []);

  const handleLogin = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.replace('Main');
    });
  };

  const floatTranslate = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const backgroundColor = backgroundAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(0, 122, 255)', 'rgb(88, 86, 214)'],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      {/* Animated background circles */}
      <Animated.View
        style={[
          styles.circle,
          styles.circle1,
          {
            transform: [{ rotate }, { scale: 1.5 }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.circle,
          styles.circle2,
          {
            transform: [
              { rotate: rotate },
              { translateX: floatTranslate },
              { scale: 1.2 },
            ],
          },
        ]}
      />

      <Animated.View
        style={[
          styles.formContainer,
          {
            transform: [
              { scale: scaleAnim },
              { translateY: floatTranslate },
              {
                perspective: 1000,
              },
            ],
          },
        ]}
      >
        <View style={styles.card}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)']}
            style={styles.cardGradient}
          >
            <Animated.View style={styles.header}>
              <Animated.Text
                style={[
                  styles.title,
                  {
                    transform: [{ scale: pulseAnim }],
                  },
                ]}
              >
                Welcome to GC
              </Animated.Text>
              <Text style={styles.subtitle}>Connect with your group</Text>
            </Animated.View>

            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity onPress={handleLogin}>
                <LinearGradient
                  colors={['#007AFF', '#5856D6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Login</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.linkButton}>
                <Text style={styles.linkText}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 1000,
  },
  circle1: {
    width: 400,
    height: 400,
    top: -200,
    right: -100,
  },
  circle2: {
    width: 300,
    height: 300,
    bottom: -150,
    left: -75,
  },
  formContainer: {
    width: '100%',
  },
  card: {
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 20,
  },
  cardGradient: {
    padding: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 122, 255, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    padding: 18,
    fontSize: 16,
    color: '#000',
  },
  button: {
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
