import { Text, FlatList, View, TouchableOpacity, SafeAreaViewm, Alert} from 'react-native';
import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';

//importing the stylesheet
import stylesGlobal from '../styles/style.js';

//importing the icons
import Ionicons from '@expo/vector-icons/Ionicons';

//importing async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RatingScreen({ navigation, route, currentTheme, themeStyle, markerData }) {
  //useState of rating and initializing of ratingscores
  const [rating, setRating] = useState([])
  let ratingScores = rating;

  //get the ratings from the asyncstorage and sets data with rating and ratingScores
  const getRatings = async () => {
    try {
      const value = await AsyncStorage.getItem('rating')
      if(value !== null) {
        // value previously stored
        setRating(JSON.parse(value))
        ratingScores = JSON.parse(value)
      }
    } catch(err) {
      // error reading value
      console.log(err)
    }
  }

  // saves rating to the async storage
  const storeRating = async (value) => {
    try {
      await AsyncStorage.setItem('rating', JSON.stringify(value))
    } catch (err) {
      // saving error
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

  function saveRating(id, ratingValue) {
    // check if the data has the id that was givin in the parameters
    if(ratingScores.some(arr => arr.id === id)){
        // loop over the list and find the provided id.
        let updatedList = ratingScores.map(item => 
            {

            if (item.id == id){
              //gets everything that was already in item, and updates rating
              return {...item, rating: ratingValue}; 
            }
            // else return unmodified item 
            return item; 
        });
        // set state to new object with updated list
        setRating(updatedList); 
        ratingScores = updatedList
    }
    else{
      //set the data to the old data + the new rating
      setRating([...rating, {"id":id, "rating":ratingValue,}])
      ratingScores = [...rating, {"id":id, "rating":ratingValue,}]
    }
    //when everything is finished send the data to storeRating to be saved in async storage
    storeRating(ratingScores)

  }
  
  //JSX for a single list item
  const Item = ({ data }) => (
        <View style={[themeStyle.container, stylesGlobal.item]}>
            <Text style={[stylesGlobal.text]}>{ data.name }</Text>
            <View style={stylesGlobal.container}>
            <Ionicons name="map-outline" size={32} color="#222222" onPress={() => navigation.navigate("Map",{'latitude': data.latitude,'longitude': data.longitude,})}/>
            </View>
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

  //executed on first render
  useEffect(() => {
    getRatings()
  }, []);

  //render
  const renderItem = ({ item }) => <Item data={item} />;

  return (
    <FlatList 
      contentContainerStyle={[{ alignItems: 'center',}, themeStyle.container]}
  
      data={markerData} renderItem={renderItem} 
      keyExtractor={item => item.name} 
      ListHeaderComponent={
        <>
          <Text style={[stylesGlobal.H1, themeStyle.text]}>Leave your rating!</Text>
          <StatusBar style= {currentTheme == 'light' ? "dark" : "light"} />
        </>
       }
       />
  );
}