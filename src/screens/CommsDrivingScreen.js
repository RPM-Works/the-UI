import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MusicControlWidget from '../widgets/MusicControlWidget';

export default function CommsDrivingScreen() {
  const [isDriving, setIsDriving] = useState(false);
  const [activeCall, setActiveCall] = useState(null);

  const quickMessages = [
    { id: '1', text: 'On my way!', icon: 'car' },
    { id: '2', text: 'Running late', icon: 'time' },
    { id: '3', text: 'Be there in 5', icon: 'speedometer' },
    { id: '4', text: 'Stuck in traffic', icon: 'alert-circle' },
  ];

  const groupCalls = [
    { id: '1', name: 'SoCal Cruisers', members: 8, active: true },
    { id: '2', name: 'Admin Team', members: 3, active: false },
  ];

  const sendQuickMessage = (message) => {
    console.log('Sending:', message);
    // TODO: Implement actual message sending
  };

  const startGroupCall = (group) => {
    setActiveCall(group);
  };

  const endCall = () => {
    setActiveCall(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Driving Mode</Text>
        <TouchableOpacity
          style={[styles.drivingToggle, isDriving && styles.drivingActive]}
          onPress={() => setIsDriving(!isDriving)}
        >
          <Ionicons name={isDriving ? 'car' : 'car-outline'} size={24} color="#fff" />
          <Text style={styles.drivingText}>
            {isDriving ? 'Active' : 'Inactive'}
          </Text>
        </TouchableOpacity>
      </View>

      {isDriving && (
        <View style={styles.warningBanner}>
          <Ionicons name="warning" size={20} color="#FF9800" />
          <Text style={styles.warningText}>Focus on the road - Voice commands active</Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Messages</Text>
        <View style={styles.quickMessageGrid}>
          {quickMessages.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.quickMessageButton}
              onPress={() => sendQuickMessage(item.text)}
            >
              <Ionicons name={item.icon} size={32} color="#007AFF" />
              <Text style={styles.quickMessageText}>{item.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Group Calls</Text>
        {activeCall ? (
          <View style={styles.activeCallContainer}>
            <View style={styles.activeCallHeader}>
              <Ionicons name="call" size={24} color="#4CAF50" />
              <Text style={styles.activeCallText}>Connected to {activeCall.name}</Text>
            </View>
            <View style={styles.callControls}>
              <TouchableOpacity style={styles.muteButton}>
                <Ionicons name="mic-off" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.speakerButton}>
                <Ionicons name="volume-high" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.endCallButton} onPress={endCall}>
                <Ionicons name="call" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <FlatList
            data={groupCalls}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.callItem}
                onPress={() => startGroupCall(item)}
              >
                <View style={styles.callInfo}>
                  <Text style={styles.callName}>{item.name}</Text>
                  <Text style={styles.callMembers}>{item.members} members</Text>
                </View>
                <Ionicons name="call" size={24} color="#007AFF" />
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      <MusicControlWidget compact={true} />
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
  drivingToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#999',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  drivingActive: {
    backgroundColor: '#4CAF50',
  },
  drivingText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    padding: 12,
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 10,
  },
  warningText: {
    marginLeft: 10,
    color: '#FF9800',
    fontSize: 14,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  quickMessageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickMessageButton: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  quickMessageText: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  activeCallContainer: {
    backgroundColor: '#e8f5e9',
    padding: 20,
    borderRadius: 15,
  },
  activeCallHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  activeCallText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '600',
  },
  callControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  muteButton: {
    backgroundColor: '#666',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  speakerButton: {
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  endCallButton: {
    backgroundColor: '#FF3B30',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  callInfo: {
    flex: 1,
  },
  callName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  callMembers: {
    fontSize: 14,
    color: '#666',
  },
});
