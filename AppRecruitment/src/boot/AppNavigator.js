import React, { useRef, useState, useEffect, useContext } from 'react';

import {
    View, ActivityIndicator, StyleSheet, ImageBackground, AppState, Text
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SplashScreen from 'react-native-splash-screen';

//Screens

import Login from "../screens/Login";

import DeviceList from "../screens/DeviceList";
import DeviceDetail from "../screens/DeviceDetail"


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const initialViewNoSesion = "Login";
const initialViewWithSesion = "DeviceList";


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

const AppBusinessStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={initialViewWithSesion}
            //initialRouteName={initialViewNoSesion}
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name={initialViewWithSesion} component={DeviceList} />
            <Stack.Screen name={initialViewNoSesion} component={Login} />
            <Stack.Screen name={"DeviceDetail"} component={DeviceDetail} />

        </Stack.Navigator>
    );
};

const AppDrawer = ({ props, style, initialView }) => {

    return (<Drawer.Navigator
        hideStatusBar
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
        <Drawer.Screen name="App Recruitment">
            {props => (
                <AppBusinessStack
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


import { AppContext } from '../providers/index';
import { getInsertContext } from '../database/common/handler';

const getSessionFromDB = async () => {
    try {
        let globalContext = await getInsertContext();
        if (globalContext) {
            let context = JSON.parse(globalContext.context);
            return {
                ...context,
                theme: globalContext.theme,
                lastTimeAccessed: globalContext.lastTimeAccessed,
            };
        }
        return undefined;
    } catch (err) {
        console.error(err)
    }
}
import { NativeBaseProvider, extendTheme, useColorMode, useTheme } from 'native-base';

const AppNavigator = () => {
    const { globalSession, setGlobalSession, themeApp, setThemeApp } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true);
    const { colorMode, toggleColorMode } = useColorMode();
    const [colorModeManager, setColorModeManager] = useState({});

    const config = {
        useSystemColorMode: false,
        initialColorMode: themeApp,
    };
    const customTheme = extendTheme({ config });

    const SessionValidation = async () => {
        let context = await getSessionFromDB();
        await setGlobalSession(context);

        if (context && context.session) {
            setThemeApp(context.theme);

        } else {

        }

        //console.log("Entre " , globalSession);
        SplashScreen.hide();
        setIsLoading(false);
    };

    React.useEffect(() => {
        SessionValidation();
    }, []);

    if (!isLoading)
        return (
            <NativeBaseProvider theme={customTheme} >
                <NavigationContainer>
                    {globalSession && globalSession.session ?
                        AppDrawer(true, () => { }, initialViewNoSesion)
                        :
                        AppLoginStack()
                    }
                </NavigationContainer>
            </NativeBaseProvider>
        )


    return (<></>)
}

export default AppNavigator;