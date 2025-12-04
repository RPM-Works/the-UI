import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppTheme from '../theme/AppTheme';
import CreatePostModal from '../components/CreatePostModal';

const { width } = Dimensions.get('window');

const EventsScreen = () => {
  const isDark = useColorScheme() === 'dark';
  const [activeTab, setActiveTab] = useState(0); // 0: Events, 1: Posts
  const [modalVisible, setModalVisible] = useState(false);

  const events = [
    {
      username: 'TheMasterBender',
      title: 'Sunset Boulevard Meet',
      location: 'Los Angeles, CA',
      date: 'Saturday, 8:00 PM',
      likes: 234,
      comments: 45,
      attending: 89,
      description: 'Join us this weekend for the biggest car meet of the year! Bring your best ride and let\'s make some noise! 🚗💨',
      timestamp: '2 hours ago',
    },
    {
      username: 'SpeedDemon',
      title: 'Track Day at Laguna Seca',
      location: 'Monterey, CA',
      date: 'Next Sunday',
      likes: 456,
      comments: 78,
      attending: 45,
      description: 'Testing the new turbo setup at Laguna Seca! Who\'s coming?',
      timestamp: '5 hours ago',
    },
  ];

  const posts = [
    {
      username: 'TurboKing',
      caption: 'Stage 3 turbo install complete! Can\'t wait to hit the dyno. Expected 450hp+ 💪',
      location: 'Tokyo Drift Garage',
      likes: 892,
      comments: 124,
      timestamp: '1 hour ago',
      category: 'Modifications',
    },
    {
      username: 'DriftQueen',
      caption: 'Perfect weather for some sideways action! 🔥',
      location: 'Ebisu Circuit',
      likes: 1234,
      comments: 234,
      timestamp: '3 hours ago',
      category: 'Track Days',
    },
  ];

  const handlePost = (postData) => {
    console.log('New post:', postData);
  };

  const renderEventCard = (event, index) => (
    <View
      key={index}
      style={[styles.card, {
        backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF',
      }]}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.avatar}>
          <LinearGradient
            colors={AppTheme.gradients.primary}
            style={styles.avatarGradient}>
            <Icon name="user" size={20} color="#FFFFFF" />
          </LinearGradient>
        </View>
        <View style={styles.headerInfo}>
          <Text style={[styles.username, { color: isDark ? '#FFF' : '#000' }]}>
            {event.username}
          </Text>
          <Text style={[styles.timestamp, { color: isDark ? '#FFFFFF99' : '#00000099' }]}>
            {event.timestamp}
          </Text>
        </View>
        <Icon name="ellipsis-h" size={20} color={isDark ? '#FFFFFF99' : '#00000099'} />
      </View>

      {/* Event Image */}
      <View style={styles.eventImage}>
        <LinearGradient
          colors={[`${AppTheme.colors.primaryBlue}50`, `${AppTheme.colors.primaryBlue}1A`]}
          style={styles.eventImageGradient}>
          <Icon name="calendar-alt" size={80} color={`${AppTheme.colors.primaryBlue}50`} />
        </LinearGradient>
        <View style={styles.locationBadge}>
          <Icon name="map-marker-alt" size={12} color="#FFFFFF" />
          <Text style={styles.locationText}>{event.location}</Text>
        </View>
      </View>

      {/* Event Info */}
      <View style={styles.eventInfo}>
        <Text style={[styles.eventTitle, { color: isDark ? '#FFF' : '#000' }]}>
          {event.title}
        </Text>
        <View style={styles.eventDate}>
          <Icon name="clock" size={14} color={AppTheme.colors.primaryBlue} />
          <Text style={[styles.eventDateText, { color: isDark ? '#FFFFFFB3' : '#00000099' }]}>
            {event.date}
          </Text>
        </View>
        <Text style={[styles.eventDescription, { color: isDark ? '#FFFFFFB3' : '#000' }]}>
          {event.description}
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.eventActions}>
        <View style={styles.eventStats}>
          <View style={styles.stat}>
            <Icon name="heart" size={16} color={isDark ? '#FFFFFF99' : '#00000099'} />
            <Text style={[styles.statText, { color: isDark ? '#FFFFFF99' : '#00000099' }]}>
              {event.likes}
            </Text>
          </View>
          <View style={styles.stat}>
            <Icon name="comment" size={16} color={isDark ? '#FFFFFF99' : '#00000099'} />
            <Text style={[styles.statText, { color: isDark ? '#FFFFFF99' : '#00000099' }]}>
              {event.comments}
            </Text>
          </View>
          <View style={styles.stat}>
            <Icon name="users" size={16} color={isDark ? '#FFFFFF99' : '#00000099'} />
            <Text style={[styles.statText, { color: isDark ? '#FFFFFF99' : '#00000099' }]}>
              {event.attending} going
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.goingButton}>
          <LinearGradient
            colors={AppTheme.gradients.primary}
            style={styles.goingGradient}>
            <Text style={styles.goingText}>I'm Going</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPostCard = (post, index) => (
    <View
      key={index}
      style={[styles.card, {
        backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF',
      }]}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.avatar}>
          <LinearGradient
            colors={AppTheme.gradients.primary}
            style={styles.avatarGradient}>
            <Icon name="user" size={20} color="#FFFFFF" />
          </LinearGradient>
        </View>
        <View style={styles.headerInfo}>
          <Text style={[styles.username, { color: isDark ? '#FFF' : '#000' }]}>
            {post.username}
          </Text>
          {post.location && (
            <View style={styles.postLocation}>
              <Icon name="map-marker-alt" size={10} color={AppTheme.colors.primaryBlue} />
              <Text style={[styles.postLocationText, { color: isDark ? '#FFFFFF99' : '#00000099' }]}>
                {post.location}
              </Text>
            </View>
          )}
        </View>
        <Icon name="ellipsis-h" size={20} color={isDark ? '#FFFFFF99' : '#00000099'} />
      </View>

      {/* Post Image */}
      <View style={styles.postImage}>
        <LinearGradient
          colors={[`${AppTheme.colors.primaryBlue}50`, `${AppTheme.colors.primaryBlue}1A`]}
          style={styles.postImageGradient}>
          <Icon name="image" size={80} color={`${AppTheme.colors.primaryBlue}50`} />
        </LinearGradient>
      </View>

      {/* Post Content */}
      <View style={styles.postContent}>
        <View style={styles.postActions}>
          <View style={styles.postStats}>
            <View style={styles.stat}>
              <Icon name="heart" size={16} color={isDark ? '#FFFFFF99' : '#00000099'} />
              <Text style={[styles.statText, { color: isDark ? '#FFFFFF99' : '#00000099' }]}>
                {post.likes}
              </Text>
            </View>
            <View style={styles.stat}>
              <Icon name="comment" size={16} color={isDark ? '#FFFFFF99' : '#00000099'} />
              <Text style={[styles.statText, { color: isDark ? '#FFFFFF99' : '#00000099' }]}>
                {post.comments}
              </Text>
            </View>
            <View style={styles.stat}>
              <Icon name="share" size={16} color={isDark ? '#FFFFFF99' : '#00000099'} />
              <Text style={[styles.statText, { color: isDark ? '#FFFFFF99' : '#00000099' }]}>
                Share
              </Text>
            </View>
          </View>
          <Icon name="bookmark" size={20} color={isDark ? '#FFFFFF99' : '#00000099'} />
        </View>
        <Text style={[styles.postCaption, { color: isDark ? '#FFFFFFDE' : '#000' }]}>
          <Text style={{ fontWeight: '600' }}>{post.username} </Text>
          {post.caption}
        </Text>
        <Text style={[styles.timestamp, { color: isDark ? '#FFFFFF99' : '#00000099', marginTop: 8 }]}>
          {post.timestamp}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, {
      backgroundColor: isDark ? AppTheme.colors.darkBackground : AppTheme.colors.lightBackground,
    }]}>
      {/* Header */}
      <View style={[styles.header, {
        borderBottomColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      }]}>
        <Text style={styles.headerTitle}>Events & Posts</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="bell" size={20} color={AppTheme.colors.primaryBlue} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="heart" size={20} color={AppTheme.colors.primaryBlue} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={[styles.tabsContainer, {
        borderBottomColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      }]}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 0 && styles.activeTab]}
          onPress={() => setActiveTab(0)}>
          <Text style={[
            styles.tabText,
            {
              color: activeTab === 0
                ? AppTheme.colors.primaryBlue
                : (isDark ? '#FFFFFF99' : '#00000099'),
            },
          ]}>
            Events
          </Text>
          {activeTab === 0 && (
            <View style={styles.tabIndicator} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 1 && styles.activeTab]}
          onPress={() => setActiveTab(1)}>
          <Text style={[
            styles.tabText,
            {
              color: activeTab === 1
                ? AppTheme.colors.primaryBlue
                : (isDark ? '#FFFFFF99' : '#00000099'),
            },
          ]}>
            Posts
          </Text>
          {activeTab === 1 && (
            <View style={styles.tabIndicator} />
          )}
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {activeTab === 0
          ? events.map((event, index) => renderEventCard(event, index))
          : posts.map((post, index) => renderPostCard(post, index))}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}>
        <LinearGradient
          colors={AppTheme.gradients.primary}
          style={styles.fabGradient}>
          <Icon name="plus" size={24} color="#FFFFFF" />
        </LinearGradient>
      </TouchableOpacity>

      {/* Create Post Modal */}
      <CreatePostModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onPost={handlePost}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: AppTheme.colors.primaryBlue,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginLeft: 12,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {},
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: AppTheme.colors.primaryBlue,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 8,
  },
  card: {
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 18,
    overflow: 'hidden',
    ...AppTheme.shadows.card,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  avatarGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  username: {
    fontSize: 15,
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 12,
    marginTop: 2,
  },
  eventImage: {
    height: 240,
    position: 'relative',
  },
  eventImageGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  locationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  eventInfo: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  eventDate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  eventDateText: {
    fontSize: 14,
    marginLeft: 6,
  },
  eventDescription: {
    fontSize: 14,
    marginTop: 12,
    lineHeight: 20,
  },
  eventActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  eventStats: {
    flexDirection: 'row',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  statText: {
    fontSize: 13,
    marginLeft: 6,
  },
  goingButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  goingGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  goingText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  postImage: {
    height: 300,
  },
  postImageGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContent: {
    padding: 16,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postStats: {
    flexDirection: 'row',
  },
  postLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  postLocationText: {
    fontSize: 12,
    marginLeft: 4,
  },
  postCaption: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 12,
  },
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    ...AppTheme.shadows.button,
  },
  fabGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
});

export default EventsScreen;
