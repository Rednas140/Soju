//importing react
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

//importing the picker
import { Picker } from '@react-native-picker/picker';

//importing the stylesheets
import stylesGlobal from '../styles/style.js';

export default function SettingsScreen({storeTheme, currentTheme, themeStyle}) {

  return (
    <View style={[themeStyle.container, stylesGlobal.container]}>
      <Text style={themeStyle.text}>Settings!</Text>
      <Picker
        selectedValue={currentTheme}
        onValueChange={(valueVar, itemIndex) => {
          console.log(valueVar)
          storeTheme(valueVar)
        }
        }
        mode="dropdown" // Android only
        style={[styles.picker, themeStyle.text]}
        >
      <Picker.Item label="Light" value="light" />  
      <Picker.Item label="Dark" value="dark" />
    </Picker>
    <StatusBar style= {currentTheme == 'light' ? "dark" : "light"} />
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