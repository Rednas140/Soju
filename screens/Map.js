//importing from react
import { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

//importing the map
import MapView from 'react-native-maps';

//importing the marker
import { Marker } from 'react-native-maps';

//importing the location from expo
import * as Location from 'expo-location';

export default function MapScreen({navigation, route, currentTheme, themeStyle, markerData}) {
  // const [markerData, setMarkerData] = useState([])
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  if (errorMsg) {
    console.log(errorMsg);
  }

  console.log(route.params)

  return (
    <View style={styles.container}>
      <MapView 
      showsUserLocation
        region={{
          latitude: location ? location.coords.latitude: 51.93318929869035,
          longitude: location ? location.coords.longitude : 4.485885949693058,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map} 
      >
      {markerData.map((marker, index) => (
        <Marker coordinate={{ latitude : marker.latitude , longitude : marker.longitude, }} icon={require('../assets/Marker_soju.png')} key={ marker.name } title={marker.name}/>
      ))}
      </MapView>
      <StatusBar style= {currentTheme == 'light' ? "dark" : "light"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});