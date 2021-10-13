import React, { createContext, useState } from 'react';
export const AppContext = createContext({});
export const { AppConsumer } = AppContext;
import { useColorMode } from 'native-base';

export const AppProvider = ({ children }) => {
    const [globalSession, setGlobalSession] = useState({});
    const [themeApp, setThemeApp] = useState("dark");
    
    const changeTheme = (value) => {
        setThemeApp(value);        
    }

    const appContext = {
        globalSession, setGlobalSession,
        themeApp, setThemeApp,
        changeTheme
    };

    return (
        <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
    );
};
