import { ThemeType } from '../context/ThemeContext';

export interface ThemeColors {
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
  secondaryText: string;
  success: string;
  error: string;
  warning: string;
  info: string;
  divider: string;
  inputBackground: string;
}

export interface ThemeContextType {
  theme: ThemeType;
  colors: ThemeColors;
  toggleTheme: () => void;
  isDark: boolean;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
}
