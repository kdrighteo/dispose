import { NavigationContainerProps } from '@react-navigation/native';

declare module '@react-navigation/native' {
  export interface NavigationContainerProps {
    children: React.ReactNode;
    theme?: any;
  }
}
