import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Mock data for history
const historyData = [
  {
    id: '1',
    date: 'Today',
    items: [
      {
        id: '101',
        type: 'General Waste',
        time: '2 hours ago',
        status: 'completed',
        collector: 'Kwame Mensah',
        rating: 5,
        price: 'GHS 25.00',
      },
    ],
  },
  {
    id: '2',
    date: 'Yesterday',
    items: [
      {
        id: '102',
        type: 'Recyclable',
        time: '1 day ago',
        status: 'completed',
        collector: 'Ama Serwaa',
        rating: 4,
        price: 'GHS 15.00',
      },
    ],
  },
  {
    id: '3',
    date: 'Last Week',
    items: [
      {
        id: '103',
        type: 'E-Waste',
        time: '5 days ago',
        status: 'completed',
        collector: 'Kofi Boateng',
        rating: 5,
        price: 'GHS 45.00',
      },
      {
        id: '104',
        type: 'Organic',
        time: '6 days ago',
        status: 'completed',
        collector: 'Ama Serwaa',
        rating: 4,
        price: 'GHS 18.00',
      },
    ],
  },
];

const HistoryItem = ({ item }) => {
  const getStatusColor = () => {
    switch (item.status) {
      case 'completed':
        return '#10B981'; // Green
      case 'cancelled':
        return '#EF4444'; // Red
      default:
        return '#6B7280'; // Gray
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? 'star' : 'star-outline'}
          size={16}
          color={i <= rating ? '#F59E0B' : '#D1D5DB'}
          style={styles.starIcon}
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.historyItem}>
      <View style={styles.historyItemHeader}>
        <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
        <Text style={styles.historyItemType}>{item.type}</Text>
        <Text style={styles.historyItemTime}>{item.time}</Text>
      </View>
      
      <View style={styles.historyItemBody}>
        <View style={styles.collectorInfo}>
          <Ionicons name="person-circle" size={40} color="#9CA3AF" />
          <View style={styles.collectorDetails}>
            <Text style={styles.collectorName}>Collected by {item.collector}</Text>
            <View style={styles.ratingContainer}>
              {renderStars(item.rating)}
            </View>
          </View>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{item.price}</Text>
        </View>
      </View>
      
      <View style={styles.historyItemFooter}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="repeat" size={16} color="#10B981" />
          <Text style={styles.actionButtonText}>Repeat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.reportButton]}>
          <Ionicons name="alert-circle" size={16} color="#EF4444" />
          <Text style={[styles.actionButtonText, { color: '#EF4444' }]}>Report</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const HistoryScreen = () => {
  const renderSectionHeader = ({ section: { date } }) => (
    <Text style={styles.sectionHeader}>{date}</Text>
  );

  const renderItem = ({ item }) => (
    <HistoryItem item={item} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>History</Text>
        <TouchableOpacity>
          <Ionicons name="filter" size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={historyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.sectionHeader}>{item.date}</Text>
            {item.items.map((historyItem) => (
              <HistoryItem key={historyItem.id} item={historyItem} />
            ))}
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
    marginLeft: 8,
  },
  historyItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  historyItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  historyItemType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  historyItemTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  historyItemBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  collectorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  collectorDetails: {
    marginLeft: 12,
  },
  collectorName: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  starIcon: {
    marginRight: 2,
  },
  priceContainer: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  historyItemFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981',
    marginLeft: 6,
  },
  reportButton: {
    borderColor: '#FEE2E2',
  },
});

export default HistoryScreen;
