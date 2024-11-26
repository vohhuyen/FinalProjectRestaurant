import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { SearchIcon } from '../../icons/SearchIcon';
const Search = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search here</Text>
      <TextInput
        style={styles.input}
      />
      <SearchIcon />
     </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    padding: 10,
    width: '90%',
  },
  text: {
    position: 'absolute',
    zIndex: 2,
    left: 20,
    top: 20,
    color: 'white'
  },
  input: {
    height: 40,
    borderColor: '#C9AB81',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default Search;
