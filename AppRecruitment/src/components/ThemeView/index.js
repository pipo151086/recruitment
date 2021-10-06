import React from 'react';
import { View } from 'react-native'
import {
    Center,
} from 'native-base';

const ThemeView = ({ children }) => {

    return (<Center
        _dark={{ bg: 'blueGray.900' }}
        _light={{ bg: 'blueGray.50' }}
        px={4}
        flex={1}
    >
        <View style={{ width: "100%" }}>
            {children}
        </View>
    </Center >)
}
export default ThemeView;