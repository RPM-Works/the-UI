import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import MapTrackingWidget from '../widgets/MapTrackingWidget';
import MusicControlWidget from '../widgets/MusicControlWidget';

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [members, setMembers] = useState([
    { id: '1', name: 'John', latitude: 33.7175, longitude: -117.8311, status: 'driving' },
    { id: '2', name: 'Sarah', latitude: 33.7275, longitude: -117.8411, status: 'parked' },
    { id: '3', name: 'Mike', latitude: 33.7075, longitude: -117.8211, status: 'driving' },
  ]);
  const [showMusicControl, setShowMusicControl] = useState(false);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const permission = Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

        const result = await request(permission);

        if (result === RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            (position) => {
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
            },
            (error) => {
              console.log('Error getting location:', error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        } else {
          console.log('Permission to access location was denied');
        }
      } catch (error) {
        console.log('Error requesting location permission:', error);
      }
    };

    requestLocationPermission();
  }, []);

  const getMarkerColor = (status) => {
    return status === 'driving' ? '#4CAF50' : '#FF9800';
  };

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={location}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {members.map((member) => (
            <Marker
              key={member.id}
              coordinate={{
                latitude: member.latitude,
                longitude: member.longitude,
              }}
              title={member.name}
              description={`Status: ${member.status}`}
              pinColor={getMarkerColor(member.status)}
            />
          ))}
        </MapView>
      )}

      <MapTrackingWidget members={members} />

      <TouchableOpacity
        style={styles.musicButton}
        onPress={() => setShowMusicControl(!showMusicControl)}
      >
        <Icon name="musical-notes" size={24} color="#fff" />
      </TouchableOpacity>

      {showMusicControl && (
        <MusicControlWidget onClose={() => setShowMusicControl(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  musicButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
