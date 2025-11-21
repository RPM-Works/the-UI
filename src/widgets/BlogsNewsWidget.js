import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function BlogsNewsWidget() {
  const [articles] = useState([
    {
      id: '1',
      title: 'Top 10 Mods for Your First Build',
      category: 'Guides',
      author: 'Car Mod Central',
      date: '2 days ago',
      likes: 245,
      comments: 38,
    },
    {
      id: '2',
      title: 'SoCal Spring Meet Highlights',
      category: 'Events',
      author: 'SoCal News',
      date: '1 week ago',
      likes: 512,
      comments: 67,
    },
    {
      id: '3',
      title: 'Turbo Installation Guide',
      category: 'Technical',
      author: 'Turbo Expert',
      date: '2 weeks ago',
      likes: 892,
      comments: 124,
    },
    {
      id: '4',
      title: 'Best Sound Systems Under $1000',
      category: 'Reviews',
      author: 'Audio Reviews',
      date: '3 weeks ago',
      likes: 356,
      comments: 45,
    },
  ]);

  const getCategoryColor = (category) => {
    const colors = {
      'Guides': '#007AFF',
      'Events': '#4CAF50',
      'Technical': '#FF9800',
      'Reviews': '#9C27B0',
    };
    return colors[category] || '#666';
  };

  const renderArticle = ({ item }) => (
    <TouchableOpacity style={styles.articleItem}>
      <View style={styles.articleImage}>
        <Icon name="newspaper" size={40} color="#007AFF" />
      </View>
      <View style={styles.articleContent}>
        <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) }]}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <Text style={styles.articleTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.articleMeta}>
          <Text style={styles.metaText}>{item.author}</Text>
          <Text style={styles.metaDot}>•</Text>
          <Text style={styles.metaText}>{item.date}</Text>
        </View>
        <View style={styles.articleStats}>
          <View style={styles.statItem}>
            <Icon name="heart" size={16} color="#FF3B30" />
            <Text style={styles.statText}>{item.likes}</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="chatbubble" size={16} color="#007AFF" />
            <Text style={styles.statText}>{item.comments}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>News & Blogs</Text>
        <TouchableOpacity>
          <Icon name="filter" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.categories}>
        {['All', 'Guides', 'Events', 'Technical', 'Reviews'].map((cat) => (
          <TouchableOpacity key={cat} style={styles.categoryChip}>
            <Text style={styles.categoryChipText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={articles}
        renderItem={renderArticle}
        keyExtractor={item => item.id}
        scrollEnabled={false}
      />
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
  categories: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  categoryChip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    marginRight: 10,
  },
  categoryChipText: {
    fontSize: 14,
    color: '#666',
  },
  articleItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  articleImage: {
    width: 80,
    height: 80,
    backgroundColor: '#e8f4ff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  articleContent: {
    flex: 1,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 5,
  },
  categoryText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    lineHeight: 22,
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
  },
  metaDot: {
    marginHorizontal: 5,
    color: '#666',
  },
  articleStats: {
    flexDirection: 'row',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  statText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
});
