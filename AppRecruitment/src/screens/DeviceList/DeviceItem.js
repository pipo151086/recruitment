import React from 'react';
import { View, Animated } from 'react-native';
import { Text } from 'native-base';
import DeviceStatusIcon from '../../components/DeviceStatusIcon'

const DeviceItem = ({ item, index, scrollY }) => {
    const ITEM_SIZE = 150 + 30; // 30 Padding + margin
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
        inputRange: opacityInputRange,
        outputRange: [1, 1, 1, 0]
    })


    return (
        <Animated.View style={{
            flexDirection: 'row',
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
            
            <View style={{ width: 100 }}>
                <DeviceStatusIcon
                    item={item}
                    gaugeWidthHeight={100}
                    imageWidthHeight={55}
                />
            </View>

            <View style={{ flex: 1 }}>
                {/*<Text style={{ color: '#000' }}>{item.id}</Text>*/}
                <Text style={{ color: '#000' }}>Status:
                    <Text style={{ color: item.connected ? 'green' : 'red' }}>{item.connected ? `  Online` : `  Offline`}</Text>
                </Text>
                <Text style={{ color: '#000' }}>{`Parent location:  ${item.parentLocation}`}</Text>
                <Text style={{ color: '#000' }}>{`Location:  ${item.location}`}</Text>
                <Text style={{ color: '#000' }}>{`Mac:  ${item.macAddress}`}</Text>
                <Text style={{ color: '#000' }}>{`Signal:  ${item.signal}`}</Text>
                <Text style={{ color: '#000' }}>{`Last Update:  ${item.updatedAt}`}</Text>
            </View>

        </Animated.View>
    )

}

export default DeviceItem;