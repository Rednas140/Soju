//importing from react
import { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

//importing mapview stuff
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';

//importing the location from expo
import * as Location from 'expo-location';

//importing location reset button component and calloutstars component
import ResetLocation from '../components/ResetLocation.js'
import CallOutStars from '../components/CalloutStars.js';

//importing the stylesheet
import stylesGlobal from '../styles/style.js';

export default function MapScreen({navigation, route, currentTheme, themeStyle, markerData}) {
  //useState from the location, error from the location and the region from mapview
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState(
    {
      latitude: 51.93318929869035,
      longitude: 4.485885949693058,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  )

  //function for that the resetlocation component uses to reset the position to Rotterdam
  function resetLocation() {
    setRegion(
      {
        latitude: 51.93318929869035,
        longitude: 4.485885949693058,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    )
  }

  //use effect that gets called each time location, route.params?.latitude or route is updated
  useEffect(() => {
    // checks if the param for latitude exists, this happens when you click on a listItem in Home
    if(route.params?.latitude){
      setRegion(
        {
          latitude: route.params.latitude,
          longitude: route.params.longitude,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
        }
      )
    }
    // else checks if the gps location from the user is set,
    else if(location){
      setRegion(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
        }
      )
    }
  }, [location, route.params?.latitude, route])

  //checks if permisson for location is given, if so get location 
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

  return (
    <View style={stylesGlobal.container}>
      <MapView 
      showsUserLocation
        region={region}
        style={stylesGlobal.map} 
      >
      {/* loops through markers data and every instance is a set a a marker */}
      {markerData.map((marker, index) => (

      <Marker coordinate={{ latitude : marker.latitude , longitude : marker.longitude, }} 
              icon={require('../assets/Marker_soju.png')} 
              key={ marker.name } 
              title={marker.name}>
        {/* Callout of each marker witht the rating of the location */}
        <Callout onPress={() => navigation.navigate("Rating")}>
          <CallOutStars marker={marker}/>
        </Callout>
      </Marker>
      ))}
      </MapView>
      {/* reset button to reset the location to rotterdam */}
      <ResetLocation resetLocation={ resetLocation } />
      <StatusBar style= {currentTheme == 'light' ? "dark" : "light"} />
    </View>
  );
}