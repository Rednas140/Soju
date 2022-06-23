//importing react
import { useState, useEffect }from 'react';
import { StyleSheet, Text, View } from 'react-native';

//importing the picker
import { Picker } from '@react-native-picker/picker';

//importing the stylesheet
import stylesGlobal from '../styles/style.js';

//importing async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen({ navigation, route, storeTheme, currentTheme}) {
  // colorscheme
  const themeTextStyle = currentTheme === 'light' ? stylesGlobal.lightThemeText : stylesGlobal.darkThemeText;
  const themeContainerStyle = currentTheme === 'light' ? stylesGlobal.lightContainer : stylesGlobal.darkContainer;

  const getTheme = async () => {
    try {
        const theme = await AsyncStorage.getItem('theme')
        if (theme !== null) {
          //setColorScheme(theme)
        }
    } catch (err) {
        // error reading value
        console.log(err)
    }
}

useEffect(() => {
    getTheme()
}, [])

  return (
    <View style={[stylesGlobal.container, themeContainerStyle]}>
      <Text style={themeTextStyle}>Settings!</Text>
      <Picker
        selectedValue={currentTheme}
        onValueChange={(currentTheme, itemIndex) => {
          storeTheme(currentTheme)
          //setColorScheme(currentTheme)
        }
        }
        mode="dropdown" // Android only
        style={[styles.picker, themeTextStyle]}
        >
      <Picker.Item label="Light" value="light" />  
      <Picker.Item label="Dark" value="dark" />
    </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    picker: {
      marginVertical: 30,
      width: 300,
      padding: 10,
      borderWidth: 1,
      borderColor: "#666",
    },
  });