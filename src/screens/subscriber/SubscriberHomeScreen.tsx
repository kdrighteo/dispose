// @ts-ignore
import * as React from 'react';
const { useState } = React;
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const SubscriberHomeScreen = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');

  // Mock data for pickup schedules
  const upcomingPickups = [
    { id: 'PICK001', date: 'Tomorrow', time: '9:00 AM - 11:00 AM', type: 'Regular' },
    { id: 'PICK002', date: 'Friday, Sep 22', time: '2:00 PM - 4:00 PM', type: 'Bulk' },
  ];

  const pastPickups = [
    { id: 'PICK000', date: 'Sep 15, 2023', time: '9:00 AM', status: 'Completed', rating: 5 },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.name?.split(' ')[0] || 'there'}!</Text>
          <Text style={styles.subtitle}>Your waste management made simple</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={32} color="#4B5563" />
        </TouchableOpacity>
      </View>

      {/* Subscription Status */}
      <View style={styles.subscriptionCard}>
        <View style={styles.subscriptionHeader}>
          <Ionicons name="shield-checkmark" size={24} color="#10B981" />
          <Text style={styles.subscriptionTitle}>Active Subscription</Text>
        </View>
        <Text style={styles.planName}>{user?.subscriptionPlan ? `${user.subscriptionPlan.charAt(0).toUpperCase() + user.subscriptionPlan.slice(1)} Plan` : 'Basic Plan'}</Text>
        <View style={styles.pickupInfo}>
          <View style={styles.pickupItem}>
            <Ionicons name="calendar" size={20} color="#6B7280" />
            <Text style={styles.pickupText}>Next pickup in 2 days</Text>
          </View>
          <View style={styles.pickupItem}>
            <Ionicons name="trash" size={20} color="#6B7280" />
            <Text style={styles.pickupText}>2 bags remaining this week</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.scheduleButton}>
          <Text style={styles.scheduleButtonText}>Schedule Pickup</Text>
          <Ionicons name="arrow-forward" size={16} color="white" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>History</Text>
        </TouchableOpacity>
      </View>

      {/* Pickup List */}
      <ScrollView style={styles.pickupList}>
        {activeTab === 'upcoming' ? (
          upcomingPickups.length > 0 ? (
            upcomingPickups.map((pickup) => (
              <View key={pickup.id} style={styles.pickupCard}>
                <View style={styles.pickupDateContainer}>
                  <Text style={styles.pickupDay}>{pickup.date.split(',')[0]}</Text>
                  <Text style={styles.pickupDate}>{pickup.date.split(', ')[1] || ''}</Text>
                </View>
                <View style={styles.pickupDetails}>
                  <Text style={styles.pickupTime}>{pickup.time}</Text>
                  <Text style={styles.pickupType}>{pickup.type} Pickup</Text>
                </View>
                <TouchableOpacity style={styles.moreButton}>
                  <Ionicons name="ellipsis-vertical" size={20} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={48} color="#D1D5DB" />
              <Text style={styles.emptyStateText}>No upcoming pickups</Text>
              <Text style={styles.emptyStateSubtext}>Schedule your first pickup to get started</Text>
            </View>
          )
        ) : (
          pastPickups.map((pickup) => (
            <View key={pickup.id} style={styles.pickupCard}>
              <View style={styles.pickupDateContainer}>
                <Text style={styles.pickupDay}>{pickup.date.split(' ')[0]}</Text>
                <Text style={styles.pickupDate}>{pickup.date.split(' ').slice(1).join(' ')}</Text>
              </View>
              <View style={styles.pickupDetails}>
                <Text style={styles.pickupTime}>{pickup.time}</Text>
                <View style={styles.ratingContainer}>
                  {[...Array(5)].map((_, i) => (
                    <Ionicons 
                      key={i} 
                      name={i < pickup.rating ? 'star' : 'star-outline'} 
                      size={16} 
                      color="#F59E0B" 
                    />
                  ))}
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: '#10B981' }]}>
                <Text style={styles.statusText}>{pickup.status}</Text>
              </View>
            </View>
          ))
        )}
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
    paddingTop: 50,
    backgroundColor: 'white',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscriptionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    margin: 16,
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  subscriptionTitle: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  planName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  pickupInfo: {
    marginBottom: 20,
  },
  pickupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  pickupText: {
    marginLeft: 8,
    color: '#4B5563',
    fontSize: 14,
  },
  scheduleButton: {
    flexDirection: 'row',
    backgroundColor: '#10B981',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scheduleButtonText: {
    color: 'white',
    fontWeight: '600',
    marginRight: 8,
  },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    paddingBottom: 12,
    marginRight: 24,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#10B981',
  },
  tabText: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#10B981',
    fontWeight: '600',
  },
  pickupList: {
    flex: 1,
    padding: 16,
  },
  pickupCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  pickupDateContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  pickupDay: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  pickupDate: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  pickupDetails: {
    flex: 1,
  },
  pickupTime: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  pickupType: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  moreButton: {
    padding: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  emptyStateSubtext: {
    marginTop: 4,
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default SubscriberHomeScreen;
