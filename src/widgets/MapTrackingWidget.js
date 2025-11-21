import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function MapTrackingWidget({ members }) {
  const [expanded, setExpanded] = useState(false);

  const getMemberStatusColor = (status) => {
    return status === 'driving' ? '#4CAF50' : '#FF9800';
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded(!expanded)}
      >
        <View style={styles.headerLeft}>
          <Icon name="people" size={20} color="#007AFF" />
          <Text style={styles.title}>Group Members</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{members.length}</Text>
          </View>
        </View>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#666"
        />
      </TouchableOpacity>

      {expanded && (
        <ScrollView style={styles.memberList} nestedScrollEnabled={true}>
          {members.map((member) => (
            <View key={member.id} style={styles.memberItem}>
              <View style={styles.memberInfo}>
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: getMemberStatusColor(member.status) }
                  ]}
                />
                <Text style={styles.memberName}>{member.name}</Text>
              </View>
              <View style={styles.memberStatus}>
                <Ionicons
                  name={member.status === 'driving' ? 'car' : 'pause-circle'}
                  size={18}
                  color={getMemberStatusColor(member.status)}
                />
                <Text style={[styles.statusText, { color: getMemberStatusColor(member.status) }]}>
                  {member.status}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
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
    padding: 15,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  badge: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 10,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  memberList: {
    maxHeight: 200,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  memberItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  memberName: {
    fontSize: 14,
    fontWeight: '500',
  },
  memberStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    marginLeft: 5,
    textTransform: 'capitalize',
  },
});
