import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';

type DispatcherDashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DispatcherDashboard'>;

const DispatcherDashboardScreen = () => {
  const navigation = useNavigation<DispatcherDashboardScreenNavigationProp>();

  const upcomingPickups = [
    {
      id: 'PU1001',
      address: '123 Main St, Anytown',
      time: 'In 30 min',
      status: 'Scheduled',
      items: 3,
    },
    {
      id: 'PU1002',
      address: '456 Oak Ave, Somewhere',
      time: '1:30 PM',
      status: 'Upcoming',
      items: 5,
    },
  ];

  const recentActivity = [
    { id: '1', type: 'pickup', status: 'Completed', time: '2 hours ago' },
    { id: '2', type: 'delivery', status: 'In Progress', time: '4 hours ago' },
    { id: '3', type: 'pickup', status: 'Completed', time: 'Yesterday' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.name}>Alex Johnson</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={styles.avatar}
          />
          <View style={styles.statusIndicator} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Today's Pickups</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>This Week</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>94%</Text>
            <Text style={styles.statLabel}>On Time</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Pickups</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {upcomingPickups.map((pickup, index) => (
            <View key={index} style={styles.pickupCard}>
              <View style={styles.pickupInfo}>
                <View style={styles.pickupIcon}>
                  <Ionicons name="cube" size={20} color="#3B82F6" />
                </View>
                <View>
                  <Text style={styles.pickupId}>#{pickup.id}</Text>
                  <Text style={styles.pickupAddress}>{pickup.address}</Text>
                  <View style={styles.pickupMeta}>
                    <Text style={styles.pickupTime}>
                      <Ionicons name="time" size={14} color="#6B7280" /> {pickup.time}
                    </Text>
                    <Text style={styles.pickupItems}>
                      <Ionicons name="cube" size={14} color="#6B7280" /> {pickup.items} items
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.statusBadge, pickup.status === 'Scheduled' ? styles.statusScheduled : styles.statusUpcoming]}>
                <Text style={styles.statusText}>{pickup.status}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
          </View>
          
          {recentActivity.map((activity, index) => (
            <View key={index} style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Ionicons 
                  name={activity.type === 'pickup' ? 'cube' : 'car'} 
                  size={20} 
                  color={activity.status === 'Completed' ? '#10B981' : '#3B82F6'} 
                />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>
                  {activity.type === 'pickup' ? 'Pickup' : 'Delivery'} {activity.status}
                </Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('NewPickup')}
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>
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
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  greeting: {
    fontSize: 14,
    color: '#6B7280',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginTop: 4,
  },
  profileButton: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  seeAll: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '500',
  },
  pickupCard: {
    backgroundColor: '#FFFFFF',
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
  pickupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickupIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pickupId: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  pickupAddress: {
    fontSize: 13,
    color: '#4B5563',
    marginBottom: 4,
  },
  pickupMeta: {
    flexDirection: 'row',
  },
  pickupTime: {
    fontSize: 12,
    color: '#6B7280',
    marginRight: 12,
  },
  pickupItems: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusScheduled: {
    backgroundColor: '#DBEAFE',
  },
  statusUpcoming: {
    backgroundColor: '#FEF3C7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default DispatcherDashboardScreen;
