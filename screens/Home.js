import {useState, useEffect} from 'react';
import {StyleSheet, Text, SafeAreaView, FlatList, View, Dimensions } from 'react-native';

export default function HomeScreen() {
  const [markerData, setMarkerData] = useState([])

    //GET request
    const myHeadersGET = new Headers();
    myHeadersGET.append('Accept', 'application/json')
  
    const myInitGET = {
        method: 'GET',
        headers: myHeadersGET
    };
  
    const loadJSON = () => fetch(`https://stud.hosted.hr.nl/1011426/markers.json`, myInitGET)
        .then(res => res.json())
        .then(data => updateData(data))
        .catch(err => console.log(err))
  
    function updateData(data) {
      setMarkerData(data)
  }
  
    useEffect(() => { loadJSON()}, []);

    const Item = ({ name }) => (
      <View style={styles.item}>
        <Text style={styles.title}>{name}</Text>
      </View>
    );

    const renderItem = ({ item }) => <Item name={item.name} />;

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.H1}>Home!</Text>
        <FlatList data={markerData} renderItem={renderItem} keyExtractor={item => item.name} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  H1:{
    marginVertical: 10,
    fontSize: 35,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  item:{
    paddingVertical: 5,
    backgroundColor: '#e1e1e1',
    color:'red',
    width: Dimensions.get('window').width,
    borderTopWidth: 1,
    borderTopColor: 'grey',
  },
});