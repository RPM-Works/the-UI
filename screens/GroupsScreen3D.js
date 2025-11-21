import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import FBGroupsWidget from '../widgets/FBGroupsWidget';
import BlogsNewsWidget from '../widgets/BlogsNewsWidget';
import CalendarWidget from '../widgets/CalendarWidget';
import SoCalMeetsWidget from '../widgets/SoCalMeetsWidget';
import TagsWidget from '../widgets/TagsWidget';

export default function GroupsScreen3D() {
  const [activeTab, setActiveTab] = useState('groups');
  
  const headerAnim = useRef(new Animated.Value(0)).current;
  const tabIndicatorAnim = useRef(new Animated.Value(0)).current;
  const contentAnim = useRef(new Animated.Value(0)).current;
  const particleAnims = Array.from({ length: 5 }, () => 
    useRef(new Animated.Value(0)).current
  );

  useEffect(() => {
    // Header entrance
    Animated.spring(headerAnim, {
      toValue: 1,
      tension: 20,
      friction: 7,
      useNativeDriver: true,
    }).start();

    // Floating particles
    particleAnims.forEach((anim, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 3000 + index * 500,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 3000 + index * 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  useEffect(() => {
    // Animate tab indicator
    const tabPositions = { groups: 0, news: 0.33, events: 0.66 };
    Animated.spring(tabIndicatorAnim, {
      toValue: tabPositions[activeTab],
      tension: 30,
      friction: 7,
      useNativeDriver: true,
    }).start();

    // Content transition
    Animated.sequence([
      Animated.timing(contentAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.spring(contentAnim, {
        toValue: 1,
        tension: 30,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [activeTab]);

  const AnimatedTab = ({ name, icon, label }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const isActive = activeTab === name;

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
        style={styles.tab}
        onPress={() => setActiveTab(name)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <Animated.View
          style={[
            styles.tabContent,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Ionicons 
            name={icon} 
            size={24} 
            color={isActive ? '#667eea' : '#999'} 
          />
          <Text style={[styles.tabText, isActive && styles.activeTabText]}>
            {label}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const tabIndicatorTranslate = tabIndicatorAnim.interpolate({
    inputRange: [0, 0.33, 0.66],
    outputRange: [0, 120, 240],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#11998e', '#38ef7d']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <Animated.View
          style={[
            styles.header,
            {
              transform: [
                {
                  translateY: headerAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, 0],
                  }),
                },
              ],
              opacity: headerAnim,
            },
          ]}
        >
          <Text style={styles.title}>Community</Text>
          
          {/* Floating particles */}
          {particleAnims.map((anim, index) => {
            const translateY = anim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -100],
            });
            const opacity = anim.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0, 1, 0],
            });
            
            return (
              <Animated.View
                key={index}
                style={[
                  styles.particle,
                  {
                    left: 20 + index * 70,
                    transform: [{ translateY }],
                    opacity,
                  },
                ]}
              >
                <Ionicons name="sparkles" size={20} color="rgba(255,255,255,0.6)" />
              </Animated.View>
            );
          })}
        </Animated.View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <View style={styles.tabs}>
            <AnimatedTab name="groups" icon="people" label="Groups" />
            <AnimatedTab name="news" icon="newspaper" label="News" />
            <AnimatedTab name="events" icon="calendar" label="Events" />
          </View>
          
          {/* Animated indicator */}
          <Animated.View
            style={[
              styles.tabIndicator,
              {
                transform: [{ translateX: tabIndicatorTranslate }],
              },
            ]}
          >
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.indicatorGradient}
            />
          </Animated.View>
        </View>
      </LinearGradient>

      {/* Animated content */}
      <Animated.View
        style={[
          styles.contentContainer,
          {
            opacity: contentAnim,
            transform: [
              {
                translateY: contentAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0],
                }),
              },
              {
                scale: contentAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.95, 1],
                }),
              },
            ],
          },
        ]}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {activeTab === 'groups' && (
            <>
              <TagsWidget />
              <FBGroupsWidget />
            </>
          )}

          {activeTab === 'news' && <BlogsNewsWidget />}

          {activeTab === 'events' && (
            <>
              <CalendarWidget />
              <SoCalMeetsWidget />
            </>
          )}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 50,
  },
  headerGradient: {
    paddingBottom: 0,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  particle: {
    position: 'absolute',
    top: 40,
  },
  tabsContainer: {
    position: 'relative',
    paddingTop: 10,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  tabContent: {
    alignItems: 'center',
  },
  tabText: {
    marginTop: 5,
    fontSize: 14,
    color: '#999',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#667eea',
    fontWeight: 'bold',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    width: 100,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  indicatorGradient: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
