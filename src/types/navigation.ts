export type RootStackParamList = {
  MainTabs: undefined;
  Login: undefined;
  RequestPickup: undefined;
  TrackPickup: { pickupId: string };
  Settings: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  History: undefined;
  Profile: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
};
