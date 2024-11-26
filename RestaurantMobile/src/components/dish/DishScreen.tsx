import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Image, ImageBackground } from 'react-native';
import axios from 'axios';
import { ENDPOINTS } from '../../utils/endpoints';
import AnimatedLoading from '../AnimatedLoading';

interface Dish {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string[];
}

type RootStackParamList = {
  DishDetail: { dish: Dish };
};

type DishScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DishDetail'>;

interface Props {
  navigation: DishScreenNavigationProp;
}

const DishScreen: React.FC<Props> = ({ navigation }) => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get(ENDPOINTS.GET_DISHS_ENDPOINT, {
          withCredentials: true,
        });
        setDishes(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log('Error fetching dishes:', error);
        setIsLoading(false);
      }
    };

    fetchDishes();
  }, []);

  const handleDishPress = (dish: Dish) => {
    navigation.navigate('DishDetail', { dish });
  };

  return (
    <ImageBackground
      source={require('../../../asset/background4.jpg')} 
      style={styles.container}
    >
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <AnimatedLoading />
        </View>
      ) : (
        <FlatList
          data={dishes}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.dishItem} onPress={() => handleDishPress(item)}>
              <Image
                source={{ uri: `${ENDPOINTS.API_URL}${item.image[0]}` }}
                style={styles.dishImage1}
              />
              <View style={styles.content}>
                <Image
                  source={{ uri: `${ENDPOINTS.API_URL}${item.image[1]}` }}
                  style={styles.dishImage}
                />
                <View style={styles.dishInfo}>
                  <Text style={styles.dishName}>{item.name}</Text>
                  <Text style={styles.dishPrice}>{item.price}đ</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dishItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 1,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  content: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 60,
    width: 260,
  },
  dishImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 16,
    borderWidth: 3, 
    borderColor: '#ffffff', 
    shadowColor: '#ffffff', 
    shadowOffset: { width: 0, height: 0 }, 
    shadowOpacity: 0.8, 
    shadowRadius: 10, 
    elevation: 5, 
  },  
  dishImage1: {
    width: 160,
    height: 160,
    borderRadius: 10,
    opacity: 0.6,
  },
  dishInfo: {
    flex: 1,
  },
  dishName: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dishPrice: {
    color: '#C9AB81',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DishScreen;
