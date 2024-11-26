import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
type RootStackParamList = {
  Home: undefined;
  Table: undefined;
  Booking: undefined;
  Dish: undefined;
  User: undefined;
};

type FooterNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const Footer: React.FC = () => {
    const navigation = useNavigation<FooterNavigationProp>();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <FontAwesome name="home" size={20} color="#C9AB81" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Table')}>
        <MaterialCommunityIcons name="table-restaurant" size={20} color="#C9AB81" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Booking')}>
        <FontAwesome name="plus-circle" size={20} color="#C9AB81" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dish')}>
        <FontAwesome5 name="utensils" size={20} color="#C9AB81" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('User')}>
        <FontAwesome name="user" size={20} color="#C9AB81" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#1A1A1A',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  button: {
    alignItems: 'center',
  },
  text: {
    marginTop: 5,
    fontSize: 12,
    color: '#C9AB81',
  },
});

export default Footer;
