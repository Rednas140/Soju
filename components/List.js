//importing react
import {useState, useEffect} from 'react';
import {StyleSheet, Text, FlatList, View, Dimensions, Image } from 'react-native';

export default function List() {
      //useState for the marker data
  const [markerData, setMarkerData] = useState([])

  //GET request
  const myHeadersGET = new Headers();
  myHeadersGET.append('Accept', 'application/json')

  //adding headers to fetch
  const myInitGET = {
      method: 'GET',
      headers: myHeadersGET
  };
  
  //fetch
  const loadJSON = () => fetch(`https://stud.hosted.hr.nl/1011426/markers.json`, myInitGET)
      .then(res => res.json())
      .then(data => updateData(data))
      .catch(err => console.log(err))
  
  //updating the list
  function updateData(data) {
    setMarkerData(data)
  }

  //executed on first render
  useEffect(() => {loadJSON()}, []);

  //JSX for a single list item
  const Item = ({ name }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
    </View>
  );

  //render
  const renderItem = ({ item }) => <Item name={item.name} />;
  return (
    <FlatList data={markerData} renderItem={renderItem} keyExtractor={item => item.name} />
  );
    
}

const styles = StyleSheet.create({
    item:{
      paddingVertical: 5,
      backgroundColor: '#e1e1e1',
      color:'red',
      width: Dimensions.get('window').width,
      borderTopWidth: 1,
      borderTopColor: 'grey',
    },
  });