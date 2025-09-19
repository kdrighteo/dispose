// @ts-ignore
import React from 'react';
const { useState } = React;
import { View, StyleSheet, TextInput, TouchableOpacity, Text, ActivityIndicator, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useAuth, UserRole } from '../context/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { Ionicons } from '@expo/vector-icons';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

type RoleOption = {
  id: UserRole;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const roleOptions: RoleOption[] = [
  {
    id: 'subscriber',
    title: 'Subscriber',
    description: 'Request waste pickup services',
    icon: 'person-outline'
  },
  {
    id: 'dispatcher',
    title: 'Dispatcher',
    description: 'Manage pickup requests',
    icon: 'bicycle-outline'
  },
  {
    id: 'admin',
    title: 'Administrator',
    description: 'Manage system and users',
    icon: 'shield-outline'
  }
];

const LoginScreen: React.FC<Props> = ({ navigation }: { navigation: LoginScreenNavigationProp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('subscriber');
  
  const { login, register, isLoading } = useAuth();
  const { colors } = useTheme();

  const handleAuth = async () => {
    if (isRegistering) {
      // For now, we'll use the selected role for registration
      // In a real app, you'd handle registration differently
      await register(email, password, name, selectedRole);
    } else {
      await login(email, password, selectedRole);
    }
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={[styles.formContainer, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.text }]}>
          {isRegistering ? 'Create Account' : 'Welcome Back'}
        </Text>
        
        {isRegistering && (
          <TextInput
            style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
            placeholder="Full Name"
            placeholderTextColor={colors.secondaryText}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        )}
        
        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
          placeholder="Email"
          placeholderTextColor={colors.secondaryText}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
          placeholder="Password"
          placeholderTextColor={colors.secondaryText}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <View style={styles.roleContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {isRegistering ? 'I am a...' : 'Sign in as...'}
          </Text>
          <View style={styles.roleOptions}>
            {roleOptions.map((role) => (
              <TouchableOpacity
                key={role.id}
                style={[
                  styles.roleOption,
                  selectedRole === role.id && { 
                    borderColor: colors.primary,
                    backgroundColor: `${colors.primary}20`
                  }
                ]}
                onPress={() => setSelectedRole(role.id)}
              >
                <Ionicons 
                  name={role.icon} 
                  size={24} 
                  color={selectedRole === role.id ? colors.primary : colors.text} 
                />
                <View style={styles.roleTextContainer}>
                  <Text style={[styles.roleTitle, { color: colors.text }]}>
                    {role.title}
                  </Text>
                  <Text style={[styles.roleDescription, { color: colors.secondaryText }]}>
                    {role.description}
                  </Text>
                </View>
                {selectedRole === role.id && (
                  <View style={[styles.roleSelected, { backgroundColor: colors.primary }]}>
                    <Ionicons name="checkmark" size={16} color="white" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleAuth}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {isRegistering ? 'Sign Up' : 'Sign In'}
            </Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => setIsRegistering(!isRegistering)}
          style={styles.toggleButton}
        >
          <Text style={[styles.toggleText, { color: colors.primary }]}>
            {isRegistering 
              ? 'Already have an account? Sign In' 
              : "Don't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    justifyContent: 'center',
    flexGrow: 1,
  },
  formContainer: {
    padding: 20,
    borderRadius: 10,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  roleContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  roleOptions: {
    gap: 10,
  },
  roleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  roleTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  roleDescription: {
    fontSize: 12,
  },
  roleSelected: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default LoginScreen;
