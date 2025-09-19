import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { useAuth, UserRole } from '../context/AuthContext';
import { RootStackParamList, MainTabParamList } from '../types/navigation';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RequestPickupScreen from '../screens/RequestPickupScreen';
import TrackPickupScreen from '../screens/TrackPickupScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/LoginScreen';
import UnauthorizedScreen from '../screens/UnauthorizedScreen';

// Import role-based screens
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import DispatcherDashboardScreen from '../screens/dispatcher/DispatcherDashboardScreen';
import SubscriberDashboardScreen from '../screens/subscriber/SubscriberDashboardScreen';

// Import components
import LoadingOverlay from '../components/LoadingOverlay';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Role-based navigator component
const RoleBasedNavigator = () => {
  const { user } = useAuth();
  
  // Determine the initial route based on user role
  const getInitialRoute = () => {
    if (!user) return 'Login';
    
    switch (user.role) {
      case 'admin':
        return 'AdminDashboard';
      case 'dispatcher':
        return 'DispatcherDashboard';
      case 'subscriber':
      default:
        return 'SubscriberDashboard';
    }
  };
  
  return (
    <Stack.Navigator initialRouteName={getInitialRoute()}>
      {/* Auth Stack */}
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }}
      />
      
      {/* Admin Stack */}
      <Stack.Screen 
        name="AdminDashboard" 
        component={AdminDashboardScreen}
        options={{ title: 'Admin Dashboard' }}
      />
      
      {/* Dispatcher Stack */}
      <Stack.Screen 
        name="DispatcherDashboard" 
        component={DispatcherDashboardScreen}
        options={{ title: 'Dispatcher Dashboard' }}
      />
      
      {/* Subscriber Stack */}
      <Stack.Screen 
        name="SubscriberDashboard" 
        component={SubscriberDashboardScreen}
        options={{ title: 'My Dashboard' }}
      />
      
      {/* Common Screens */}
      <Stack.Screen 
        name="Unauthorized" 
        component={UnauthorizedScreen}
        options={{ title: 'Access Denied' }}
      />
    </Stack.Navigator>
  );
};

// Main Tabs Navigator (for authenticated users)
const MainTabs = () => {
  const { colors } = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ 
          focused, 
          color, 
          size 
        }: { 
          focused: boolean; 
          color: string; 
          size: number 
        }) => {
          let iconName: string = 'home';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'time' : 'time-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondaryText,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },
        headerStyle: {
          backgroundColor: colors.card,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          title: 'Home',
          headerShown: false,
        }} 
      />
      <Tab.Screen 
        name="History" 
        component={HistoryScreen} 
        options={{ 
          title: 'History',
          headerShown: true,
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ 
          title: 'Profile',
          headerShown: true,
        }} 
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { colors } = useTheme();
  const { user } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      {user ? (
        // User is logged in - show role-based navigation
        <>
          <Stack.Screen 
            name="RoleBased" 
            component={RoleBasedNavigator}
            initialParams={{ userRole: user.role }}
          />
          <Stack.Screen 
            name="RequestPickup" 
            component={RequestPickupScreen} 
            options={{ 
              headerShown: true, 
              title: 'Request Pickup',
              headerStyle: {
                backgroundColor: colors.card,
              },
              headerTintColor: colors.text,
            }}
          />
          <Stack.Screen 
            name="TrackPickup" 
            component={TrackPickupScreen}
            options={{ 
              headerShown: true, 
              title: 'Track Pickup',
              headerStyle: {
                backgroundColor: colors.card,
              },
              headerTintColor: colors.text,
            }}
          />
          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{ 
              headerShown: true, 
              title: 'Settings',
              headerStyle: {
                backgroundColor: colors.card,
              },
              headerTintColor: colors.text,
            }}
          />
        </>
      ) : (
        // User is not logged in - show auth screens
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ 
            headerShown: false,
            animationTypeForReplace: 'pop'
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
