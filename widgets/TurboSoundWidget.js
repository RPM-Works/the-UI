import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Slider } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TurboSoundWidget() {
  const [enabled, setEnabled] = useState(true);
  const [selectedSound, setSelectedSound] = useState('classic');
  const [volume, setVolume] = useState(0.7);

  const sounds = [
    { id: 'classic', name: 'Classic Turbo', icon: 'speedometer' },
    { id: 'blow-off', name: 'Blow-off Valve', icon: 'flash' },
    { id: 'supercharger', name: 'Supercharger Whine', icon: 'trending-up' },
    { id: 'custom', name: 'Custom Sound', icon: 'musical-notes' },
  ];

  const testSound = () => {
    console.log('Playing turbo sound:', selectedSound);
    // TODO: Implement actual sound playback
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="volume-high" size={24} color="#007AFF" />
          <Text style={styles.title}>Turbo Sound Opening</Text>
        </View>
        <TouchableOpacity
          style={[styles.toggleButton, enabled && styles.toggleButtonActive]}
          onPress={() => setEnabled(!enabled)}
        >
          <Text style={[styles.toggleText, enabled && styles.toggleTextActive]}>
            {enabled ? 'ON' : 'OFF'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.description}>
        Play turbo sounds when opening the app or starting driving mode
      </Text>

      {enabled && (
        <>
          <View style={styles.soundsGrid}>
            {sounds.map((sound) => (
              <TouchableOpacity
                key={sound.id}
                style={[
                  styles.soundCard,
                  selectedSound === sound.id && styles.soundCardActive
                ]}
                onPress={() => setSelectedSound(sound.id)}
              >
                <Ionicons
                  name={sound.icon}
                  size={32}
                  color={selectedSound === sound.id ? '#007AFF' : '#666'}
                />
                <Text style={[
                  styles.soundName,
                  selectedSound === sound.id && styles.soundNameActive
                ]}>
                  {sound.name}
                </Text>
                {selectedSound === sound.id && (
                  <Ionicons name="checkmark-circle" size={20} color="#007AFF" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.volumeSection}>
            <Text style={styles.volumeLabel}>Volume</Text>
            <View style={styles.volumeControl}>
              <Ionicons name="volume-low" size={20} color="#666" />
              <Slider
                style={styles.volumeSlider}
                value={volume}
                onValueChange={setVolume}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#007AFF"
                maximumTrackTintColor="#ddd"
              />
              <Ionicons name="volume-high" size={20} color="#666" />
            </View>
          </View>

          <TouchableOpacity style={styles.testButton} onPress={testSound}>
            <Ionicons name="play-circle" size={24} color="#fff" />
            <Text style={styles.testButtonText}>Test Sound</Text>
          </TouchableOpacity>

          <View style={styles.triggerSection}>
            <Text style={styles.triggerTitle}>Play Sound On:</Text>
            <TouchableOpacity style={styles.triggerOption}>
              <Ionicons name="rocket" size={20} color="#007AFF" />
              <Text style={styles.triggerText}>App Launch</Text>
              <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.triggerOption}>
              <Ionicons name="car" size={20} color="#007AFF" />
              <Text style={styles.triggerText}>Driving Mode Start</Text>
              <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.triggerOption}>
              <Ionicons name="notifications" size={20} color="#007AFF" />
              <Text style={styles.triggerText}>Important Notifications</Text>
              <Ionicons name="ellipse-outline" size={24} color="#ccc" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  toggleButton: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
  },
  toggleButtonActive: {
    backgroundColor: '#007AFF',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  toggleTextActive: {
    color: '#fff',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  soundsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  soundCard: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  soundCardActive: {
    backgroundColor: '#e8f4ff',
    borderColor: '#007AFF',
  },
  soundName: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 5,
  },
  soundNameActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  volumeSection: {
    marginBottom: 20,
  },
  volumeLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  volumeControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  volumeSlider: {
    flex: 1,
    marginHorizontal: 15,
  },
  testButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  testButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  triggerSection: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
  },
  triggerTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  triggerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  triggerText: {
    flex: 1,
    fontSize: 14,
    marginLeft: 12,
  },
});
