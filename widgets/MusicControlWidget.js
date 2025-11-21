import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Slider } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MusicControlWidget({ onClose, compact = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentSong] = useState({
    title: 'Turbo Sounds Mix',
    artist: 'Car Audio',
    duration: 240,
    current: 45,
  });

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  if (compact) {
    return (
      <View style={styles.compactContainer}>
        <View style={styles.compactInfo}>
          <Ionicons name="musical-notes" size={20} color="#007AFF" />
          <Text style={styles.compactText} numberOfLines={1}>{currentSong.title}</Text>
        </View>
        <View style={styles.compactControls}>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="play-skip-back" size={20} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={togglePlay} style={styles.compactPlayButton}>
            <Ionicons name={isPlaying ? 'pause' : 'play'} size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="play-skip-forward" size={20} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Now Playing</Text>
        {onClose && (
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.albumArt}>
        <Ionicons name="disc" size={80} color="#007AFF" />
      </View>

      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{currentSong.title}</Text>
        <Text style={styles.artistName}>{currentSong.artist}</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progress,
              { width: `${(currentSong.current / currentSong.duration) * 100}%` }
            ]}
          />
        </View>
        <View style={styles.timeLabels}>
          <Text style={styles.timeText}>
            {Math.floor(currentSong.current / 60)}:{String(currentSong.current % 60).padStart(2, '0')}
          </Text>
          <Text style={styles.timeText}>
            {Math.floor(currentSong.duration / 60)}:{String(currentSong.duration % 60).padStart(2, '0')}
          </Text>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity>
          <Ionicons name="shuffle" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="play-skip-back" size={32} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.playButton} onPress={togglePlay}>
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={32} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="play-skip-forward" size={32} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="repeat" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.volumeContainer}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  albumArt: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#e8f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  songInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  songTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  artistName: {
    fontSize: 16,
    color: '#666',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginBottom: 5,
  },
  progress: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
  timeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 12,
    color: '#666',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  volumeSlider: {
    flex: 1,
    marginHorizontal: 10,
  },
  compactContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  compactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  compactText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '500',
  },
  compactControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compactPlayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});
