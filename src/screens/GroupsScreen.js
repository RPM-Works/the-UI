import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FBGroupsWidget from '../widgets/FBGroupsWidget';
import BlogsNewsWidget from '../widgets/BlogsNewsWidget';
import CalendarWidget from '../widgets/CalendarWidget';
import SoCalMeetsWidget from '../widgets/SoCalMeetsWidget';
import TagsWidget from '../widgets/TagsWidget';

export default function GroupsScreen() {
  const [activeTab, setActiveTab] = useState('groups');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Community</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'groups' && styles.activeTab]}
          onPress={() => setActiveTab('groups')}
        >
          <Ionicons name="people" size={20} color={activeTab === 'groups' ? '#007AFF' : '#999'} />
          <Text style={[styles.tabText, activeTab === 'groups' && styles.activeTabText]}>Groups</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'news' && styles.activeTab]}
          onPress={() => setActiveTab('news')}
        >
          <Ionicons name="newspaper" size={20} color={activeTab === 'news' ? '#007AFF' : '#999'} />
          <Text style={[styles.tabText, activeTab === 'news' && styles.activeTabText]}>News</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'events' && styles.activeTab]}
          onPress={() => setActiveTab('events')}
        >
          <Ionicons name="calendar" size={20} color={activeTab === 'events' ? '#007AFF' : '#999'} />
          <Text style={[styles.tabText, activeTab === 'events' && styles.activeTabText]}>Events</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'groups' && (
          <>
            <TagsWidget />
            <FBGroupsWidget />
          </>
        )}

        {activeTab === 'news' && (
          <BlogsNewsWidget />
        )}

        {activeTab === 'events' && (
          <>
            <CalendarWidget />
            <SoCalMeetsWidget />
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#999',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
});
