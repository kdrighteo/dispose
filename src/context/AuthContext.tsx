import React, { createContext, useContext, useState, ReactNode } from 'react';

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  joinDate?: string;
  completedPickups?: number;
  rating?: number;
  profileImage?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual authentication logic
      // For now, just simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data with all required properties
      setUser({
        id: '1',
        name: 'Kwame Asare',
        email: email,
        phone: '+233 55 123 4567',
        joinDate: 'Member since June 2023',
        completedPickups: 12,
        rating: 4.8,
        profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
      });
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual registration logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Auto-login after registration
      return await login(email, password);
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // TODO: Implement actual logout logic
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
