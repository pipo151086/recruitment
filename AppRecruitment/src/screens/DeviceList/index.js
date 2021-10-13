import React, { useState } from 'react';
import { View, FlatList, Animated } from 'react-native'
import {
  Text,
  HStack,
  Switch,
  useColorMode,
  Center,
  MoonIcon,
  SunIcon,
} from 'native-base';
import { GetAll } from '../../comunication/devices'

import { useFocusEffect } from '@react-navigation/native';


const DeviceList = () => {
  const [devices, setDevices] = useState([])
  const [filteredDevices, setFilteredDevices] = useState([])


  useFocusEffect(
    React.useCallback(() => {
      const fetchDevices = async () => {
        let result = await GetAll();
        setDevices(result);
        setFilteredDevices(result);
        console.log(result[0])
      }
      fetchDevices();
    }, [])
  );


  const scrollY = React.useRef(new Animated.Value(0)).current
  const ITEM_SIZE = 150 + 30; // 30 Padding + margin

  return (<View style={{ flex: 1, backgroundColor: "#fff" }}>

    <Animated.FlatList
      data={filteredDevices}
      keyStractor={item => item.id}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      contentContainerStyle={{
        //backgroundColor: "green"
      }}
      renderItem={({ item, index }) => {
        const inputRange = [
          -1,
          0,
          ITEM_SIZE * index,
          ITEM_SIZE * (index + 2)
        ];
        const opacityInputRange = [
          -1,
          0,
          ITEM_SIZE * index,
          ITEM_SIZE * (index + 0.5)
        ];
        const scale = scrollY.interpolate({
          inputRange,
          outputRange: [1, 1, 1, 0]
        })
        const opacity = scrollY.interpolate({
          inputRange:opacityInputRange,
          outputRange: [1, 1, 1, 0]
        })
        return (
          <Animated.View style={{
            height: 150,
            margin: 15, borderRadius: 25, padding: 15, backgroundColor: 'rgba(255,255,255,1)',
            shadowColor: "black",
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 14,
            opacity,
            transform: [{ scale }]
          }}>
            <Text>{item.id}</Text>
            <Text>{item.connected.toString()}</Text>
            <Text>{item.location}</Text>
            <Text>{item.macAddress}</Text>
            <Text>{item.signal}</Text>
            <Text>{item.updatedAt}</Text>
          </Animated.View>
        )
      }}
    ></Animated.FlatList>

  </View>
  )
}

export default DeviceList;