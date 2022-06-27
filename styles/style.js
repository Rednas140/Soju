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
    paddingVertical: 5,
    backgroundColor: '#e1e1e1',
    width: Dimensions.get('window').width,
    borderTopWidth: 1,
    borderTopColor: 'grey',
  },
});