//importing react
import {useState, useEffect} from 'react';
import { Text, FlatList, View} from 'react-native';

//importing the stylesheet
import stylesGlobal from '../styles/style.js';

export default function List(themeStyle) {

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
    <View style={[themeStyle.container, stylesGlobal.item]}>
      <Text style={[themeStyle.text]}>{name}</Text>
    </View>
  );

  //render
  const renderItem = ({ item }) => <Item name={item.name} />;
  return (
    <FlatList data={markerData} renderItem={renderItem} keyExtractor={item => item.name} />
  );
}