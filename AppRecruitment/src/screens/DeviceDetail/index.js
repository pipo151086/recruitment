import React, { useContext, useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text, Modal, VStack, Button, ScrollView, useToast, Box } from 'native-base';
import DeviceStatusIcon from '../../components/DeviceStatusIcon'
import localizationEn from '../../localization/localization-en';
import { AppContext } from '../../providers/index';
import { ThemeView } from '../../components';
import DeviceEdit from './DeviceEdit';
const DeviceDetail = ({ navigation, route }) => {
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    const [showErrorToast, setShowErrorToast] = useState(false);
    const [item, setItem] = useState(route?.params?.item);
    const { devices } = useContext(AppContext);
    const gaugeWidthHeight = 140;
    const imageWidthHeight = 100;
    const relatedDevices = devices.filter(device => device.location === item.location)
    const toast = useToast();

    useEffect(() => {
        if (showSuccessToast) {
            toast.show({
                render: () => {
                    return (
                        <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                            Updated!!!!
                        </Box>
                    )
                }
            })
            setShowSuccessToast(false);
        }
    }, [showSuccessToast]);



    useEffect(() => {
        if (showErrorToast) {
            toast.show({
                render: () => {
                    return (
                        <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>
                            ERROR :(    !!!!
                        </Box>
                    )
                }
            })
            setShowErrorToast(false);
        }
    }, [showErrorToast]);


    return (
        <ThemeView>
            <ScrollView style={{ marginTop: 25, marginBottom: 50 }}>
                <View style={{ backgroundColor: "white", width: 180, alignSelf: 'center', borderRadius: 25, alignItems: 'center' }}>
                    <DeviceStatusIcon style={{ backgroundColor: "white" }} item={item}
                        gaugeWidthHeight={gaugeWidthHeight}
                        imageWidthHeight={imageWidthHeight}
                        gaugeRadius={50}
                        statusConectionStyle={{ display: 'none' }}
                    ></DeviceStatusIcon>
                    <Text style={{ color: '#000' }}>Status:
                        <Text style={{ color: item.connected ? 'green' : 'red' }}>{item.connected ? `  Online` : `  Offline`}</Text>
                    </Text>
                </View>
                <VStack style={{ margin: 20 }}>
                    <Text >{`${localizationEn["Device.lbl.ParentLocation"]}  ${item.parentLocation}`}</Text>
                    <Text >{`${localizationEn["Device.lbl.Location"]}  ${item.location}`}</Text>
                    <Text >{`${localizationEn["Device.lbl.Signal"]}  ${item.signal}`}</Text>
                    <Text >{`${localizationEn["Device.lbl.Mac"]}  ${item.macAddress}`}</Text>
                    <Text>{`${localizationEn["Device.lbl.LastUpdate"]}  ${item.dateShow}`}</Text>
                </VStack>

                <Text fontSize="xl">{`Related Devices: `}</Text>
                {relatedDevices && relatedDevices.length > 0 &&
                    relatedDevices.map((el, index) =>
                        <VStack key={index}>
                            <Text>{`${index + 1} `}
                                <Text style={{ color: el.connected ? 'green' : 'red' }}>{el.connected ? `  Online` : `  Offline`}</Text>
                                <Text >{` (${el.signal})  `}</Text>
                                <Text >{` ${el.macAddress}`}</Text>
                            </Text>
                        </VStack>
                    )
                }

                <Button
                    onPress={() => {
                        setVisibleEdit(true)
                    }}
                >
                    Edit
                </Button>

            </ScrollView>
            <DeviceEdit
                item={item}
                visibleEdit={visibleEdit}
                setVisibleEdit={setVisibleEdit}
                toast={toast}
                setShowSuccessToast={setShowSuccessToast}
                setShowErrorToast={setShowErrorToast}
                setItem={setItem}
            />
        </ThemeView>
    )
}

export default DeviceDetail;