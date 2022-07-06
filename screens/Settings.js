//importing react
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

//importing the picker
import { Picker } from '@react-native-picker/picker';

//importing the stylesheets
import stylesGlobal from '../styles/style.js';

export default function SettingsScreen({storeTheme, currentTheme, themeStyle}) {
  //makes use of the picker to send data to the storeTheme in app.js to save to async storage
  return (
    <View style={[themeStyle.container, stylesGlobal.container]}>
      <Text style={themeStyle.text}>Settings!</Text>
      <Picker
        dropdownIconColor={currentTheme == 'light' ? "#222222" : "#FEFEEF"}
        dropdownIconRippleColor={currentTheme == 'light' ? "#222222" : "#FEFEEF"}
        selectedValue={currentTheme}
        onValueChange={(valueVar, itemIndex) => {
          storeTheme(valueVar)
        }
        }
        mode="dropdown" // Android only
        style={[stylesGlobal.picker, themeStyle.text]}
        >
      <Picker.Item label="Light" value="light" />  
      <Picker.Item label="Dark" value="dark" />
    </Picker>
    <StatusBar style= {currentTheme == 'light' ? "dark" : "light"} />
    </View>
  );
}