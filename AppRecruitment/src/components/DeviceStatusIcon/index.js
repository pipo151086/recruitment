import React from 'react';
import { View, Image } from 'react-native';
import { CheckIcon, CloseIcon } from 'native-base';
import { ProgressChart } from "react-native-chart-kit";
import { Text } from 'native-base';

const DeviceStatusIcon = ({ item, gaugeWidthHeight, imageWidthHeight, gaugeRadius, statusConectionStyle }) => {

    const imgStyleConnected = {
        height: imageWidthHeight, width: imageWidthHeight, position: 'absolute',
    }
    const imgStyleDisconnected = {
        ...imgStyleConnected,
        tintColor: 'gray'
    }

    const colorGaugeConnected = (opacity = 1) => `rgba(39, 148, 245, ${opacity})`;
    const colorGaugeDisconnected = (opacity = 1) => `rgba(174, 174, 174, ${opacity})`;

    return (
        <View style={{ flex: 1, justifyContent: 'center', textAlign: 'center', alignItems: 'center', }}>
            <ProgressChart
                data={{
                    labels: ["Swim"], // optional
                    data: [((item.signal) * (-1)) / 100]
                }}
                width={gaugeWidthHeight}
                height={gaugeWidthHeight}
                strokeWidth={16}
                radius={gaugeRadius ? gaugeRadius : 32}
                chartConfig={{
                    backgroundGradientFrom: "#fff",
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientTo: "#fff",
                    backgroundGradientToOpacity: 0.5,
                    color: item.connected ? colorGaugeConnected : colorGaugeDisconnected,
                    strokeWidth: 2, // optional, default 3
                    barPercentage: 0.5,
                    useShadowColorFromDataset: false // optional
                }}
                hideLegend={true}
            />
            <Image
                source={require('../../assets/images/anthena-draw.png')}
                style={item.connected ? imgStyleConnected : imgStyleDisconnected}
            ></Image>
            <View style={{ position: 'absolute', top: 0, left: 0, ...statusConectionStyle }}>
                {item.connected ?
                    (<CheckIcon size="5" mt="0.5" color="emerald.500" />) :
                    (<CloseIcon size="4" color="danger.700" />)
                }
            </View>
        </View>
    )
}


export default DeviceStatusIcon;