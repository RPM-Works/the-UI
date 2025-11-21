import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MusicControlWidget from '../widgets/MusicControlWidget';

export default function CommsDrivingScreen3D() {
  const [isDriving, setIsDriving] = useState(false);
  const [activeCall, setActiveCall] = useState(null);

  const glowAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const warningAnim = useRef(new Animated.Value(0)).current;

  const quickMessages = [
    { id: '1', text: 'On my way!', icon: 'car', color: ['#4CAF50', '#8BC34A'] },
    { id: '2', text: 'Running late', icon: 'time', color: ['#FF9800', '#FF5722'] },
    { id: '3', text: 'Be there in 5', icon: 'speedometer', color: ['#2196F3', '#03A9F4'] },
    { id: '4', text: 'Stuck in traffic', icon: 'alert-circle', color: ['#F44336', '#E91E63'] },
  ];

  const groupCalls = [
    { id: '1', name: 'SoCal Cruisers', members: 8, active: true },
    { id: '2', name: 'Admin Team', members: 3, active: false },
  ];

  useEffect(() => {
    // Glow effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Pulse for driving mode
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
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

    // Warning banner animation
    if (isDriving) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(warningAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(warningAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isDriving]);

  const sendQuickMessage = (message) => {
    console.log('Sending:', message);
  };

  const startGroupCall = (group) => {
    setActiveCall(group);
  };

  const endCall = () => {
    setActiveCall(null);
  };

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  const QuickMessageButton = ({ item, index }) => {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const buttonPulse = useRef(new Animated.Value(1)).current;

    useEffect(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay: index * 100,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(buttonPulse, {
            toValue: 1.05,
            duration: 1500 + index * 200,
            useNativeDriver: true,
          }),
          Animated.timing(buttonPulse, {
            toValue: 1,
            duration: 1500 + index * 200,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, []);

    const handlePressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.9,
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
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => sendQuickMessage(item.text)}
        activeOpacity={1}
        style={styles.quickMessageWrapper}
      >
        <Animated.View
          style={[
            styles.quickMessageButton,
            {
              transform: [{ scale: scaleAnim }, { scale: buttonPulse }],
            },
          ]}
        >
          <LinearGradient
            colors={item.color}
            style={styles.quickMessageGradient}
          >
            <Ionicons name={item.icon} size={36} color="#fff" />
            <Text style={styles.quickMessageText}>{item.text}</Text>
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f2027', '#203a43', '#2c5364']}
        style={styles.backgroundGradient}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Driving Mode</Text>
          <TouchableOpacity
            onPress={() => setIsDriving(!isDriving)}
            activeOpacity={0.8}
          >
            <Animated.View
              style={[
                styles.drivingToggle,
                isDriving && styles.drivingActive,
                {
                  transform: [{ scale: isDriving ? pulseAnim : 1 }],
                },
              ]}
            >
              <LinearGradient
                colors={isDriving ? ['#4CAF50', '#8BC34A'] : ['#666', '#999']}
                style={styles.toggleGradient}
              >
                <Animated.View style={{ opacity: isDriving ? glowOpacity : 1 }}>
                  <Ionicons name={isDriving ? 'car' : 'car-outline'} size={24} color="#fff" />
                </Animated.View>
                <Text style={styles.drivingText}>
                  {isDriving ? 'Active' : 'Inactive'}
                </Text>
              </LinearGradient>
            </Animated.View>
          </TouchableOpacity>
        </View>

        {isDriving && (
          <Animated.View
            style={[
              styles.warningBanner,
              {
                opacity: warningAnim,
              },
            ]}
          >
            <LinearGradient
              colors={['#FF9800', '#FF5722']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.warningGradient}
            >
              <Ionicons name="warning" size={24} color="#fff" />
              <Text style={styles.warningText}>Focus on the road - Voice commands active</Text>
            </LinearGradient>
          </Animated.View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Messages</Text>
          <View style={styles.quickMessageGrid}>
            {quickMessages.map((item, index) => (
              <QuickMessageButton key={item.id} item={item} index={index} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Group Calls</Text>
          {activeCall ? (
            <Animated.View
              style={[
                styles.activeCallContainer,
                {
                  transform: [{ scale: pulseAnim }],
                },
              ]}
            >
              <LinearGradient
                colors={['#4CAF50', '#8BC34A']}
                style={styles.activeCallGradient}
              >
                <View style={styles.activeCallHeader}>
                  <Animated.View style={{ opacity: glowOpacity }}>
                    <Ionicons name="call" size={28} color="#fff" />
                  </Animated.View>
                  <Text style={styles.activeCallText}>Connected to {activeCall.name}</Text>
                </View>
                <View style={styles.callControls}>
                  <TouchableOpacity style={styles.callButton}>
                    <LinearGradient colors={['#666', '#999']} style={styles.controlButtonGradient}>
                      <Ionicons name="mic-off" size={24} color="#fff" />
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.callButton}>
                    <LinearGradient colors={['#2196F3', '#03A9F4']} style={styles.controlButtonGradient}>
                      <Ionicons name="volume-high" size={24} color="#fff" />
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.callButton} onPress={endCall}>
                    <LinearGradient colors={['#FF3B30', '#F44336']} style={styles.controlButtonGradient}>
                      <Ionicons name="call" size={24} color="#fff" />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </Animated.View>
          ) : (
            <FlatList
              data={groupCalls}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => startGroupCall(item)}>
                  <LinearGradient
                    colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                    style={styles.callItem}
                  >
                    <View style={styles.callInfo}>
                      <Text style={styles.callName}>{item.name}</Text>
                      <Text style={styles.callMembers}>{item.members} members</Text>
                    </View>
                    <Ionicons name="call" size={28} color="#4CAF50" />
                  </LinearGradient>
                </TouchableOpacity>
              )}
            />
          )}
        </View>

        <MusicControlWidget compact={true} />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  backgroundGradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  drivingToggle: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  toggleGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  drivingText: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  warningBanner: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  warningGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  warningText: {
    marginLeft: 15,
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#fff',
  },
  quickMessageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickMessageWrapper: {
    width: '48%',
    marginBottom: 15,
  },
  quickMessageButton: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  quickMessageGradient: {
    padding: 25,
    alignItems: 'center',
  },
  quickMessageText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
  },
  activeCallContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  activeCallGradient: {
    padding: 25,
  },
  activeCallHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  activeCallText: {
    marginLeft: 15,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  callControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  callButton: {
    borderRadius: 35,
    overflow: 'hidden',
  },
  controlButtonGradient: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
  },
  callInfo: {
    flex: 1,
  },
  callName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    color: '#fff',
  },
  callMembers: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
});
