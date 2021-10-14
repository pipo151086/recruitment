import React from 'react';
import { View, Animated, TouchableHighlight } from 'react-native';
import { Text } from 'native-base';
import DeviceStatusIcon from '../../components/DeviceStatusIcon'
import moment from 'moment';
import localizationEn from '../../localization/localization-en';

const DeviceItem = ({ item, index, scrollY, visibleDetail, setVisibleDetail, setClickedItem }) => {
    const dateShow = item.updatedAt ? moment(new Date(item.updatedAt)).format('MM-DD-YYYY HH:mm') : "N/A";
    const CONT_SIZE = 125;
    const ITEM_SIZE = CONT_SIZE + 30; // 30 Padding + margin
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
        <TouchableHighlight

            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => {
                setClickedItem({ ...item, dateShow: dateShow });
                setVisibleDetail(true);
            }}
        >
            <Animated.View style={{
                flexDirection: 'row',
                height: CONT_SIZE,
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

                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ color: '#000' }}>Status:
                        <Text style={{ color: item.connected ? 'green' : 'red' }}>{item.connected ? localizationEn["Device.lbl.Online"] : localizationEn["Device.lbl.Offline"]}</Text>
                    </Text>
                    <Text style={{ color: '#000' }}>{`${localizationEn["Device.lbl.ParentLocation"]}  ${item.parentLocation}`}</Text>
                    <Text style={{ color: '#000' }}>{`${localizationEn["Device.lbl.Location"]}  ${item.location}`}</Text>
                    <Text style={{ color: '#000' }}>{`${localizationEn["Device.lbl.Signal"]}  ${item.signal}`}</Text>
                    <Text style={{ color: '#000' }}>{`${localizationEn["Device.lbl.LastUpdate"]}  ${dateShow}`}</Text>

                </View>

            </Animated.View>

        </TouchableHighlight>
    )

}

export default DeviceItem;