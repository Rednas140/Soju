import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import markerData from '../markers.json';
import { Marker } from 'react-native-maps';

export default function MapScreen() {
  
  return (
    <View style={styles.container}>
      <MapView 
        region={{
          latitude: markerData[1].latitude,
          longitude: markerData[1].longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map} 
      >
      {markerData.map((marker, index) => (
              <Marker coordinate={{ latitude : marker.latitude , longitude : marker.longitude, }} icon={require('../assets/Marker_soju.png')}/>
      ))}
      </MapView>
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