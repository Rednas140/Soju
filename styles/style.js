import { StyleSheet } from 'react-native';

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
    lightContainer: {
      backgroundColor: '#d0d0c0',
    },
    darkContainer: {
      backgroundColor: '#242c40',
    },
    lightThemeText: {
      color: '#242c40',
    },
    darkThemeText: {
      color: '#d0d0c0',
    },
});