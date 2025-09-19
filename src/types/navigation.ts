import { UserRole } from '../context/AuthContext';

export type RootStackParamList = {
  // Auth
  Login: undefined;
  
  // Role-based navigation
  RoleBased: { 
    screen?: string;
    userRole: UserRole;
  };
  
  // Main app screens
  MainTabs: undefined;
  RequestPickup: undefined;
  TrackPickup: { pickupId: string };
  Settings: undefined;
  
  // Role-specific screens
  AdminHome: undefined;
  DispatcherHome: undefined;
  SubscriberHome: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  History: undefined;
  Profile: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
};
