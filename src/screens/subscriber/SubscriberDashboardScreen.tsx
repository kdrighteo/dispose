import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';

type SubscriberDashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SubscriberDashboard'>;

const SubscriberDashboardScreen = () => {
  const navigation = useNavigation<SubscriberDashboardScreenNavigationProp>();

  const upcomingPickup = {
    id: 'PU1001',
    date: 'Tomorrow, 10:00 AM - 12:00 PM',
    address: '123 Main St, Anytown, CA 12345',
    status: 'Scheduled',
    items: [
      { id: 1, name: 'Paper', quantity: 2, unit: 'bags' },
      { id: 2, name: 'Plastic', quantity: 1, unit: 'bin' },
      { id: 3, name: 'Glass', quantity: 1, unit: 'box' },
    ],
  };

  const quickActions = [
    { title: 'Schedule Pickup', icon: 'calendar', screen: 'SchedulePickup' },
    { title: 'Track Pickup', icon: 'navigate', screen: 'TrackPickup' },
    { title: 'History', icon: 'time', screen: 'History' },
    { title: 'My Rewards', icon: 'trophy', screen: 'Rewards' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.name}>Sarah Johnson</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Rewards Card */}
        <View style={styles.rewardsCard}>
          <View style={styles.rewardsContent}>
            <View style={styles.rewardsIcon}>
              <Ionicons name="trophy" size={24} color="#F59E0B" />
            </View>
            <View>
              <Text style={styles.rewardsTitle}>Eco Warrior</Text>
              <Text style={styles.rewardsPoints}>1,250 points</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.rewardsButton}>
            <Text style={styles.rewardsButtonText}>Redeem</Text>
          </TouchableOpacity>
        </View>

        {/* Next Pickup */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Next Pickup</Text>
          <View style={styles.pickupCard}>
            <View style={styles.pickupHeader}>
              <Text style={styles.pickupId}>#{upcomingPickup.id}</Text>
              <View style={[styles.statusBadge, styles.statusScheduled]}>
                <Text style={styles.statusText}>{upcomingPickup.status}</Text>
              </View>
            </View>
            <Text style={styles.pickupDate}>{upcomingPickup.date}</Text>
            <Text style={styles.pickupAddress}>
              <Ionicons name="location" size={16} color="#6B7280" /> {upcomingPickup.address}
            </Text>
            
            <View style={styles.itemsContainer}>
              {upcomingPickup.items.map((item) => (
                <View key={item.id} style={styles.itemTag}>
                  <Text style={styles.itemText}>
                    {item.quantity} {item.unit} {item.name}
                  </Text>
                </View>
              ))}
            </View>
            
            <View style={styles.pickupActions}>
              <TouchableOpacity style={styles.secondaryButton}>
                <Ionicons name="chatbubble" size={16} color="#3B82F6" />
                <Text style={styles.secondaryButtonText}>Message</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.primaryButton}>
                <Ionicons name="navigate" size={16} color="#FFFFFF" />
                <Text style={styles.primaryButtonText}>Track</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            {quickActions.map((action, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.actionButton}
                onPress={() => navigation.navigate(action.screen as any)}
              >
                <View style={styles.actionIcon}>
                  <Ionicons name={action.icon} size={24} color="#3B82F6" />
                </View>
                <Text style={styles.actionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Environmental Impact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Impact</Text>
          <View style={styles.impactCard}>
            <View style={styles.impactStat}>
              <Text style={styles.impactValue}>42</Text>
              <Text style={styles.impactLabel}>Pickups</Text>
            </View>
            <View style={styles.impactStat}>
              <Text style={styles.impactValue}>126</Text>
              <Text style={styles.impactLabel}>Kgs Recycled</Text>
            </View>
            <View style={styles.impactStat}>
              <Text style={styles.impactValue}>84</Text>
              <Text style={styles.impactLabel}>CO2 Saved</Text>
            </View>
          </View>
        </View>
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
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  rewardsCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rewardsTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  rewardsPoints: {
    color: '#F59E0B',
    fontSize: 14,
    fontWeight: '500',
  },
  rewardsButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  rewardsButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  pickupCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pickupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  pickupId: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusScheduled: {
    backgroundColor: '#DBEAFE',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1E40AF',
  },
  pickupDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  pickupAddress: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  itemTag: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 12,
    color: '#4B5563',
  },
  pickupActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    flex: 1,
    marginRight: 12,
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#3B82F6',
    fontWeight: '500',
    marginLeft: 8,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    marginLeft: 8,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    textAlign: 'center',
  },
  impactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  impactStat: {
    alignItems: 'center',
  },
  impactValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  impactLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
});

export default SubscriberDashboardScreen;
