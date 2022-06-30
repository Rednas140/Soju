//importing react
import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import ListRating from '../components/RatingList.js'

//importing the stylesheet
import stylesGlobal from '../styles/style.js';

export default function HomeScreen({ navigation, route, currentTheme, themeStyle, markerData }) {
  //checking for the selected theme
  return (
    <View style={[stylesGlobal.container, themeStyle.container]}>
      <Text style={[stylesGlobal.H1, themeStyle.text]}>Leave your rating!</Text>
      <ListRating themeStyle={themeStyle} markerData={markerData} navigation={navigation}/>
      <StatusBar style= {currentTheme == 'light' ? "dark" : "light"} />
    </View>
  );
}