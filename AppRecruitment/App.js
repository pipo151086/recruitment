import React from 'react';
import SplashScreen from "react-native-splash-screen";
import { View, Text } from 'react-native';
import { LogBox } from 'react-native';
import AppNavigator from "./src/boot/AppNavigator";

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  });
  return (<AppNavigator />);
};

export default App;
