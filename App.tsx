import 'react-native-gesture-handler';
import React from 'react';

// Expo and React Native imports
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View, StyleSheet, LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';

// Context providers
import { ThemeProvider } from './src/context/ThemeContext';
import { AuthProvider, useAuth } from './src/context/AuthContext';

// Navigation
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import type { Theme } from '@react-navigation/native';
import RoleBasedNavigator from './src/navigation/AppNavigator';

// Type for NavigationContainer props
type NavigationContainerProps = React.ComponentProps<typeof NavigationContainer>;

// Ignore specific warnings
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'AsyncStorage has been extracted from react-native core',
]);

// Enable screens for better performance
enableScreens();

// Initialize any required services
// import { initializeApp } from './src/services/firebase';
// initializeApp();

const AppContent: React.FC = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const navTheme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
  };

  const navigationContainerProps: NavigationContainerProps = {
    theme: navTheme,
    children: <RoleBasedNavigator />
  };

  return <NavigationContainer {...navigationContainerProps} />;
};

// Extend ViewProps to include children
interface AppContainerProps {
  children: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider children={
          <AuthProvider children={children} />
        } />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default function App() {
  return (
    <AppContainer>
      <AppContent />
      <StatusBar style="auto" />
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
