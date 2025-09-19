import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types/navigation';

type RequestPickupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'RequestPickup'>;

const wasteTypes = [
  { id: 'general', name: 'General Waste', icon: 'trash-outline' },
  { id: 'recyclable', name: 'Recyclable', icon: 'reload-outline' },
  { id: 'hazardous', name: 'Hazardous', icon: 'warning-outline' },
  { id: 'e-waste', name: 'E-Waste', icon: 'phone-portrait-outline' },
  { id: 'organic', name: 'Organic', icon: 'leaf-outline' },
];

const RequestPickupScreen = () => {
  const navigation = useNavigation<RequestPickupScreenNavigationProp>();
  const [selectedWasteType, setSelectedWasteType] = useState<string | null>(null);
  const [pickupDate, setPickupDate] = useState<string>('');
  const [pickupTime, setPickupTime] = useState<string>('');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    if (!selectedWasteType) {
      Alert.alert('Error', 'Please select a waste type');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('TrackPickup', { pickupId: 'REQ' + Math.floor(100000 + Math.random() * 900000) });
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Select Waste Type</Text>
        <View style={styles.wasteTypeContainer}>
          {wasteTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.wasteTypeButton,
                selectedWasteType === type.id && styles.selectedWasteType,
              ]}
              onPress={() => setSelectedWasteType(type.id)}
            >
              <Ionicons 
                name={type.icon as any} 
                size={24} 
                color={selectedWasteType === type.id ? '#10B981' : '#6B7280'} 
              />
              <Text 
                style={[
                  styles.wasteTypeText,
                  selectedWasteType === type.id && styles.selectedWasteTypeText,
                ]}
              >
                {type.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Pickup Details</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Pickup Date</Text>
          <TextInput
            style={styles.input}
            placeholder="Select date"
            value={pickupDate}
            onChangeText={setPickupDate}
            onFocus={() => {
              // In a real app, you would show a date picker here
              setPickupDate(new Date().toISOString().split('T')[0]);
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Pickup Time</Text>
          <TextInput
            style={styles.input}
            placeholder="Select time"
            value={pickupTime}
            onChangeText={setPickupTime}
            onFocus={() => {
              // In a real app, you would show a time picker here
              const now = new Date();
              setPickupTime(`${now.getHours()}:${now.getMinutes()}`);
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Special Instructions (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Any special instructions for the collector"
            value={specialInstructions}
            onChangeText={setSpecialInstructions}
            multiline
            numberOfLines={3}
          />
        </View>

        <TouchableOpacity 
          style={[styles.submitButton, isLoading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <Text style={styles.submitButtonText}>Processing...</Text>
          ) : (
            <Text style={styles.submitButtonText}>Request Pickup</Text>
          )}
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
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
    marginBottom: 12,
  },
  wasteTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  wasteTypeButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedWasteType: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  wasteTypeText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#6B7280',
  },
  selectedWasteTypeText: {
    color: '#10B981',
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: '#111827',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#10B981',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  disabledButton: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RequestPickupScreen;
