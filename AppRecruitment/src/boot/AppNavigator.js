import React, { useRef, useState, useEffect, useContext } from 'react';

import {
    View, ActivityIndicator, StyleSheet, ImageBackground, AppState, Text
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SplashScreen from 'react-native-splash-screen';
import { NativeBaseProvider, extendTheme } from 'native-base';
//Screens

import Login from "../screens/Login";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const initialViewNoSesion = "Login";


const AppLoginStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={initialViewNoSesion}
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name={initialViewNoSesion} component={Login} />
        </Stack.Navigator>
    );
};







const AppDrawer = ({ props, style, initialView }) => {

    return (<Drawer.Navigator
        //hideStatusBar
        drawerType="slide"
        //overlayColor="transparent"
        //drawerStyle={styles.drawerStyles}
        contentContainerStyle={{ flex: 1 }}
        /*drawerContentOptions={{
            activeBackgroundColor: 'transparent',
            activeTintColor: 'white',
            inactiveTintColor: 'white',
        }}*/
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
    /*drawerContent={props => {
      //setProgress(props.progress);
      return <Sidebar {...props} />;
    }}*/
    >
        <Drawer.Screen name="AppRecruitment">
            {props => (
                <AppLoginStack
                    {...{
                        props: props,
                        //style: animatedStyle,
                        initialView: initialView,
                    }}
                />
            )}
        </Drawer.Screen>
    </Drawer.Navigator>)
}



const AppNavigator = () => {


    const config = {
        useSystemColorMode: false,
        initialColorMode: 'dark',
    };

    const customTheme = extendTheme({ config });
    React.useEffect(() => {
        SplashScreen.hide();
    });


    return (
        <NativeBaseProvider theme={customTheme}>
            <NavigationContainer>
                {
                    //AppDrawer(progress, setProgress, initialView)
                    AppDrawer(true, () => { }, initialViewNoSesion)
                    //AppLoginStack()
                }
            </NavigationContainer>
        </NativeBaseProvider>
    )
}

export default AppNavigator;