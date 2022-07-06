//importing react
import { Text, FlatList, View, TouchableOpacity} from 'react-native';

//importing the stylesheet
import stylesGlobal from '../styles/style.js';

export default function List({themeStyle, markerData, navigation}) {
  
  //JSX for a single list item
  //Has a TouchableOpasicity to send each list item to the map page with the coords
  const Item = ({ data }) => (
    <TouchableOpacity 
    onPress={() => navigation.navigate("Map",{                         
      'latitude': data.latitude,
      'longitude': data.longitude,
    })
  } 
  >
    <View style={[themeStyle.container, stylesGlobal.item]}>
      <Text style={[stylesGlobal.text]}>{ data.name }</Text>
    </View>
    </TouchableOpacity>
  );

  //renderitem van de flatlist
  const renderItem = ({ item }) => <Item data={item} />;
  return (
    <FlatList data={markerData} renderItem={renderItem} keyExtractor={item => item.name} />
  );
}