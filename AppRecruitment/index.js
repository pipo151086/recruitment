/**
 * @format
 */

import { AppRegistry } from 'react-native';
//import App from './src/boot/AppNavigator';
import App from './App';
//import App from './src/screens/Login/index';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => App);
