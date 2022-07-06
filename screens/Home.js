//importing react
import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

//importing the flatList component
import ListComponent from '../components/List.js'

//importing the stylesheet
import stylesGlobal from '../styles/style.js';

export default function HomeScreen({ navigation, route, currentTheme, themeStyle, markerData }) {

  return (
    <View style={[stylesGlobal.container, themeStyle.container]}>
      <Text style={[stylesGlobal.H1, themeStyle.text]}>Discover SoGoJu!</Text>
      <ListComponent themeStyle={themeStyle} markerData={markerData} navigation={navigation}/>
      <StatusBar style= {currentTheme == 'light' ? "dark" : "light"} />
    </View>
  );
}