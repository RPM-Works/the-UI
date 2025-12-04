import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import AppTheme from '../theme/AppTheme';
import PrimaryButton from '../components/PrimaryButton';

const HomeScreen = () => {
  const isDark = useColorScheme() === 'dark';

  const posts = [
    {
      title: 'Epic Meet at Sunset Boulevard',
      subtitle: 'Join us this weekend for the biggest car meet of the year!',
      likes: 234,
      comments: 45,
    },
    {
      title: 'New Turbo Install Complete',
      subtitle: 'Finally got the Stage 3 turbo installed. Ready to test!',
      likes: 189,
      comments: 32,
    },
    {
      title: 'Track Day Results',
      subtitle: 'Shaved 2 seconds off my lap time. New personal best!',
      likes: 456,
      comments: 78,
    },
  ];

  const renderPostCard = (post, index) => (
    <TouchableOpacity
      key={index}
      style={[styles.postCard, {
        backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF',
      }]}
      activeOpacity={0.9}>
      <View style={styles.postContent}>
        <Text style={[styles.postTitle, { color: isDark ? '#FFF' : '#000' }]}>
          {post.title}
        </Text>
        <Text style={[styles.postSubtitle, { color: isDark ? '#FFFFFFB3' : '#00000099' }]}>
          {post.subtitle}
        </Text>
        <View style={styles.postActions}>
          <View style={styles.actionItem}>
            <Icon name="heart" size={16} color={isDark ? '#FFFFFF99' : '#00000099'} />
            <Text style={[styles.actionText, { color: isDark ? '#FFFFFF99' : '#00000099' }]}>
              {post.likes}
            </Text>
          </View>
          <View style={styles.actionItem}>
            <Icon name="comment" size={16} color={isDark ? '#FFFFFF99' : '#00000099'} />
            <Text style={[styles.actionText, { color: isDark ? '#FFFFFF99' : '#00000099' }]}>
              {post.comments}
            </Text>
          </View>
          <View style={styles.actionItem}>
            <Icon name="share" size={16} color={isDark ? '#FFFFFF99' : '#00000099'} />
            <Text style={[styles.actionText, { color: isDark ? '#FFFFFF99' : '#00000099' }]}>
              Share
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, {
      backgroundColor: isDark ? AppTheme.colors.darkBackground : AppTheme.colors.lightBackground,
    }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Burnout</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="filter" size={20} color={AppTheme.colors.primaryBlue} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="bell" size={20} color={AppTheme.colors.primaryBlue} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, {
        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)',
      }]}>
        <Icon name="search" size={18} color={isDark ? '#FFFFFF99' : '#00000099'} />
        <Text style={[styles.searchPlaceholder, { color: isDark ? '#FFFFFF99' : '#00000099' }]}>
          Search posts, users, events...
        </Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <View style={{ flex: 1, marginRight: 6 }}>
          <PrimaryButton text="Routes" icon="map" onPress={() => {}} height={48} />
        </View>
        <View style={{ flex: 1, marginLeft: 6 }}>
          <PrimaryButton text="Walkie" icon="microphone" onPress={() => {}} height={48} />
        </View>
      </View>

      {/* Posts Feed */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {posts.map((post, index) => renderPostCard(post, index))}
        <View style={{ height: 100 }} />
      </ScrollView>
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
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: AppTheme.colors.primaryBlue,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 16,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  searchPlaceholder: {
    fontSize: 16,
    marginLeft: 12,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  postCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 18,
    overflow: 'hidden',
    ...AppTheme.shadows.card,
  },
  postContent: {
    padding: 18,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  postSubtitle: {
    fontSize: 14,
    marginTop: 6,
    lineHeight: 20,
  },
  postActions: {
    flexDirection: 'row',
    marginTop: 12,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionText: {
    fontSize: 13,
    marginLeft: 6,
  },
});

export default HomeScreen;
