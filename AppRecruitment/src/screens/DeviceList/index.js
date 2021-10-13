import React, { useState } from 'react';
import { View, FlatList, Animated, Image } from 'react-native';
import { Text, CheckIcon, CloseIcon, Input, Button } from 'native-base';
import { GetAll } from '../../comunication/devices';
import { useFocusEffect } from '@react-navigation/native';
import { ProgressChart } from "react-native-chart-kit";
import DeviceItem from './DeviceItem';
import Icon from 'react-native-vector-icons/FontAwesome5';


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

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Animated.FlatList
          data={filteredDevices}
          keyStractor={item => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          //contentContainerStyle={{backgroundColor: "green"}}
          renderItem={({ item, index }) => DeviceItem({ item, index, scrollY })
          }
        />
      </View>

      <View style={{
        width: '100%', position: "absolute", bottom: 50,
        justifyContent: 'center', alignItems: 'center'
      }}>
        <View style={{
          backgroundColor: 'white', width: '90%', flexDirection: 'row', borderRadius: 50, overflow: 'hidden'
        }}>
          <Input variant="rounded" size="md" placeholder="Filter" style={{ width: '100%', color: '#000' }}

          />
          <Button
            style={{
              flex: 1, position: "absolute", right: 0, width: '15%', height: '100%'
            }}
            leftIcon={
              <Icon
                name={"filter"}
                size={20}
                color={'#fff'}
              />
            }
          />
        </View>
      </View>
    </>
  )
}

export default DeviceList;