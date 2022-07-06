//importing react
import {View, TouchableOpacity} from 'react-native';

//importing the stylesheet
import stylesGlobal from '../styles/style.js';

//importing the icon
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default function ResetLocation({ resetLocation }) {
return (
    <View style={stylesGlobal.resetLocation}>
        <TouchableOpacity onPress={()=> resetLocation()}>
            <MaterialCommunityIcons name="restart" size={30} color="#FEFEEF" />
        </TouchableOpacity>
    </View>
  );
}