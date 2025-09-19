import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Animated } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/AppNavigator';

type TrackPickupScreenRouteProp = RouteProp<RootStackParamList, 'TrackPickup'>;

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / 320;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// Mock data - in a real app, this would come from your backend
const MOCK_LOCATIONS = [
  {
    id: 1,
    latitude: 5.6037, // Example coordinates (Accra, Ghana)
    longitude: -0.1870,
    title: 'Your Location',
  },
  {
    id: 2,
    latitude: 5.6137, // Example coordinates (slightly north of Accra)
    longitude: -0.1970,
    title: 'Collector',
  },
];

const TrackPickupScreen = () => {
  const route = useRoute<TrackPickupScreenRouteProp>();
  const { requestId } = route.params;
  
  const [collectorLocation, setCollectorLocation] = useState(MOCK_LOCATIONS[1]);
  const [status, setStatus] = useState('accepted'); // 'accepted', 'in_transit', 'arrived', 'completed'
  const [statusText, setStatusText] = useState('Your request has been accepted');
  const [statusTime, setStatusTime] = useState('Just now');
  const [progress] = useState(new Animated.Value(0));

  // Simulate collector movement
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, you would get the collector's location from your backend
      setCollectorLocation(prev => ({
        ...prev,
        latitude: prev.latitude - 0.001, // Move collector south
        longitude: prev.longitude + 0.001, // Move collector east
      }));

      // Simulate status updates
      const random = Math.random();
      if (random > 0.9) {
        setStatus('in_transit');
        setStatusText('Collector is on the way');
        setStatusTime('1 min ago');
      } else if (random > 0.7) {
        setStatus('arrived');
        setStatusText('Collector has arrived');
        setStatusTime('Just now');
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Animate progress bar
  useEffect(() => {
    let toValue = 0.3;
    if (status === 'in_transit') toValue = 0.7;
    if (status === 'arrived' || status === 'completed') toValue = 1;

    Animated.timing(progress, {
      toValue,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [status]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const getStatusIcon = () => {
    switch (status) {
      case 'in_transit':
        return 'bicycle';
      case 'arrived':
        return 'checkmark-circle';
      case 'completed':
        return 'checkmark-done-circle';
      default:
        return 'time';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: MOCK_LOCATIONS[0].latitude,
            longitude: MOCK_LOCATIONS[0].longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          <Marker
            coordinate={{
              latitude: collectorLocation.latitude,
              longitude: collectorLocation.longitude,
            }}
            title={collectorLocation.title}
          >
            <View style={styles.marker}>
              <Ionicons name="person" size={24} color="#FFFFFF" />
            </View>
          </Marker>
        </MapView>
      </View>

      <View style={styles.statusContainer}>
        <View style={styles.statusHeader}>
          <Text style={styles.requestId}>Request #{requestId}</Text>
          <Text style={styles.eta}>ETA: 15 min</Text>
        </View>

        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
          </View>
          <View style={styles.progressDots}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={[styles.dot, status !== 'accepted' && styles.activeDot]} />
            <View style={[styles.dot, (status === 'arrived' || status === 'completed') && styles.activeDot]} />
            <View style={[styles.dot, status === 'completed' && styles.activeDot]} />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLabel}>Requested</Text>
            <Text style={styles.progressLabel}>In Progress</Text>
            <Text style={styles.progressLabel}>Arrived</Text>
            <Text style={styles.progressLabel}>Completed</Text>
          </View>
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusIconContainer}>
            <Ionicons name={getStatusIcon()} size={24} color="#10B981" />
          </View>
          <View style={styles.statusTextContainer}>
            <Text style={styles.statusTitle}>{statusText}</Text>
            <Text style={styles.statusTime}>{statusTime}</Text>
          </View>
          <TouchableOpacity style={styles.chatButton}>
            <Ionicons name="chatbubble-ellipses" size={20} color="#10B981" />
          </TouchableOpacity>
        </View>

        <View style={styles.collectorInfo}>
          <Image 
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
            style={styles.collectorImage}
          />
          <View style={styles.collectorDetails}>
            <Text style={styles.collectorName}>Kwame Mensah</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#F59E0B" />
              <Text style={styles.ratingText}>4.8 (120 pickups)</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.callButton}>
            <Ionicons name="call" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  mapContainer: {
    height: '50%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    backgroundColor: '#10B981',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  statusContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    padding: 20,
    elevation: 5,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  requestId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  eta: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600',
  },
  progressBarContainer: {
    marginBottom: 24,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10B981',
  },
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
  },
  activeDot: {
    backgroundColor: '#10B981',
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 10,
    color: '#6B7280',
    width: 60,
    textAlign: 'center',
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  statusIconContainer: {
    backgroundColor: '#D1FAE5',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statusTextContainer: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  statusTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  chatButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  collectorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
  },
  collectorImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  collectorDetails: {
    flex: 1,
  },
  collectorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  callButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TrackPickupScreen;
