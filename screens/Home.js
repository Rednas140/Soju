//importing react
import { Text, View } from 'react-native';

import ListComponent from '../components/List.js'

//importing the stylesheet
import stylesGlobal from '../styles/style.js';

export default function HomeScreen({ navigation, route, currentTheme }) {
  
  //checking for the selected theme
  const themeTextStyle = currentTheme === 'light' ? stylesGlobal.lightThemeText : stylesGlobal.darkThemeText;
  const themeContainerStyle = currentTheme === 'light' ? stylesGlobal.lightContainer : stylesGlobal.darkContainer;
  return (
    <View style={[stylesGlobal.container, themeContainerStyle]}>
      <Text style={stylesGlobal.H1}>Discover Soyu!</Text>
      <ListComponent></ListComponent>
    </View>
  );
}