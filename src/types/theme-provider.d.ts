import React from 'react';

declare module '../context/ThemeContext' {
  export interface ThemeProviderProps {
    children: React.ReactNode;
  }
  
  export const ThemeProvider: React.FC<ThemeProviderProps>;
}
