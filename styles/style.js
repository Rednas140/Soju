import { StyleSheet, Dimensions } from 'react-native';

//default colorscheme for the application
export default StyleSheet.create({
  H1:{
    marginVertical: 10,
    fontSize: 35,
  },
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
  item:{
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginTop: 10,
    width: 250,
  },
  stars:{
    flex:1,
    flexDirection: 'row',
    alignContent: 'center', 
    justifyContent: 'center',
  },
  text:{
    textAlign: 'center',
    color: '#222222'
  },
  resetLocation:{
    position: 'absolute',
    justifyContent:'center',
    alignItems: 'center',
    bottom: 25, 
    right: 25,
    backgroundColor:'#182c25',
    width: 50,
    height: 50,
    borderRadius: 50/2
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  picker: {
    marginVertical: 30,
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: "#666",
  },

});