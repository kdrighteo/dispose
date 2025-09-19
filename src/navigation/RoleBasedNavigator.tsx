// @ts-ignore
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

// Import screens with type assertions to bypass TypeScript errors
const AdminHomeScreen = require('../screens/admin/AdminHomeScreen').default;
const DispatcherHomeScreen = require('../screens/dispatcher/DispatcherHomeScreen').default;
const SubscriberHomeScreen = require('../screens/subscriber/SubscriberHomeScreen').default;

type RoleBasedNavigatorRouteProp = RouteProp<RootStackParamList, 'RoleBased'>;
type RoleBasedNavigatorNavigationProp = StackNavigationProp<RootStackParamList, 'RoleBased'>;

type Props = {
  route: RoleBasedNavigatorRouteProp;
  navigation: RoleBasedNavigatorNavigationProp;
};

const Stack = createStackNavigator();

const RoleBasedNavigator: React.FC<Props> = ({ route }: Props) => {
  const { userRole } = route.params;
  const getInitialRoute = () => {
    switch (userRole) {
      case 'admin':
        return 'AdminHome';
      case 'dispatcher':
        return 'DispatcherHome';
      case 'subscriber':
      default:
        return 'SubscriberHome';
    }
  };

  return (
    <Stack.Navigator initialRouteName={getInitialRoute()}>
      {userRole === 'admin' && (
        <Stack.Screen 
          name="AdminHome" 
          component={AdminHomeScreen} 
          options={{ title: 'Admin Dashboard' }} 
        />
      )}
      {userRole === 'dispatcher' && (
        <Stack.Screen 
          name="DispatcherHome" 
          component={DispatcherHomeScreen} 
          options={{ title: 'Dispatcher Dashboard' }} 
        />
      )}
      {(userRole === 'subscriber' || !userRole) && (
        <Stack.Screen 
          name="SubscriberHome" 
          component={SubscriberHomeScreen} 
          options={{ title: 'Home' }} 
        />
      )}
    </Stack.Navigator>
  );
};

export default RoleBasedNavigator;
