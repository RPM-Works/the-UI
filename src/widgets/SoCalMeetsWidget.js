import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SoCalMeetsWidget() {
  const [meets] = useState([
    {
      id: '1',
      title: 'Weekend Cruise',
      date: 'Nov 23, 2025',
      time: '5:00 PM',
      location: 'Irvine Spectrum',
      attendees: 45,
      distance: '12 miles',
      type: 'Cruise',
    },
    {
      id: '2',
      title: 'Cars & Coffee',
      date: 'Nov 24, 2025',
      time: '8:00 AM',
      location: 'Costa Mesa',
      attendees: 120,
      distance: '8 miles',
      type: 'Show',
    },
    {
      id: '3',
      title: 'Night Meet',
      date: 'Nov 25, 2025',
      time: '9:00 PM',
      location: 'Long Beach',
      attendees: 67,
      distance: '22 miles',
      type: 'Meet',
    },
  ]);

  const getTypeColor = (type) => {
    const colors = {
      'Cruise': '#007AFF',
      'Show': '#4CAF50',
      'Meet': '#FF9800',
    };
    return colors[type] || '#666';
  };

  const getTypeIcon = (type) => {
    const icons = {
      'Cruise': 'car-sport',
      'Show': 'car',
      'Meet': 'people',
    };
    return icons[type] || 'calendar';
  };

  const renderMeet = ({ item }) => (
    <TouchableOpacity style={styles.meetItem}>
      <View style={[styles.meetIcon, { backgroundColor: getTypeColor(item.type) + '20' }]}>
        <Ionicons name={getTypeIcon(item.type)} size={28} color={getTypeColor(item.type)} />
      </View>

      <View style={styles.meetContent}>
        <View style={styles.meetHeader}>
          <Text style={styles.meetTitle}>{item.title}</Text>
          <View style={[styles.typeBadge, { backgroundColor: getTypeColor(item.type) }]}>
            <Text style={styles.typeText}>{item.type}</Text>
          </View>
        </View>

        <View style={styles.meetDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="calendar" size={14} color="#666" />
            <Text style={styles.detailText}>{item.date}</Text>
            <Ionicons name="time" size={14} color="#666" style={styles.detailIcon} />
            <Text style={styles.detailText}>{item.time}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="location" size={14} color="#666" />
            <Text style={styles.detailText}>{item.location}</Text>
            <Text style={styles.distance}>({item.distance})</Text>
          </View>

          <View style={styles.meetFooter}>
            <View style={styles.attendees}>
              <Ionicons name="people" size={16} color="#007AFF" />
              <Text style={styles.attendeesText}>{item.attendees} attending</Text>
            </View>
            <TouchableOpacity style={styles.rsvpButton}>
              <Text style={styles.rsvpButtonText}>RSVP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>SoCal Meets</Text>
          <Text style={styles.subtitle}>Nearby events in Southern California</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="filter" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterChips}>
        {['All', 'This Week', 'Nearby', 'Popular'].map((filter) => (
          <TouchableOpacity key={filter} style={styles.filterChip}>
            <Text style={styles.filterChipText}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={meets}
        renderItem={renderMeet}
        keyExtractor={item => item.id}
        scrollEnabled={false}
      />

      <TouchableOpacity style={styles.createMeetButton}>
        <Ionicons name="add-circle" size={20} color="#fff" />
        <Text style={styles.createMeetButtonText}>Create New Meet</Text>
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
    alignItems: 'flex-start',
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
  filterChips: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  filterChip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    marginRight: 10,
  },
  filterChipText: {
    fontSize: 14,
    color: '#666',
  },
  meetItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  meetIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  meetContent: {
    flex: 1,
  },
  meetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  meetTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  typeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  meetDetails: {
    marginTop: 5,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailIcon: {
    marginLeft: 12,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  distance: {
    fontSize: 12,
    color: '#999',
    marginLeft: 3,
  },
  meetFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  attendees: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeesText: {
    fontSize: 12,
    color: '#007AFF',
    marginLeft: 5,
  },
  rsvpButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 15,
  },
  rsvpButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  createMeetButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  createMeetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
