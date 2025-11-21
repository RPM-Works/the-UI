import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PrivacySettingsWidget from '../widgets/PrivacySettingsWidget';
import TurboSoundWidget from '../widgets/TurboSoundWidget';

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Ionicons name="notifications" size={24} color="#007AFF" />
            <Text style={styles.settingText}>Notifications</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#767577', true: '#007AFF' }}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Ionicons name="location" size={24} color="#007AFF" />
            <Text style={styles.settingText}>Location Sharing</Text>
          </View>
          <Switch
            value={locationSharing}
            onValueChange={setLocationSharing}
            trackColor={{ false: '#767577', true: '#007AFF' }}
          />
        </View>
      </View>

      <PrivacySettingsWidget />
      <TurboSoundWidget />

      <View style={styles.section}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="information-circle" size={24} color="#007AFF" />
          <Text style={styles.buttonText}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Ionicons name="help-circle" size={24} color="#007AFF" />
          <Text style={styles.buttonText}>Help & Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.dangerButton]}>
          <Ionicons name="log-out" size={24} color="#FF3B30" />
          <Text style={[styles.buttonText, styles.dangerText]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#666',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    marginLeft: 15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#000',
  },
  dangerButton: {
    borderBottomWidth: 0,
  },
  dangerText: {
    color: '#FF3B30',
  },
});
