import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CardsWidget({ showAll = false }) {
  const cards = [
    { id: '1', type: 'Member Card', status: 'active', color: '#007AFF' },
    { id: '2', type: 'Stats Card', stats: { meets: 8, posts: 45 }, color: '#4CAF50' },
    { id: '3', type: 'Mod Card', role: 'Admin', color: '#FF9800' },
  ];

  const renderCard = (card) => {
    return (
      <View key={card.id} style={[styles.card, { borderLeftColor: card.color }]}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardType}>{card.type}</Text>
          {card.status && (
            <View style={[styles.statusBadge, { backgroundColor: card.color }]}>
              <Text style={styles.statusText}>{card.status}</Text>
            </View>
          )}
        </View>

        {card.stats && (
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="calendar" size={20} color="#007AFF" />
              <Text style={styles.statValue}>{card.stats.meets}</Text>
              <Text style={styles.statLabel}>Meets</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="chatbubbles" size={20} color="#007AFF" />
              <Text style={styles.statValue}>{card.stats.posts}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
          </View>
        )}

        {card.role && (
          <View style={styles.roleContainer}>
            <Ionicons name="shield-checkmark" size={24} color={card.color} />
            <Text style={[styles.roleText, { color: card.color }]}>{card.role}</Text>
          </View>
        )}

        <View style={styles.cardActions}>
          <TouchableOpacity style={styles.cardButton}>
            <Ionicons name="download" size={18} color="#007AFF" />
            <Text style={styles.cardButtonText}>Print</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardButton}>
            <Ionicons name="share-social" size={18} color="#007AFF" />
            <Text style={styles.cardButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (!showAll) {
    return (
      <View style={styles.compactContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {cards.map(card => (
            <View key={card.id} style={[styles.miniCard, { backgroundColor: card.color }]}>
              <Ionicons name="card" size={24} color="#fff" />
              <Text style={styles.miniCardText}>{card.type.split(' ')[0]}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.addMiniCard}>
            <Ionicons name="add" size={24} color="#007AFF" />
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Digital Cards</Text>
        <TouchableOpacity>
          <Ionicons name="add-circle" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {cards.map(renderCard)}

      <TouchableOpacity style={styles.orderPhysicalCard}>
        <Ionicons name="card" size={24} color="#007AFF" />
        <View style={styles.orderTextContainer}>
          <Text style={styles.orderTitle}>Order Physical Card</Text>
          <Text style={styles.orderSubtitle}>Get a metal membership card</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#999" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardType: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  roleText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
  },
  cardButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardButtonText: {
    marginLeft: 5,
    color: '#007AFF',
    fontWeight: '500',
  },
  orderPhysicalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 15,
  },
  orderTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
  },
  orderSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  compactContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  miniCard: {
    width: 80,
    height: 80,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  miniCardText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
  },
  addMiniCard: {
    width: 80,
    height: 80,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
