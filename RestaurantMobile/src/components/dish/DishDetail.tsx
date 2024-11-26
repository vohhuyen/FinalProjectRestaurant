import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ImageBackground } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ENDPOINTS } from '../../utils/endpoints';
import axios from 'axios';

interface Evalue {
  star: number;
  comment: string;
  idUser: string;
}
interface Dish {
  evalue: Evalue[];
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string[];
  chef: string[];
}
interface Chef {
  name: string;
  image: string;
  description: string;
}
type RootStackParamList = {
  DishDetail: { dish: Dish };
};

type DishDetailScreenRouteProp = RouteProp<RootStackParamList, 'DishDetail'>;
type DishDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DishDetail'>;

type Props = {
  route: DishDetailScreenRouteProp;
  navigation: DishDetailScreenNavigationProp;
};

const DishDetailScreen: React.FC<Props> = ({ route }) => {
  const { dish } = route.params;
  const [chef, setChef] = useState<Chef[]>([]);

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const chefData = await Promise.all(
          dish.chef.map(async (chefId) => {
            const response = await axios.get(ENDPOINTS.GET_CHEF_ENDPOINT(chefId), {
              withCredentials: true,
            });
            return response.data;
          })
        );
        setChef(chefData);
      } catch (error) {
        console.log('Error fetching chef data:', error);
      }
    };

    fetchChefs();
  }, [dish.chef]);


  return (
    <ImageBackground
      source={require('../../../asset/background3.jpg')} 
      style={styles.container}
    >
      <ScrollView>
      <Image
        source={{ uri: `${ENDPOINTS.API_URL}${dish.image[0]}` }}
        style={styles.dish}
      />
      <View style={styles.imageContainer}>
        {dish.image.map((img, index)=>(
          <View key={index} style={styles.imageWrapper}>
            <Image
              source={{ uri: `${ENDPOINTS.API_URL}${img}` }}
              style={styles.dishImage}
            />
        </View>
        ))}
      </View>
      <Text style={styles.dishName}>{dish.name}</Text>
      <Text style={styles.dishPrice}>{dish.price}đ</Text>
      <Text style={styles.dishDescription}>{dish.description}</Text>
      {/* {dish.evalue.map((review, index) => (
        <View key={index} style={styles.reviewContainer}>
          <Text style={styles.dishEvalue}>Rating: {review.star}</Text>
          <Text style={styles.dishEvalue}>Comment: {review.comment}</Text>
        </View>
      ))} */}
      <Text style={styles.dishPrice}>WHO WILL DO IT</Text>
      {chef.map((chef, index) => (
          <View key={index} >
            {chef.image ? (
              <View style={styles.chefContainer}>
              <Image source={{ uri: `${ENDPOINTS.API_URL}${chef.image}` }} style={styles.chefImage} />
              <Text style={styles.chefName}>{chef.name}</Text>
            <Text style={styles.dishDescription}>{chef.description}</Text>
            </View>
            ):(
              <View style={styles.chefContainer}>
  <Text style={styles.chefName}>{chef.name}</Text>
              <Text style={styles.dishDescription}>{chef.description}</Text>
              </View>
            )}
            
            
          </View>
        ))}
</ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  dish: {
    width: 380,
    height: 380,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  imageWrapper: {
    width: '50%', 
    marginBottom: 10,
  },
  dishImage: {
    width: 170,
    height: 170,
    borderRadius: 16,
  },
  dishName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: 8,
  },
  dishPrice: {
    fontSize: 22,
    fontWeight: '600',
    color: '#C9AB90',
    textAlign: 'center',
    marginBottom: 8,
  },
  dishDescription: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginBottom: 12,
  },
  dishEvalue: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  reviewContainer: {
    marginBottom: 8,
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 8,
  },
  chefContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  chefImage: {
    width: 300,
    height: 500,
    borderRadius: 5,
    marginBottom: 10,
  },
  chefName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default DishDetailScreen;
