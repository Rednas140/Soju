//importing react
import { Text, FlatList, View} from 'react-native';

//importing the stylesheet
import stylesGlobal from '../styles/style.js';

export default function List({themeStyle, markerData}) {
  //JSX for a single list item
  const Item = ({ name }) => (
    <View style={[themeStyle.container, stylesGlobal.item]}>
      <Text style={[stylesGlobal.text]}>{name}</Text>
    </View>
  );

  //render
  const renderItem = ({ item }) => <Item name={item.name} />;
  return (
    <FlatList data={markerData} renderItem={renderItem} keyExtractor={item => item.name} />
  );
}