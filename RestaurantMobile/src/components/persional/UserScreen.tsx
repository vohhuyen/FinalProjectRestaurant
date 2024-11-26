import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, Alert, Button, Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { ENDPOINTS } from '../../utils/endpoints';
import dayjs from 'dayjs';

interface UserDetails {
  _id: string;
  name: string;
  img: string;
}
interface Dishs {
  dishId: string;
  quantity: number;
  name: string;
  price: number;
}
interface Bookings {
  user: string;
  tableName: string;
  name: string;
  phone: string;
  dish: Dishs[];
  totalmoney: number;
  status: string;
  startTime: Date;
  endTime: Date
}
const { width } = Dimensions.get('window');
const UserScreen: React.FC<any> = ({ navigation }) => {
  const [details, setDetails] = useState<UserDetails | null>(null);
  const [booking, setBooking] = useState<Bookings[]>([]);
  const [selectedBookingIndex, setSelectedBookingIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        if (token) {
          const res = await axios.get(ENDPOINTS.GET_PROFILE_USE, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setDetails(res.data);

          if (res.data) {
            const respon = await axios.get(ENDPOINTS.GET_BOOKING_BY_USER(res.data._id), {
              withCredentials: true,
            });
            setBooking(respon.data);

          } else {
            console.log('Khong lay duoc booking');
          }
          setIsLoading(false);
          
        } else {
          console.log('Token không tồn tại');
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserProfile();
  }, []);

  const Logout = async () => {
    try{
      const token = await AsyncStorage.getItem('token');

        if (token) {
          const res = await axios.post(ENDPOINTS.LOGOUT, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if(res.status == 200){
            Alert.alert('Success', 'Logout successful');
            await AsyncStorage.removeItem('token');
            setDetails(null);
            setBooking([]);
          }
          else{
            Alert.alert('Failed', 'Logout failed');
          }
        } else {
          console.log('Token không tồn tại');
        }
    }
    catch(err){
      console.log(err)
    }
  }
  const scrollViewRef = useRef<ScrollView>(null);
  const images = [
    require('../../../asset/image-booking.jpg'),
    require('../../../asset/image-booking.jpg'),
    require('../../../asset/image-booking.jpg'),
    require('../../../asset/image-booking.jpg'),
  ];
  
  let imageIndex = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      imageIndex = (imageIndex + 1) % images.length;
      scrollViewRef.current?.scrollTo({ x: imageIndex * width, animated: true });
    }, 3000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#C9AB81" />
        </View>
      ) : (
        details ? (
          <ScrollView>
            <View>
              <View style={styles.header}>
                <Image
                  style={styles.backgroundImage}
                  source={{ uri: details.img ? `${ENDPOINTS.API_URL}/${details.img}` : undefined }}
                  resizeMode="cover"
                />
                <Text style={styles.name}>{details.name}</Text>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={Logout}
                >
                   <Text>Logout</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.bookingTitle}>Your Booking</Text>
              {booking.length != 0 ? (
                booking.map((book, index) => (
                  <View key={index}>
                    <View style={styles.form}>
                      <View style={styles.formRow}>
                        <Text style={styles.label}>Tên bàn: </Text>
                        <Text style={styles.modalValue}>{book.tableName}</Text>
                      </View>
                      <View style={styles.formRow}>
                        <Text style={styles.label}>Ngày:</Text>
                        <Text style={styles.modalValue}>{dayjs(book.startTime).format('DD-MM-YYYY')}</Text>
                      </View>
                      <View style={styles.formRow}>
                        <Text style={styles.label}>Giờ:</Text>
                        <Text style={styles.modalValue}>{dayjs(book.startTime).format('HH:mm')} - {dayjs(book.endTime).format('HH:mm')}</Text>
                      </View>
                      <View style={styles.buttonContainer}>
                        <Button title={book.status} onPress={() => { /* Handle Waiting button press */ }} />
                        <Button title="Detail" onPress={() => {
                          setSelectedBookingIndex(index); // Đặt chỉ số booking hiện tại
                        }} />
                      </View>
                    </View>


                    <Modal
                      visible={selectedBookingIndex === index}
                      transparent={true}
                      animationType="slide"
                      onRequestClose={() => setSelectedBookingIndex(null)}
                    >
                      <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                          <Text style={styles.modalTitle}>Booking Details</Text>
                          <View style={styles.modalFormRow}>
                            <Text style={styles.label}>Tên bàn:</Text>
                            <Text style={styles.modalValue}>{book.tableName}</Text>
                          </View>
                          <View style={styles.modalFormRow}>
                            <Text style={styles.label}>Ngày: </Text>
                            <Text style={styles.modalValue}>{dayjs(book.startTime).format('DD-MM-YYYY')}</Text>
                          </View>
                          <View style={styles.modalFormRow}>
                            <Text style={styles.label}>Giờ:</Text>
                            <Text style={styles.modalValue}>{dayjs(book.startTime).format('HH:mm')} - {dayjs(book.endTime).format('HH:mm')}</Text>
                          </View>
                          <View style={styles.modalFormRow}>
                            <Text style={styles.label}>Tên người đặt:</Text>
                            <Text style={styles.modalValue}>{book.name}</Text>
                          </View>
                          <View style={styles.modalFormRow}>
                            <Text style={styles.label}>Phone:</Text>
                            <Text style={styles.modalValue}>{book.phone}</Text>
                          </View>
                          <View style={styles.modalFormRow}>
                            <Text style={styles.label}>Dish:</Text>


                          </View>

                          {book.dish && Array.isArray(book.dish) && book.dish.map((dishItem, dishIndex) => (
                            <View key={dishIndex} style={styles.formRow}>
                              <Text style={styles.modalValue}>{dishItem.name}</Text>
                              <Text style={styles.modalValue}></Text>
                              <Text style={styles.modalValue}>{dishItem.price} VND x {dishItem.quantity}</Text>
                            </View>
                          ))}



                          <View style={styles.modalFormRow}>
                            <Text style={styles.label}>Total money:</Text>
                            <Text style={styles.modalValue}>{book.totalmoney}</Text>
                          </View>
                          <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setSelectedBookingIndex(null)}
                          >
                            <Text style={styles.cancelButtonText}>Close</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>
                  </View>
                ))
              ) : (
                <Text>not booking</Text>
              )}

            </View>
          </ScrollView>
        ) : (
          // <Button title="Login" onPress={() => navigation.navigate('Login')} />
          <View style={styles.loggedOutContainer}>
  <Image
    source={require('../../../asset/image-booking.jpg')} // Banner thu hút người dùng
    style={styles.bannerImage}
  />
  <Text style={styles.welcomeMessage}>Hello, welcome back!</Text>
<ScrollView 
        ref={scrollViewRef}
        horizontal={true} 
        pagingEnabled={true} 
        showsHorizontalScrollIndicator={false}
        style={styles.carouselContainer}
      >
        {images.map((image, index) => (
          <Image key={index} source={image} style={styles.promoImage} />
        ))}
      </ScrollView>
  {/* Tính năng hấp dẫn */}
  <View style={styles.featureSection}>
    <Text style={styles.featureTitle}>Explore our New Features</Text>
    <View style={styles.featureList}>
      <TouchableOpacity style={styles.featureItem} onPress={() => navigation.navigate('Menu')}>
        <Text style={styles.featureItemText}>🍽️              Browse Menu</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.featureItem} onPress={() => navigation.navigate('Booking')}>
        <Text style={styles.featureItemText}>📅          Make a Reservation</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.featureItem} onPress={() => navigation.navigate('Deals')}>
        <Text style={styles.featureItemText}>🎉          Special Offers</Text>
      </TouchableOpacity>
    </View>
  </View>

  {/* Nút đăng nhập */}
  <Button title="Login Now"  onPress={() => navigation.navigate('Login')} />
</View>


        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backgroundImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  bookingTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 20,
  },
  form: {
    borderColor: 'yellow',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    margin: 10,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    color: 'white',
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    borderColor: 'yellow',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    width: '80%',
    backgroundColor: 'black',
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  modalFormRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  modalValue: {
    flex: 1,
    marginLeft: 10,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    color: 'white',
  },
  cancelButton: {
    marginTop: 20,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
  },


  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  featureSection: {
    width: '90%',
    marginBottom: 30,
  },
  featureTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#444',
    marginBottom: 10,
  },
  featureList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featureItem: {
    backgroundColor: '#C9AB81',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    width: '32%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  featureItemText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: '#F7B500',
    width: '80%',
    padding: 15,
    borderRadius: 30,
  },
  loggedOutContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  welcomeMessage: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#333',
  },
  carouselContainer: {
    width: '100%',
  },
  promoImage: {
    width: width - 30,
    height: 180,
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  
});

export default UserScreen;






