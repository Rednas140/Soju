//importing react
import { Text, View } from 'react-native';

import ListComponent from '../components/List.js'

//importing the stylesheet
import stylesGlobal from '../styles/style.js';

export default function HomeScreen({ navigation, route, themeStyle }) {
  
  //checking for the selected theme
  return (
    <View style={[stylesGlobal.container, themeStyle.container]}>
      <Text style={[stylesGlobal.H1, themeStyle.text]}>Discover SoGoJu!</Text>
      <ListComponent themeStyle={themeStyle}/>
    </View>
  );
}