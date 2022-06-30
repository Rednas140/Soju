import { StyleSheet, Dimensions } from 'react-native';

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
  }
  
});