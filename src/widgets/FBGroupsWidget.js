import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function FBGroupsWidget() {
  const [groups] = useState([
    { id: '1', name: 'SoCal Car Enthusiasts', members: '12.5K', activity: 'Very Active', joined: true },
    { id: '2', name: 'Modified Cars LA', members: '8.2K', activity: 'Active', joined: true },
    { id: '3', name: 'OC Car Meets', members: '5.6K', activity: 'Active', joined: false },
    { id: '4', name: 'Import Tuners California', members: '15.3K', activity: 'Very Active', joined: false },
  ]);

  const toggleJoin = (groupId) => {
    console.log('Toggle join for group:', groupId);
    // TODO: Implement actual join/leave functionality
  };

  const renderGroup = ({ item }) => (
    <View style={styles.groupItem}>
      <View style={styles.groupIcon}>
        <Icon name="people-circle" size={50} color="#007AFF" />
      </View>
      <View style={styles.groupInfo}>
        <Text style={styles.groupName}>{item.name}</Text>
        <View style={styles.groupMeta}>
          <Icon name="people" size={14} color="#666" />
          <Text style={styles.metaText}>{item.members} members</Text>
          <View style={[
            styles.activityDot,
            { backgroundColor: item.activity === 'Very Active' ? '#4CAF50' : '#FF9800' }
          ]} />
          <Text style={styles.metaText}>{item.activity}</Text>
        </View>
        <TouchableOpacity
          style={[styles.joinButton, item.joined && styles.joinedButton]}
          onPress={() => toggleJoin(item.id)}
        >
          <Ionicons
            name={item.joined ? 'checkmark-circle' : 'add-circle'}
            size={18}
            color={item.joined ? '#4CAF50' : '#007AFF'}
          />
          <Text style={[styles.joinButtonText, item.joined && styles.joinedButtonText]}>
            {item.joined ? 'Joined' : 'Join Group'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Facebook Groups</Text>
        <TouchableOpacity>
          <Icon name="search" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={groups}
        renderItem={renderGroup}
        keyExtractor={item => item.id}
        scrollEnabled={false}
      />

      <TouchableOpacity style={styles.browseButton}>
        <Text style={styles.browseButtonText}>Browse More Groups</Text>
        <Icon name="chevron-forward" size={20} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  groupItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  groupIcon: {
    marginRight: 15,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  groupMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
    marginRight: 10,
  },
  activityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#e8f4ff',
  },
  joinedButton: {
    backgroundColor: '#e8f5e9',
  },
  joinButtonText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  joinedButtonText: {
    color: '#4CAF50',
  },
  browseButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  browseButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
    marginRight: 5,
  },
});
