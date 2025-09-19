import { ViewStyle } from 'react-native';

declare module 'react-native-gesture-handler' {
  export interface GestureHandlerRootViewProps {
    children?: React.ReactNode;
    style?: ViewStyle;
  }
  
  export const GestureHandlerRootView: React.FC<GestureHandlerRootViewProps>;
}
