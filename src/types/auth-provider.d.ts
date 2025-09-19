import React from 'react';

declare module '../context/AuthContext' {
  export interface AuthProviderProps {
    children: React.ReactNode;
  }
  
  export const AuthProvider: React.FC<AuthProviderProps>;
}
