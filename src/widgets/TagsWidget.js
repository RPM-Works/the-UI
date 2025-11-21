import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function TagsWidget() {
  const [selectedTags, setSelectedTags] = useState(['org']);

  const tags = [
    { id: 'org', name: 'Organizer', icon: 'calendar', color: '#007AFF' },
    { id: 'admin', name: 'Admin', icon: 'shield-checkmark', color: '#4CAF50' },
    { id: 'cc', name: 'CC Member', icon: 'people', color: '#FF9800' },
    { id: 'mod', name: 'Moderator', icon: 'construct', color: '#9C27B0' },
    { id: 'verified', name: 'Verified', icon: 'checkmark-circle', color: '#2196F3' },
  ];

  const toggleTag = (tagId) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Tags</Text>
        <Text style={styles.subtitle}>Manage your community roles</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagsContainer}>
        {tags.map(tag => (
          <TouchableOpacity
            key={tag.id}
            style={[
              styles.tagChip,
              selectedTags.includes(tag.id) && { backgroundColor: tag.color }
            ]}
            onPress={() => toggleTag(tag.id)}
          >
            <Ionicons
              name={tag.icon}
              size={18}
              color={selectedTags.includes(tag.id) ? '#fff' : tag.color}
            />
            <Text style={[
              styles.tagName,
              selectedTags.includes(tag.id) && styles.tagNameActive
            ]}>
              {tag.name}
            </Text>
            {selectedTags.includes(tag.id) && (
              <Icon name="close-circle" size={16} color="#fff" />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.infoBox}>
        <Icon name="information-circle" size={20} color="#007AFF" />
        <Text style={styles.infoText}>
          Tags help members identify your roles and permissions in the community.
        </Text>
      </View>

      <View style={styles.permissions}>
        <Text style={styles.permissionsTitle}>Current Permissions</Text>
        {selectedTags.map(tagId => {
          const tag = tags.find(t => t.id === tagId);
          const permissions = {
            'org': ['Create Events', 'Manage RSVPs'],
            'admin': ['All Permissions', 'Manage Users', 'Delete Content'],
            'cc': ['Access Member Areas', 'Attend Exclusive Events'],
            'mod': ['Edit Posts', 'Ban Users', 'Pin Messages'],
            'verified': ['Trusted Badge', 'Priority Support'],
          };

          return (
            <View key={tagId} style={styles.permissionGroup}>
              <View style={[styles.permissionHeader, { backgroundColor: tag.color + '20' }]}>
                <Icon name={tag.icon} size={16} color={tag.color} />
                <Text style={[styles.permissionHeaderText, { color: tag.color }]}>
                  {tag.name}
                </Text>
              </View>
              {permissions[tagId]?.map((perm, index) => (
                <View key={index} style={styles.permissionItem}>
                  <Icon name="checkmark" size={16} color="#4CAF50" />
                  <Text style={styles.permissionText}>{perm}</Text>
                </View>
              ))}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
  },
  tagsContainer: {
    marginBottom: 15,
  },
  tagChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    marginRight: 10,
  },
  tagName: {
    fontSize: 14,
    color: '#000',
    marginLeft: 8,
    marginRight: 5,
  },
  tagNameActive: {
    color: '#fff',
    fontWeight: '600',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f4ff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#007AFF',
    marginLeft: 10,
  },
  permissions: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
  },
  permissionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  permissionGroup: {
    marginBottom: 15,
  },
  permissionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  permissionHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingLeft: 10,
  },
  permissionText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
});
