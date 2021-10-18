import React, { useState, useEffect, useContext } from 'react';
import { View, Animated, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Input, Button, Popover, Checkbox, Text } from 'native-base';
import { AppContext } from '../../providers';
import { GetAll } from '../../comunication/devices';
import { useFocusEffect } from '@react-navigation/native';
//import DeviceItem from './DeviceItem';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LottieView from 'lottie-react-native';
import moment from 'moment';
import DeviceStatusIcon from '../../components/DeviceStatusIcon'
import localizationEn from '../../localization/localization-en';

const DeviceList = ({ navigation }) => {
  const { devices, setDevices } = useContext(AppContext);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [onlineFilter, setOnlineFilter] = useState(true);
  const [offlineFilter, setOfflineFilter] = useState(true);
  const [wordFilter, setWordFilter] = useState('');
  const [idLoading, setIdLoading] = useState(true);
  const [sItemIsLoading, setSItemIsLoading] = useState(false);
  const CONT_SIZE = 125;
  const ITEM_SIZE = CONT_SIZE + 30; // 30 Padding + margin

  useFocusEffect(
    React.useCallback(() => {
      const fetchDevices = async () => {
        let result = await GetAll();
        let newResult = [];
        for (let x = 0; x < 10; x++) {
          newResult = [...newResult, result[x]];
        }
        setDevices(result);
        setOfflineFilter(false);
        setIdLoading(false);
      }
      fetchDevices();
    }, [])
  );

  const scrollY = React.useRef(new Animated.Value(0)).current
  const onScrollEvnt = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  )
  const keyStractor = item => item.id;
  useEffect(() => {
    setIdLoading(true);
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





  const DeviceItem = ({ item, index, scrollY, navigation, CONT_SIZE, ITEM_SIZE }) => {
    let dateShow = item.updatedAt ? moment(new Date(item.updatedAt)).format('MM-DD-YYYY HH:mm') : "N/A";
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

    /*if (sItemIsLoading) {
        return (
            <View style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
                <LottieView
                    style={{ width: "30%", height: "30%", alignItems: "center", justifyContent: "center" }}
                    source={require('../../assets/lottieFiles/9965-loading-spinner.json')} autoPlay loop />
            </View>
        );
    }

    if (!sItemIsLoading)*/
    return (
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => {
          console.log
          navigation.navigate("DeviceDetail", { item: item });
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
            keyStractor={keyStractor}
            onScroll={onScrollEvnt}
            
            removeClippedSubviews={true}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            
            //updateCellsBatchingPeriod={100}
            renderItem={({ item, index }) => DeviceItem({
              item,
              index,
              scrollY,
              sItemIsLoading,
              navigation,
              CONT_SIZE,
              ITEM_SIZE
            })
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
      </>
    )
}

export default DeviceList;