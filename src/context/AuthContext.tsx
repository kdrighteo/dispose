// @ts-ignore
import React from 'react';
const { createContext, useContext, useState } = React;
type ReactNode = React.ReactNode;

export type UserRole = 'admin' | 'dispatcher' | 'subscriber';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  joinDate?: string;
  completedPickups?: number;
  rating?: number;
  profileImage?: string;
  // Additional role-specific fields
  companyId?: string; // For dispatchers
  subscriptionPlan?: string; // For subscribers
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual authentication logic
      // For now, just simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on role
      const mockUsers = {
        admin: {
          id: 'admin-1',
          name: 'Admin User',
          email: email,
          role: 'admin' as const,
          phone: '+233 55 000 0001',
          joinDate: 'Admin since June 2023',
          profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
        },
        dispatcher: {
          id: 'dispatch-1',
          name: 'Dispatch Rider',
          email: email,
          role: 'dispatcher' as const,
          phone: '+233 55 000 0002',
          joinDate: 'Dispatcher since June 2023',
          completedPickups: 124,
          rating: 4.7,
          companyId: 'comp-001',
          profileImage: 'https://randomuser.me/api/portraits/women/1.jpg',
        },
        subscriber: {
          id: 'user-1',
          name: 'Subscriber User',
          email: email,
          role: 'subscriber' as const,
          phone: '+233 55 000 0003',
          joinDate: 'Member since June 2023',
          subscriptionPlan: 'premium',
          profileImage: 'https://randomuser.me/api/portraits/men/2.jpg',
        },
      };

      const user = mockUsers[role];
      setUser(user);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual registration logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on role
      const mockUser = {
        id: `new-${role}-${Math.floor(Math.random() * 1000)}`,
        name,
        email,
        role,
        phone: '',
        joinDate: new Date().toLocaleDateString(),
        ...(role === 'dispatcher' && {
          completedPickups: 0,
          rating: 5,
          companyId: `comp-${Math.floor(100 + Math.random() * 900)}`
        }),
        ...(role === 'subscriber' && {
          subscriptionPlan: 'basic'
        })
      };
      
      setUser(mockUser);
      return true;
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
