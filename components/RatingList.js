//importing react
import { Text, FlatList, View, TouchableOpacity} from 'react-native';
import { useState } from 'react'

//importing the stylesheet
import stylesGlobal from '../styles/style.js';

//importing the icons
import Ionicons from '@expo/vector-icons/Ionicons';

export default function RatingList({themeStyle, markerData, navigation}) {
    const [rating, setRating] = useState([])

    function getRating(id, ratingValue) {
        let colorObj = rating.find(arr => arr.id === id)
        if (colorObj && colorObj.rating >= ratingValue) {
            return true
        }
        else{
            return false
        }
    }

    function saveRating(id, ratingValue) {
        if(rating.some(arr => arr.id === id)){
            // loop over the list and find the provided id.
            let updatedList = rating.map(item => 
                {
                if (item.id == id){
                return {...item, rating: ratingValue}; //gets everything that was already in item, and updates "done"
                }
                return item; // else return unmodified item 
            });
            setRating(updatedList); // set state to new object with updated list
        }
        else{
            setRating([...rating, {"id":id, "rating":ratingValue,}])
            }
    }
  
  //JSX for a single list item
  const Item = ({ data }) => (
        <View style={[themeStyle.container, stylesGlobal.item]}>
            <Text style={[stylesGlobal.text]}>{ data.name }</Text>
            <View style={[stylesGlobal.stars]}>
                <TouchableOpacity onPress={() => { saveRating(data.id, 1) }}>
                    <Ionicons name="md-star" size={32} color={getRating(data.id, 1) ? 'gold' : 'grey'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { saveRating(data.id, 2) }}>
                    <Ionicons name="md-star" size={32} color={getRating(data.id, 2) ? 'gold' : 'grey'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { saveRating(data.id, 3) }}>
                    <Ionicons name="md-star" size={32} color={getRating(data.id, 3) ? 'gold' : 'grey'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { saveRating(data.id, 4) }}>
                    <Ionicons name="md-star" size={32} color={getRating(data.id, 4) ? 'gold' : 'grey'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { saveRating(data.id, 5) }}>
                    <Ionicons name="md-star" size={32} color={getRating(data.id, 5) ? 'gold' : 'grey'} />
                </TouchableOpacity>
            </View>
        </View>
  );

  //render
  const renderItem = ({ item }) => <Item data={item} />;
  return (
    <FlatList data={markerData} renderItem={renderItem} keyExtractor={item => item.name} />
  );
}