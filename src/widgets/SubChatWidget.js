import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import EncryptionService from '../utils/EncryptionService';

export default function SubChatWidget({ chat, onBack }) {
  const [message, setMessage] = useState('');
  const [showSubChats, setShowSubChats] = useState(false);
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  const [encryptionReady, setEncryptionReady] = useState(false);

  const [messages] = useState([
    { id: '1', user: 'Sarah', text: 'Hey everyone! Ready for the meet?', timestamp: '10:30 AM', subChat: null, encrypted: true },
    { id: '2', user: 'Mike', text: 'Yeah! What time?', timestamp: '10:32 AM', subChat: null, encrypted: true },
    { id: '3', user: 'John', text: '5pm at the usual spot', timestamp: '10:33 AM', subChat: null, encrypted: true },
    { id: '4', user: 'Alex', text: 'Anyone bringing their new mods?', timestamp: '10:35 AM', subChat: 'Mods Discussion', encrypted: true },
  ]);

  const [subChats] = useState([
    { id: '1', name: 'Mods Discussion', members: 8, messages: 24, encrypted: true },
    { id: '2', name: 'Route Planning', members: 5, messages: 12, encrypted: true },
    { id: '3', name: 'Food Spot', members: 12, messages: 18, encrypted: true },
  ]);

  useEffect(() => {
    initializeEncryption();
  }, []);

  const initializeEncryption = async () => {
    try {
      await EncryptionService.initialize();

      // Create Megolm session for this group chat
      if (chat.type === 'public' || chat.type === 'private') {
        await EncryptionService.createMegolmOutboundSession(chat.id);
      }

      setEncryptionReady(true);
      console.log('Encryption ready for chat:', chat.name);
    } catch (error) {
      console.error('Failed to initialize encryption:', error);
      setEncryptionEnabled(false);
    }
  };

  const sendMessage = async () => {
    if (message.trim()) {
      try {
        let messageToSend = message;

        if (encryptionEnabled && encryptionReady) {
          // Encrypt message using Megolm (group encryption)
          const encrypted = await EncryptionService.encryptGroupMessage(chat.id, message);
          console.log('Message encrypted:', {
            original: message,
            ciphertext: encrypted.ciphertext.substring(0, 50) + '...',
            sessionId: encrypted.sessionId,
          });
          messageToSend = encrypted.ciphertext;
        }

        // TODO: Send encrypted message to backend
        console.log('Sending encrypted message:', messageToSend.substring(0, 50) + '...');
        setMessage('');
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }
  };

  const renderMessage = ({ item }) => (
    <View style={styles.messageContainer}>
      <View style={styles.messageHeader}>
        <Text style={styles.username}>{item.user}</Text>
        <View style={styles.headerRight}>
          {item.encrypted && (
            <Icon name="lock-closed" size={12} color="#4CAF50" style={styles.lockIcon} />
          )}
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
      </View>
      <View style={styles.messageBubble}>
        <Text style={styles.messageText}>{item.text}</Text>
        {item.subChat && (
          <View style={styles.subChatTag}>
            <Icon name="chatbubbles" size={12} color="#007AFF" />
            <Text style={styles.subChatTagText}>{item.subChat}</Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderSubChat = ({ item }) => (
    <TouchableOpacity style={styles.subChatItem}>
      <View style={styles.subChatIcon}>
        <Icon name="chatbubbles" size={20} color="#007AFF" />
      </View>
      <View style={styles.subChatInfo}>
        <View style={styles.subChatNameRow}>
          <Text style={styles.subChatName}>{item.name}</Text>
          {item.encrypted && (
            <Icon name="lock-closed" size={14} color="#4CAF50" style={styles.subChatLockIcon} />
          )}
        </View>
        <Text style={styles.subChatDetails}>{item.members} members · {item.messages} messages</Text>
      </View>
      <Icon name="chevron-forward" size={20} color="#999" />
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
          <Icon name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <View style={styles.chatHeaderInfo}>
          <View style={styles.chatNameRow}>
            <Text style={styles.chatName}>{chat.name}</Text>
            {encryptionEnabled && encryptionReady && (
              <View style={styles.encryptionBadge}>
                <Icon name="shield-checkmark" size={14} color="#4CAF50" />
              </View>
            )}
          </View>
          <Text style={styles.memberCount}>
            {chat.members} members {encryptionEnabled && encryptionReady ? '· E2E Encrypted' : ''}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.subChatButton}
          onPress={() => setShowSubChats(!showSubChats)}
        >
          <Icon name="chatbubbles" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {showSubChats ? (
        <View style={styles.subChatsContainer}>
          <View style={styles.subChatsHeader}>
            <Text style={styles.subChatsTitle}>Sub Chats</Text>
            <TouchableOpacity>
              <Icon name="add-circle" size={24} color="#007AFF" />
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
              <Icon name="add-circle" size={28} color="#007AFF" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Icon name="send" size={20} color="#fff" />
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
  chatNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatName: {
    fontSize: 18,
    fontWeight: '600',
  },
  encryptionBadge: {
    marginLeft: 8,
    backgroundColor: '#e8f5e9',
    borderRadius: 10,
    padding: 3,
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lockIcon: {
    marginRight: 4,
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
  subChatNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subChatName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
  },
  subChatLockIcon: {
    marginLeft: 6,
  },
  subChatDetails: {
    fontSize: 12,
    color: '#666',
  },
});
