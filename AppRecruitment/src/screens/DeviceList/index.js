import React, { useState, useEffect } from 'react';
import { View, Animated } from 'react-native';
import { Input, Button, Popover, Checkbox } from 'native-base';
import { GetAll } from '../../comunication/devices';
import { useFocusEffect } from '@react-navigation/native';
import DeviceItem from './DeviceItem';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LottieView from 'lottie-react-native';
import DeviceDetail from './DeviceDetail';
import DeviceEdit from './DeviceEdit';

const DeviceList = () => {
  const [devices, setDevices] = useState([])
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [onlineFilter, setOnlineFilter] = useState(true);
  const [offlineFilter, setOfflineFilter] = useState(true);
  const [wordFilter, setWordFilter] = useState('');
  const [idLoading, setIdLoading] = useState(true);
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [clickedItem, setClickedItem] = useState();
  const [visibleEdit, setVisibleEdit] = useState(false);


  useFocusEffect(
    React.useCallback(() => {
      const fetchDevices = async () => {
        let result = await GetAll();
        setDevices(result);
        setFilteredDevices(result);
        setIdLoading(false);
      }
      fetchDevices();
    }, [])
  );

  const scrollY = React.useRef(new Animated.Value(0)).current

  useEffect(() => {
    setIdLoading(true);
    console.log("Entre al filtro");
    if (devices.length > 0 && (offlineFilter || onlineFilter)) {
      let fConStatus = devices;
      if (onlineFilter && !offlineFilter)
        fConStatus = devices.filter(dev => dev.connected === true)
      if (!onlineFilter && offlineFilter)
        fConStatus = devices.filter(dev => dev.connected === false)

      let finalFilter = fConStatus;

      if (wordFilter.length > 0 && !isNaN(wordFilter)) {
        finalFilter = fConStatus.filter(device => device.location === +wordFilter || device.parentLocation === +wordFilter)
      }
      setFilteredDevices(finalFilter);
     
      setIdLoading(false);
    }
  }, [onlineFilter, offlineFilter, wordFilter])


  if (idLoading)
    return (
      <View style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
        <LottieView
          style={{ width: "30%", height: "30%", alignItems: "center", justifyContent: "center" }}
          source={require('../../assets/lottieFiles/9965-loading-spinner.json')} autoPlay loop />
      </View>
    );

  if (!idLoading)
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
            renderItem={({ item, index }) => DeviceItem({ item, index, scrollY, visibleDetail, setVisibleDetail, setClickedItem })
            }
          />
        </View>

        <Popover
          trigger={(triggerProps) => {
            return (
              <View style={{
                width: '100%', position: "absolute", bottom: 50,
                justifyContent: 'center', alignItems: 'center'
              }}>
                <View style={{
                  backgroundColor: 'white', width: '90%', flexDirection: 'row', borderRadius: 50, overflow: 'hidden'
                }}>
                  <Input variant="rounded" size="md" placeholder="Location / Parent Location"
                    style={{ width: '100%', color: '#000' }}
                    keyboardType="decimal-pad"
                    onChangeText={val => {
                      setWordFilter(val)
                    }}
                    onBlur={val => {
                      setWordFilter(val)
                    }}
                    value={wordFilter}
                  />
                  <Button {...triggerProps}
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
            )
          }}
        >
          <Popover.Content accessibilityLabel="Delete Customerd" w="56">
            <Popover.Arrow />
            {/*<Popover.CloseButton />*/}
            <Popover.Header>Filter Options</Popover.Header>
            <Popover.Body>
              Select which fields you want to filter:
            </Popover.Body>

            <Popover.Footer justifyContent="flex-end">

              <View style={{ marginHorizontal: 10 }}>
                <Checkbox value="online" isChecked={onlineFilter} onChange={(val) => setOnlineFilter(val)}>Online</Checkbox>
              </View>
              <View style={{ marginHorizontal: 10 }}>
                <Checkbox value="offline" isChecked={offlineFilter} onChange={(val) => setOfflineFilter(val)}>Offline</Checkbox>
              </View>
            </Popover.Footer>

          </Popover.Content>
        </Popover>

        {clickedItem &&
          <>
            <DeviceDetail
              devices={devices}
              item={clickedItem}
              visibleDetail={visibleDetail}
              setVisibleDetail={setVisibleDetail}
            />
            <DeviceEdit
              item={clickedItem}
              setVisibleEdit={setVisibleEdit}
              visibleEdit={visibleEdit}
              setVisibleDetail={setVisibleDetail}
            />
          </>
        }
      </>
    )
}

export default DeviceList;