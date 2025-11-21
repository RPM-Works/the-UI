import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SubChatWidget({ chat, onBack }) {
  const [message, setMessage] = useState('');
  const [showSubChats, setShowSubChats] = useState(false);

  const [messages] = useState([
    { id: '1', user: 'Sarah', text: 'Hey everyone! Ready for the meet?', timestamp: '10:30 AM', subChat: null },
    { id: '2', user: 'Mike', text: 'Yeah! What time?', timestamp: '10:32 AM', subChat: null },
    { id: '3', user: 'John', text: '5pm at the usual spot', timestamp: '10:33 AM', subChat: null },
    { id: '4', user: 'Alex', text: 'Anyone bringing their new mods?', timestamp: '10:35 AM', subChat: 'Mods Discussion' },
  ]);

  const [subChats] = useState([
    { id: '1', name: 'Mods Discussion', members: 8, messages: 24 },
    { id: '2', name: 'Route Planning', members: 5, messages: 12 },
    { id: '3', name: 'Food Spot', members: 12, messages: 18 },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      // TODO: Implement actual message sending
      console.log('Sending:', message);
      setMessage('');
    }
  };

  const renderMessage = ({ item }) => (
    <View style={styles.messageContainer}>
      <View style={styles.messageHeader}>
        <Text style={styles.username}>{item.user}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
      <View style={styles.messageBubble}>
        <Text style={styles.messageText}>{item.text}</Text>
        {item.subChat && (
          <View style={styles.subChatTag}>
            <Ionicons name="chatbubbles" size={12} color="#007AFF" />
            <Text style={styles.subChatTagText}>{item.subChat}</Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderSubChat = ({ item }) => (
    <TouchableOpacity style={styles.subChatItem}>
      <View style={styles.subChatIcon}>
        <Ionicons name="chatbubbles" size={20} color="#007AFF" />
      </View>
      <View style={styles.subChatInfo}>
        <Text style={styles.subChatName}>{item.name}</Text>
        <Text style={styles.subChatDetails}>{item.members} members · {item.messages} messages</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <View style={styles.chatHeaderInfo}>
          <Text style={styles.chatName}>{chat.name}</Text>
          <Text style={styles.memberCount}>{chat.members} members</Text>
        </View>
        <TouchableOpacity
          style={styles.subChatButton}
          onPress={() => setShowSubChats(!showSubChats)}
        >
          <Ionicons name="chatbubbles" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {showSubChats ? (
        <View style={styles.subChatsContainer}>
          <View style={styles.subChatsHeader}>
            <Text style={styles.subChatsTitle}>Sub Chats</Text>
            <TouchableOpacity>
              <Ionicons name="add-circle" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={subChats}
            renderItem={renderSubChat}
            keyExtractor={item => item.id}
          />
        </View>
      ) : (
        <>
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={item => item.id}
            style={styles.messageList}
            inverted={false}
          />

          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.attachButton}>
              <Ionicons name="add-circle" size={28} color="#007AFF" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Ionicons name="send" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </KeyboardAvoidingView>
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
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    marginRight: 10,
  },
  chatHeaderInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 18,
    fontWeight: '600',
  },
  memberCount: {
    fontSize: 12,
    color: '#666',
  },
  subChatButton: {
    padding: 5,
  },
  messageList: {
    flex: 1,
    paddingHorizontal: 15,
  },
  messageContainer: {
    marginVertical: 10,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  username: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  messageBubble: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 15,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
  },
  subChatTag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  subChatTagText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  attachButton: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subChatsContainer: {
    flex: 1,
  },
  subChatsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  subChatsTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  subChatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  subChatIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  subChatInfo: {
    flex: 1,
  },
  subChatName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
  },
  subChatDetails: {
    fontSize: 12,
    color: '#666',
  },
});
