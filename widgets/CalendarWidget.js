import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CalendarWidget() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events] = useState([
    { id: '1', title: 'Cars & Coffee', time: '8:00 AM', location: 'Costa Mesa', date: new Date(2025, 10, 23) },
    { id: '2', title: 'Night Cruise', time: '7:00 PM', location: 'Long Beach', date: new Date(2025, 10, 25) },
    { id: '3', title: 'Mod Workshop', time: '2:00 PM', location: 'Irvine', date: new Date(2025, 10, 28) },
  ]);

  const getDaysInMonth = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const hasEvent = (day) => {
    if (!day) return false;
    const dateToCheck = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
    return events.some(event =>
      event.date.getDate() === day &&
      event.date.getMonth() === selectedDate.getMonth()
    );
  };

  const getEventsForSelectedDate = () => {
    return events.filter(event =>
      event.date.getDate() === selectedDate.getDate() &&
      event.date.getMonth() === selectedDate.getMonth()
    );
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Events Calendar</Text>
        <TouchableOpacity>
          <Ionicons name="add-circle" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.calendarHeader}>
        <TouchableOpacity
          onPress={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}
        >
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.monthYear}>
          {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
        </Text>
        <TouchableOpacity
          onPress={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}
        >
          <Ionicons name="chevron-forward" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.weekDays}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <Text key={index} style={styles.weekDay}>{day}</Text>
        ))}
      </View>

      <View style={styles.daysGrid}>
        {getDaysInMonth().map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayCell,
              day === selectedDate.getDate() && styles.selectedDay,
              !day && styles.emptyDay,
            ]}
            onPress={() => day && setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
            disabled={!day}
          >
            {day && (
              <>
                <Text style={[
                  styles.dayText,
                  day === selectedDate.getDate() && styles.selectedDayText
                ]}>
                  {day}
                </Text>
                {hasEvent(day) && <View style={styles.eventDot} />}
              </>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {getEventsForSelectedDate().length > 0 && (
        <View style={styles.eventsSection}>
          <Text style={styles.eventsSectionTitle}>Events on {monthNames[selectedDate.getMonth()]} {selectedDate.getDate()}</Text>
          {getEventsForSelectedDate().map(event => (
            <View key={event.id} style={styles.eventItem}>
              <View style={styles.eventTime}>
                <Ionicons name="time" size={16} color="#007AFF" />
                <Text style={styles.eventTimeText}>{event.time}</Text>
              </View>
              <View style={styles.eventDetails}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <View style={styles.eventLocation}>
                  <Ionicons name="location" size={14} color="#666" />
                  <Text style={styles.eventLocationText}>{event.location}</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
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
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthYear: {
    fontSize: 18,
    fontWeight: '600',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekDay: {
    width: 40,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  emptyDay: {
    opacity: 0,
  },
  selectedDay: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
  },
  dayText: {
    fontSize: 14,
    color: '#000',
  },
  selectedDayText: {
    color: '#fff',
    fontWeight: '600',
  },
  eventDot: {
    position: 'absolute',
    bottom: 5,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#4CAF50',
  },
  eventsSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  eventsSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  eventTime: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
  },
  eventTimeText: {
    fontSize: 12,
    color: '#007AFF',
    marginLeft: 4,
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 3,
  },
  eventLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventLocationText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 3,
  },
});
