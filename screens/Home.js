import {useState, useEffect} from 'react';
import {StyleSheet, Text, FlatList, View, Dimensions, Image } from 'react-native';
import stylesGlobal from '../styles/style.js';

export default function HomeScreen({ navigation, route, currentTheme }) {
  //useState for the marker data
  const [markerData, setMarkerData] = useState([])
  
  //checking for the selected theme
  const themeTextStyle = currentTheme === 'light' ? stylesGlobal.lightThemeText : stylesGlobal.darkThemeText;
  const themeContainerStyle = currentTheme === 'light' ? stylesGlobal.lightContainer : stylesGlobal.darkContainer;


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

  const Item = ({ name }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
    </View>
  );

  const renderItem = ({ item }) => <Item name={item.name} />;

  return (
    <View style={[stylesGlobal.container, themeContainerStyle]}>
      <Text style={styles.H1}>Discover Soyu!</Text>
      <Image></Image>
        <FlatList data={markerData} renderItem={renderItem} keyExtractor={item => item.name} />
    </View>
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