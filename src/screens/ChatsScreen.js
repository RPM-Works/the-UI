import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SubChatWidget from '../widgets/SubChatWidget';
import CardsWidget from '../widgets/CardsWidget';

export default function ChatsScreen() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [groupChats] = useState([
    { id: '1', name: 'SoCal Cruisers', type: 'public', lastMessage: 'Meet at 5pm!', unread: 3, members: 24 },
    { id: '2', name: 'Admin Team', type: 'private', lastMessage: 'Budget approved', unread: 0, members: 5 },
    { id: '3', name: 'Car Mods Discussion', type: 'public', lastMessage: 'Check out my new turbo!', unread: 12, members: 156 },
    { id: '4', name: 'OC Meet Planning', type: 'private', lastMessage: 'Location confirmed', unread: 5, members: 8 },
  ]);

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => setSelectedChat(item)}
    >
      <View style={styles.chatAvatar}>
        <Ionicons
          name={item.type === 'private' ? 'lock-closed' : 'people'}
          size={24}
          color="#007AFF"
        />
      </View>
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.memberCount}>{item.members} members</Text>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
      </View>
      {item.unread > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{item.unread}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  if (selectedChat) {
    return (
      <SubChatWidget
        chat={selectedChat}
        onBack={() => setSelectedChat(null)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Group Chats</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle" size={28} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search chats..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <CardsWidget />

      <FlatList
        data={groupChats}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  addButton: {
    padding: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  list: {
    paddingHorizontal: 20,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e8f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
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
    fontSize: 16,
    fontWeight: '600',
  },
  memberCount: {
    fontSize: 12,
    color: '#999',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  unreadBadge: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
