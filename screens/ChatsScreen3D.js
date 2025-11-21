import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import SubChatWidget from '../widgets/SubChatWidget';
import CardsWidget from '../widgets/CardsWidget';

export default function ChatsScreen3D() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const headerAnim = useRef(new Animated.Value(0)).current;
  const listAnim = useRef(new Animated.Value(0)).current;

  const [groupChats] = useState([
    { id: '1', name: 'SoCal Cruisers', type: 'public', lastMessage: 'Meet at 5pm!', unread: 3, members: 24, color: ['#FF6B6B', '#FF8E53'] },
    { id: '2', name: 'Admin Team', type: 'private', lastMessage: 'Budget approved', unread: 0, members: 5, color: ['#4ECDC4', '#44A08D'] },
    { id: '3', name: 'Car Mods Discussion', type: 'public', lastMessage: 'Check out my new turbo!', unread: 12, members: 156, color: ['#A8E6CF', '#56CCF2'] },
    { id: '4', name: 'OC Meet Planning', type: 'private', lastMessage: 'Location confirmed', unread: 5, members: 8, color: ['#FFD93D', '#F4A261'] },
  ]);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(headerAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.stagger(100, [
        Animated.spring(listAnim, {
          toValue: 1,
          tension: 30,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const AnimatedChatItem = ({ item, index }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    const handlePressIn = () => {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 0.95,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    };

    const handlePressOut = () => {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    };

    const rotateY = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '5deg'],
    });

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => {
          handlePressOut();
          setTimeout(() => setSelectedChat(item), 300);
        }}
      >
        <Animated.View
          style={[
            styles.chatItem,
            {
              transform: [
                { scale: scaleAnim },
                { perspective: 1000 },
                { rotateY },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={item.color}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.chatGradient}
          >
            <View style={styles.chatAvatar}>
                <Icon
                  name={item.type === 'private' ? 'lock-closed' : 'people'}
                  size={28}
                  color="#fff"
                />
            </View>
            <View style={styles.chatInfo}>
              <View style={styles.chatHeader}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.memberCount}>{item.members} members</Text>
              </View>
              <Text style={styles.lastMessage} numberOfLines={1}>
                {item.lastMessage}
              </Text>
            </View>
            {item.unread > 0 && (
              <Animated.View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{item.unread}</Text>
              </Animated.View>
            )}
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  if (selectedChat) {
    return (
      <SubChatWidget
        chat={selectedChat}
        onBack={() => setSelectedChat(null)}
      />
    );
  }

  const headerTranslate = headerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 0],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerBackground}
      >
        <Animated.View
          style={[
            styles.header,
            {
              transform: [{ translateY: headerTranslate }],
              opacity: headerAnim,
            },
          ]}
        >
          <Text style={styles.title}>Group Chats</Text>
          <TouchableOpacity style={styles.addButton}>
          <Icon name="add-circle" size={32} color="#fff" />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[
            styles.searchContainer,
            {
              opacity: headerAnim,
            },
          ]}
        >
          <Icon name="search" size={20} color="#fff" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search chats..."
            placeholderTextColor="rgba(255,255,255,0.7)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </Animated.View>
      </LinearGradient>

      <Animated.View
        style={{
          opacity: listAnim,
          transform: [
            {
              translateY: listAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        }}
      >
        <CardsWidget />
      </Animated.View>

      <FlatList
        data={groupChats}
        renderItem={({ item, index }) => (
          <AnimatedChatItem item={item} index={index} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 50,
  },
  headerBackground: {
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  addButton: {
    padding: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 15,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#fff',
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  chatItem: {
    marginBottom: 15,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  chatGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  chatAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  memberCount: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  lastMessage: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  unreadBadge: {
    backgroundColor: '#fff',
    borderRadius: 15,
    minWidth: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  unreadText: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
