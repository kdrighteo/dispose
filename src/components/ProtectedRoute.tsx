import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Redirect, Route, RouteProps } from 'react-router-native';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

type ProtectedRouteProps = {
  allowedRoles: string[];
} & RouteProps;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  ...routeProps
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Redirect to="/unauthorized" />;
  }

  return <Route {...routeProps} />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProtectedRoute;
