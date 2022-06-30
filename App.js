//importing async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//importing react
import { useState, useEffect } from 'react';

//importing react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//importing the different screens
import Home from './screens/Home.js';
import Map from './screens/Map.js';
import Settings from './screens/Settings.js'
import Rating from './screens/Rating.js'

//importing the icons
import Ionicons from '@expo/vector-icons/Ionicons';

//importing light and dark themes
import light from './styles/light.js';
import dark from './styles/dark.js'

//initiating the tabnavigator
const Tab = createBottomTabNavigator();

export default function App() {
  //useState for the current selected theme  
  const [currentTheme, setCurrentTheme] = useState('light');

  //useState for the markerData
  const [markerData, setMarkerData] = useState([])

  //getting the current theme that is saved in the local storage
  const getTheme = async () => {
    try {
      const theme = await AsyncStorage.getItem('theme')
      if (theme !== null) {
        setCurrentTheme(theme)
      }
      else{
        setCurrentTheme('light')
      }
    } catch (err) {
      // error reading value
      console.log(err)
    }
  }

  //depending on the current theme, the corresponding stylesheet gets put into the themeStyle variable
  let themeStyle;
  if (currentTheme === 'light') {
    themeStyle = light
  }
  if (currentTheme === 'dark') {
    themeStyle = dark
  }

  //function for saving the currenttheme to the local storage
  const storeTheme = (newTheme) => {
    try {
      AsyncStorage.setItem('theme', newTheme)
      console.log(newTheme)
      setCurrentTheme(newTheme);
      getTheme()
    } catch (err) {
      console.log(err)
    }
  }

  //GET request
  const myHeadersGET = new Headers();
  myHeadersGET.append('Accept', 'application/json')
  myHeadersGET.append('Cache-Control', 'no-cache')

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
    // setMarkerData(data)
    storeMarkers(data)
  }

  //executed on first render
  useEffect(() => {loadJSON()}, []);

  const storeMarkers = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('markers', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const getMarkers = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('markers')
      setMarkerData(jsonValue != null ? JSON.parse(jsonValue) : null)
    } catch(e) {
      // error reading value
    }
  }

  //executes the gettheme function on first render
  useEffect(() => {
    getTheme()
    getMarkers()
  }, [])

  //tab navigation 
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home': 'home-outline';
            } else if (route.name === 'Rating') {
              iconName = focused ? 'md-star' : 'md-star-outline'
            } else if (route.name === 'Map') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: currentTheme == 'light' ? "#99D98C" : "#306844",
          tabBarStyle: {backgroundColor: currentTheme == 'light' ? "#FFFFFF" : "#222222"},
          headerStyle: {backgroundColor: currentTheme == 'light' ? "#FFFFFF" : "#222222"},
          headerTintColor: currentTheme == 'light' ? "#222222" : "#FFFFFF",
          tabBarInactiveTintColor: currentTheme == 'light' ? "#222222" : "#FFFFFF",
        })}
      >
        <Tab.Screen name="Home">{(props) => <Home {...props} storeTheme={ storeTheme } currentTheme={ currentTheme } themeStyle={ themeStyle } markerData={ markerData }/>}</Tab.Screen>
        <Tab.Screen name="Rating">{(props) => <Rating {...props} storeTheme={ storeTheme } currentTheme={ currentTheme }themeStyle={ themeStyle } markerData={ markerData }/>}</Tab.Screen>
        <Tab.Screen name="Map">{(props) => <Map {...props} storeTheme={ storeTheme } currentTheme={ currentTheme } themeStyle={ themeStyle } markerData={ markerData }/>}</Tab.Screen>
        <Tab.Screen name="Settings">{(props) => <Settings {...props} storeTheme={ storeTheme } currentTheme={ currentTheme }themeStyle={ themeStyle } markerData={ markerData }/>}</Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}