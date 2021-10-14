import React from 'react';
import { View } from 'react-native';
import { Text, Modal, VStack, Button } from 'native-base';
import DeviceStatusIcon from '../../components/DeviceStatusIcon'
import localizationEn from '../../localization/localization-en';

const DeviceDetail = ({ devices, item, visibleDetail, setVisibleDetail, setVisibleEdit }) => {
    const gaugeWidthHeight = 140;
    const imageWidthHeight = 100;
    const relatedDevices = devices.filter(device => device.location === item.location)

    return (
        <Modal
            isOpen={visibleDetail}
            onClose={() => setVisibleDetail(false)}
            _backdrop={{
                _dark: {
                    bg: "coolGray.800",
                },
                bg: "warmGray.50",
            }}
        //size={'full'}
        >
            {/*<Modal.Content maxWidth="350" maxH="212">*/}
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>Device Detail</Modal.Header>
                <Modal.Body>
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


                </Modal.Body>

                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button
                            variant="ghost"
                            colorScheme="blueGray"
                            onPress={() => {
                                setVisibleDetail(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onPress={() => {
                                debugger;
                                setVisibleDetail(false)
                                setVisibleEdit(true);
                            }}
                        >
                            Edit
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
}

export default DeviceDetail;