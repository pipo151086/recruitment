import React from 'react';
import SplashScreen from "react-native-splash-screen";
import { LogBox } from 'react-native';
import AppNavigator from "./src/boot/AppNavigator";
import { AppProvider } from './src/providers';

const App = () => {
  /*React.useEffect(() => {
    SplashScreen.hide();
  });*/
  LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  LogBox.ignoreAllLogs(true);
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
};

export default App;
