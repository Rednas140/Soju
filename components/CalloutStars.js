//importing react
import { Text, View} from 'react-native';
import { useState, useEffect, useCallback } from 'react'

//importing the stylesheet
import stylesGlobal from '../styles/style.js';

//importing the icons for the stars
import { Ionicons } from '@expo/vector-icons'; 

//importing async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//useFocusEffect import
import { useFocusEffect } from '@react-navigation/native';

export default function CallOutStars({ marker }) {

    //useState for saving the Rating
    const [rating, setRating] = useState([])

    //gets the Rating from asyncstorage and sets rating to the stored value
    const getRatings = async () => {
      try {
        //gets the data from storage
        const value = await AsyncStorage.getItem('rating')
        //if there is something in the storage set rating to that value
        if(value !== null) {
          setRating(JSON.parse(value))
        }
      } catch(err) {
        // error reading value
        console.log(err)
      }
    }
    // checks what the rating from each location is and sets the color of the stars to that rating
    function getRating(id, ratingValue) {
        //set colorObj to undefined
        let colorObj = undefined;

        //checks is rating is an array or not, otherwise rating.find wil result in error
        if (Array.isArray(rating) == false) {
            return false
        } else{
        //finds the object corresponding with the given id
        colorObj = rating.find(arr => arr.id === id)
        }
        // checks if the rating is the same as the one given as paramater
        if (colorObj && colorObj.rating >= ratingValue) {
            return true
        }
        else{
            return false
        }
    }

    //executed on first render
    useEffect(() => {getRatings()}, []);
    //executed everytime page gets opened again
    useFocusEffect(
        useCallback(() => {
            getRatings()
        }, [])
      );

return (
    <View>
        <Text>{marker.name}</Text>
        <View style={[stylesGlobal.stars]}>
                <Ionicons name="md-star" size={32} color={getRating(marker.id, 1) ? 'gold' : 'grey'} />
                <Ionicons name="md-star" size={32} color={getRating(marker.id, 2) ? 'gold' : 'grey'} />
                <Ionicons name="md-star" size={32} color={getRating(marker.id, 3) ? 'gold' : 'grey'} />
                <Ionicons name="md-star" size={32} color={getRating(marker.id, 4) ? 'gold' : 'grey'} />
                <Ionicons name="md-star" size={32} color={getRating(marker.id, 5) ? 'gold' : 'grey'} />
            </View>
    </View>
  );
}