//importing async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//importing react
import { useState, useEffect } from 'react';

//importing react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//importing the diffrent screens
import Home from './screens/Home.js';
import Map from './screens/Map.js';
import Settings from './screens/Settings.js'
import Ionicons from '@expo/vector-icons/Ionicons';

//initiating the tabnavigator
const Tab = createBottomTabNavigator();

export default function App() {

  //useState for the current selected theme  
  const [currentTheme, setCurrentTheme] = useState('light');

  //getting the current theme that is saved in the local storage9
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

  //executes the gettheme function on first render
  useEffect(() => {
    getTheme()
  }, [])

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Map') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#99D98C',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home">{(props) => <Home {...props} storeTheme={ storeTheme } currentTheme={ currentTheme }/>}</Tab.Screen>
        <Tab.Screen name="Map">{(props) => <Map {...props} storeTheme={ storeTheme } currentTheme={ currentTheme }/>}</Tab.Screen>
        <Tab.Screen name="Settings">{(props) => <Settings {...props} storeTheme={ storeTheme } currentTheme={ currentTheme }/>}</Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}