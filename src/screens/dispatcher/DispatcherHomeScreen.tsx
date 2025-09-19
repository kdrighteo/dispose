import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const DispatcherHomeScreen = () => {
  const { user } = useAuth();

  // Mock data for pickup requests
  const pickupRequests = [
    { id: 'REQ001', address: '123 Main St', time: '10:30 AM', status: 'pending' },
    { id: 'REQ002', address: '456 Oak Ave', time: '11:15 AM', status: 'in-progress' },
    { id: 'REQ003', address: '789 Pine St', time: '1:45 PM', status: 'pending' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#F59E0B'; // Yellow
      case 'in-progress':
        return '#3B82F6'; // Blue
      case 'completed':
        return '#10B981'; // Green
      default:
        return '#9CA3AF'; // Gray
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Welcome back,</Text>
          <Text style={styles.name}>{user?.name || 'Dispatcher'}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={20} color="#F59E0B" />
          <Text style={styles.ratingText}>{user?.rating || '5.0'}</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Today's Pickups</Text>
        
        {pickupRequests.map((request) => (
          <View key={request.id} style={styles.requestCard}>
            <View style={styles.requestInfo}>
              <Text style={styles.requestId}>#{request.id}</Text>
              <Text style={styles.requestAddress}>{request.address}</Text>
              <Text style={styles.requestTime}>
                <Ionicons name="time-outline" size={14} color="#6B7280" /> {request.time}
              </Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(request.status) }]}>
              <Text style={styles.statusText}>
                {request.status === 'in-progress' ? 'In Progress' : request.status}
              </Text>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.newPickupButton}>
          <Ionicons name="add-circle" size={24} color="white" />
          <Text style={styles.newPickupButtonText}>New Pickup</Text>
        </TouchableOpacity>
      </ScrollView>
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
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  welcome: {
    fontSize: 16,
    color: '#6B7280',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: '600',
    color: '#92400E',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#111827',
  },
  requestCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  requestInfo: {
    flex: 1,
  },
  requestId: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  requestAddress: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  requestTime: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  newPickupButton: {
    flexDirection: 'row',
    backgroundColor: '#10B981',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  newPickupButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
});

export default DispatcherHomeScreen;
