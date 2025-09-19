import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

type LoadingOverlayProps = {
  size?: 'small' | 'large';
  color?: string;
};

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  size = 'large',
  color = '#3B82F6',
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});

export default LoadingOverlay;
