import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function PrivacySettingsWidget() {
  const [settings, setSettings] = useState({
    profilePublic: true,
    locationVisible: true,
    showActivity: true,
    allowMessages: true,
    groupInvites: true,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const privacyOptions = [
    {
      key: 'profilePublic',
      icon: 'person',
      title: 'Public Profile',
      description: 'Anyone can see your profile',
    },
    {
      key: 'locationVisible',
      icon: 'location',
      title: 'Share Location',
      description: 'Group members can see your location',
    },
    {
      key: 'showActivity',
      icon: 'pulse',
      title: 'Activity Status',
      description: 'Show when you\'re active',
    },
    {
      key: 'allowMessages',
      icon: 'chatbubbles',
      title: 'Allow Messages',
      description: 'Anyone can message you',
    },
    {
      key: 'groupInvites',
      icon: 'people',
      title: 'Group Invites',
      description: 'Allow group invitations',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="lock-closed" size={24} color="#007AFF" />
        <Text style={styles.title}>Privacy & Security</Text>
      </View>

      <View style={styles.settingsList}>
        {privacyOptions.map((option) => (
          <View key={option.key} style={styles.settingRow}>
            <View style={styles.settingIcon}>
              <Icon name={option.icon} size={20} color="#007AFF" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>{option.title}</Text>
              <Text style={styles.settingDescription}>{option.description}</Text>
            </View>
            <Switch
              value={settings[option.key]}
              onValueChange={() => toggleSetting(option.key)}
              trackColor={{ false: '#767577', true: '#007AFF' }}
            />
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.advancedButton}>
        <Text style={styles.advancedButtonText}>Advanced Privacy Settings</Text>
        <Icon name="chevron-forward" size={20} color="#007AFF" />
      </TouchableOpacity>

      <View style={styles.warningBox}>
        <Icon name="warning" size={20} color="#FF9800" />
        <Text style={styles.warningText}>
          Disabling location sharing will prevent you from appearing on group maps and receiving location-based event notifications.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  settingsList: {
    backgroundColor: '#fff',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 3,
  },
  settingDescription: {
    fontSize: 12,
    color: '#666',
  },
  advancedButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 10,
  },
  advancedButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF3E0',
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
  },
  warningText: {
    flex: 1,
    fontSize: 12,
    color: '#FF9800',
    marginLeft: 10,
    lineHeight: 18,
  },
});
