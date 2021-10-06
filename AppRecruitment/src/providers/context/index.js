import React, { createContext, useState } from 'react';
export const AppContext = createContext({});
export const { AppConsumer } = AppContext;


export const AppProvider = ({ children }) => {
    const [globalSession, setGlobalSession] = useState({});

    const appContext = {
        globalSession,
        setGlobalSession,
    };

    return (
        <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
    );
};
