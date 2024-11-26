import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { ENDPOINTS } from '../utils/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Dish {
  _id: string;
  name: string;
  price: number;
  image: string[];
}

type QuantityType = {
  [key: string]: number;
};

interface Table {
  _id: string;
  name: string;
  chair: number;
  image: string[];
  description: string;
}

interface Area {
  _id: string;
  name: string;
  description: string;
  tables: Table[];
}

interface Booking {
  _id: string;
  idUser: string;
  idTable: string;
  startTime: string;
  endTime: string;
  status: string;
}



const BookingScreen: React.FC = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [areas, setAreas] = useState<Area[]>([]);
  // const [selectedTable, setSelectedTable] = useState('');
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [details, setDetails] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedDishes, setSelectedDishes] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined); // Khởi tạo ngày được chọn là undefined

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get(ENDPOINTS.GET_TABLE_WITH_AREA, {
          withCredentials: true,
        });
        const tableData = response.data;
        setAreas(tableData);
        if (tableData.length > 0) {
          setSelectedTable(tableData[0]._id);
        }
      } catch (error) {
        console.log('Error fetching tables:', error);
      }
    };

    fetchTables();
  }, []);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get(ENDPOINTS.GET_DISHS_ENDPOINT, {
          withCredentials: true,
        });
        setDishes(response.data);
      } catch (error) {
        console.log('Error fetching dishes:', error);
      }
    };

    fetchDishes();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const res = await axios.get(ENDPOINTS.GET_PROFILE_USE, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setDetails(res.data);
        } else {
          console.log('Token does not exist');
        }
      } catch (err) {
        console.log('Error fetching user profile:', err);
      }
    };

    fetchUserProfile();
  }, []);






  // Hàm xử lý khi người dùng chọn ngày
  const handleDateChange = (event: any, date: Date | undefined) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);




  const convertToTimeString = (hour: number): string => {
    const hours = Math.floor(hour);
    const minutes = Math.floor((hour - hours) * 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };


  const handleTimeSlotClick = (tableId: string, start: number, end: number, timeSlotLabel: string) => {
    setSelectedTable(tableId); // Lưu table ID
    setSelectedTimeSlot(timeSlotLabel);
    console.log("luu table", tableId);
    // Chuyển đổi số thành thời gian
    const formattedStartTime = convertToTimeString(start);
    const formattedEndTime = convertToTimeString(end);

    // Chuyển đổi về đối tượng Date
    const currentDate = new Date();
    const startDateTime = new Date(`${currentDate.toISOString().split('T')[0]}T${formattedStartTime}:00Z`);
    const endDateTime = new Date(`${currentDate.toISOString().split('T')[0]}T${formattedEndTime}:00Z`);

    setStartTime(startDateTime);
    setEndTime(endDateTime);
    setShowForm(true);
    console.log("show form", showForm);
  };





  // render and choose quantity dish
  const [quantity, setQuantity] = useState<QuantityType>({});

  const handleIncrease = (id: string) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [id]: (prevQuantity[id] || 0) + 1,
    }));
  };

  const handleDecrease = (id: string) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [id]: Math.max((prevQuantity[id] || 0) - 1, 0),
    }));
  };
  const renderForm = () => (
    <View style={styles.formContainer}>
      <ScrollView style={{ flex: 1, height: '100%' }}>
        <View style={styles.formItem}>
          <View style={styles.formItemContent}>
            <Text style={styles.itemText}>Image </Text>
            <Text style={styles.itemText}>Name </Text>
            <Text style={styles.itemText}>Price </Text>
            <Text style={styles.itemText}>Quantity </Text>
          </View>
        </View>
        <FlatList
          data={dishes}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <View style={styles.formItem}>

              <View style={styles.formItemContent}>
                <Image
                  source={{ uri: `${ENDPOINTS.API_URL}${item.image[0]}` }}
                  style={styles.dishImage}
                />
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.itemText}>{item.price} đ</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    onPress={() => handleDecrease(item._id)}
                    style={styles.decreaseButton}
                  >
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>
                    {quantity[item._id] || 0}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleIncrease(item._id)}
                    style={styles.increaseButton}
                  >
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          style={{ maxHeight: 700 }}
        />
        <View style={styles.formActions}>
          <TouchableOpacity onPress={() => setShowForm(false)} style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmitOrder} style={styles.orderButton}>
            <Text style={styles.buttonText}>Order</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );









  // validate booking
  const [bookings, setBookings] = useState<{ [key: string]: Booking[] }>({}); // State lưu booking theo table ID
  // const [showForm, setShowForm] = useState(false);

  const fetchBookings = async (idTable: string, selectedDate: string) => {
    try {
      const response = await axios.get<Booking[]>(ENDPOINTS.VALIDATE_BOOKING(idTable, selectedDate), {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy booking:', error);
      return [];
    }
  };


  useEffect(() => {
    const fetchAllBookings = async () => {
      let allBookings: { [key: string]: Booking[] } = {};

      for (const area of areas) {
        for (const table of area.tables) {
          const tableBookings = await fetchBookings(table._id, selectedDate);
          allBookings[table._id] = tableBookings;
        }
      }
      setBookings(allBookings);
    };

    if (selectedDate) {
      fetchAllBookings();
    }
  }, [areas, selectedDate]);


  const isSlotBooked = (tableId: string, startHour: number, endHour: number): boolean => {
    if (!bookings[tableId]) return false;

    return bookings[tableId].some((booking) => {
      const bookingStart = new Date(booking.startTime);
      const bookingEnd = new Date(booking.endTime);

      const bookingStartHour = bookingStart.getHours();
      const bookingEndHour = bookingEnd.getHours();

      return (
        (bookingStartHour < endHour && bookingEndHour > startHour) &&
        booking.status === 'confirmed'
      );
    });
  };




  const handleSubmitOrder = async () => {
    if (!selectedTable || !selectedDate) {
      Alert.alert('Missing Information', 'Please select a table and date.');
      return;
    }

    if (!details) {
      Alert.alert('User Not Logged In', 'Please log in to make a booking.');
      return;
    }

    const formattedDate = selectedDate.toISOString().split('T')[0];
    const formattedStartTime = startTime.toISOString().split('T')[1].slice(0, 5);
    const formattedEndTime = endTime.toISOString().split('T')[1].slice(0, 5);

    const startDateTime = new Date(`${formattedDate}T${formattedStartTime}:00Z`);
    const endDateTime = new Date(`${formattedDate}T${formattedEndTime}:00Z`);

    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
      Alert.alert('Invalid Date', 'Please select a valid date and time.');
      return;
    }

    let price = 0;

dishes.filter(dish => quantity[dish._id] > 0) 
  .forEach(dish => {
    price += dish.price * quantity[dish._id]; 
  });
    setTotalPrice(price);
    console.log("price",totalPrice);

    const bookingData = {
      user: details._id,
      table: selectedTable,
      name: details.name,
      phone: details.phone,
      dish: dishes
        .filter(dish => quantity[dish._id] > 0)
        .map(dish => ({
          dishId: dish._id,
          quantity: quantity[dish._id],
          name: dish.name,
          price: dish.price,
        })),
      totalmoney: totalPrice,
      status: 'waiting',
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
    };

    try {
      const response = await axios.post(ENDPOINTS.CREATE_BOOKING_ENDPOINT, bookingData);
      if (response.status === 200) {
        Alert.alert('Success', 'Booking successful');
        // Optionally, you can reset the form or navigate to another screen here
      } else {
        Alert.alert('Failed', 'Booking failed 1');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Failed', 'Booking failed 2');
    }
  };



  return (
    <View style={styles.container}>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <Animated.Image
          style={[
            styles.imageBox1,
            {
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [-250, 0, 250, 500],
                    outputRange: [-125, 0, 125, 250],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
          source={require('../../asset/image-booking.jpg')}
        />
        <View style={styles.box}>
          <View style={styles.boxTitle}>
            <Svg width="41" height="9.146" viewBox="0 0 41 9.146">
              <Path
                fill="none"
                stroke="#9C7C57"
                strokeMiterlimit={10}
                d="M40.881 8.576L20.562.591.244 8.576"
              />
              <Path
                fill="none"
                stroke="#9C7C57"
                strokeMiterlimit={10}
                d="M40.881.591L20.562 8.576.243.591"
              />
            </Svg>
            <Text style={styles.title}>Booking</Text>
            <Svg width="41" height="9.146" viewBox="0 0 41 9.146">
              <Path
                fill="none"
                stroke="#9C7C57"
                strokeMiterlimit={10}
                d="M40.881 8.576L20.562.591.244 8.576"
              />
              <Path
                fill="none"
                stroke="#9C7C57"
                strokeMiterlimit={10}
                d="M40.881.591L20.562 8.576.243.591"
              />
            </Svg>
          </View>

          <View style={styles.buttonTime}>
            <TouchableOpacity style={styles.button} onPress={() => setShowDatePicker(true)}>
              <Text style={styles.buttonText}>Select Date</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePickerDate"
                // value={selectedDate}
                value={selectedDate || new Date()}
                mode={mode}
                display="default"
                minimumDate={tomorrow}
                onChange={handleDateChange}
              />
            )}
            {selectedDate ? (<Text style={styles.buttonText}>{selectedDate.toLocaleDateString()}</Text>) : (<Text style={styles.buttonText}></Text>)}
            {selectedDate ? (
              areas.map((area, index) => (
                <View key={index} style={styles.areaContainer}>
                  <Text style={styles.floorText}>{area.name}</Text>
                  <Text style={styles.floorTextDescription}>{area.description}</Text>
                  {area.tables.map((table, index) => (
                    <View key={index} style={styles.tableContainer}>
                      <View style={styles.tableImageContainer}>
                        <Image
                          source={{ uri: `${ENDPOINTS.API_URL}${table.image[0]}` }}
                          style={styles.tableImage}
                        />
                      </View>
                      <View style={styles.tableInfoContainer}>
                        <Text style={styles.tableName}>{table.name}</Text>
                        <Text style={styles.floorTextDescription}>{table.description}</Text>
                        <Text style={styles.tableDescription}>{table.chair}</Text>
                        <View style={styles.timeSlotContainer}>
                          {[
                            { label: '8h-10h', start: 8, end: 10 },
                            { label: '10h-12h', start: 10, end: 12 },
                            { label: '13h-15h', start: 13, end: 15 },
                            { label: '15h-17h', start: 15, end: 17 },
                            { label: '18h-20h', start: 18, end: 20 },
                            { label: '20h-22h', start: 20, end: 22 },
                          ].map((slot, index) => (
                            <TouchableOpacity
                              key={index}
                              style={[
                                styles.timeButton,
                                isSlotBooked(table._id, slot.start, slot.end)
                                  ? { backgroundColor: '#9C7C57' }
                                  : { backgroundColor: 'orange' },
                              ]}
                              onPress={() => handleTimeSlotClick(table._id, slot.start, slot.end, slot.label)} // Gọi hàm khi nhấn vào slot
                              disabled={isSlotBooked(table._id, slot.start, slot.end)} // Vô hiệu hóa nút nếu đã được đặt
                            >
                              <Text style={styles.buttonText}>{slot.label}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>
                    </View>
                  ))}
                  {/* {showForm && selectedTable && selectedTable === area.tables[0]._id && selectedTimeSlot && renderForm()} */}

                  {showForm && selectedTimeSlot && (
                    <Modal
                      visible={showForm}
                      transparent={true}
                      animationType="slide"
                      onRequestClose={() => setShowForm(false)}
                    >
                      <View style={styles.modalBackground}>
                        {renderForm()}
                      </View>
                    </Modal>
                  )}

                </View>
              ))
            ) : (
              <Text style={styles.tableDescription}>Please select a date to view information.</Text>
            )}
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  imageBox1: {
    height: 200,
    width: '100%',
  },
  box: {
    flex: 1,
    padding: 16,
  },
  boxTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9C7C57'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 8,
    color: '#9C7C57'
  },
  buttonTime: {
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#9C7C57',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  floorText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#9C7C57'
  },
  floorTextDescription: {
    fontSize: 11,
    color: '#C0C0C0'
  },
  areaContainer: {
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#333',
    padding: 10,
    marginTop: 20,
  },
  tableContainer: {
    flexDirection: 'row',
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#9C7C57'
  },
  tableImageContainer: {
    flex: 1,
  },
  tableImage: {
    width: '100%',
    height: 200,
  },
  tableInfoContainer: {
    flex: 2,
    padding: 16,
    color: '#9C7C57'
  },
  tableName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  tableDescription: {
    fontSize: 11,
    color: 'white'
  },
  timeSlotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timeButton: {
    backgroundColor: '#9C7C57',
    padding: 5,
    borderRadius: 5,
    marginVertical: 4,
    margin: 5,
  },
  formContainer: {
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFD700',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    position: 'absolute',
    color: 'fff',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    height: '100%',
  },
  formItem: {
    marginVertical: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  formItemContent: {
    color: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    color: '#fff',
    marginHorizontal: 8,
    flex: 1,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#9C7C57',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 8,
  },
  orderButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 8,
  },
  // buttonText: {
  //   color: '#fff',
  //   textAlign: 'center',
  // },
  // quantityContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  decreaseButton: {
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 50,
  },
  increaseButton: {
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 50,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  dishImage:{
    width: 100,
    height: 100,
  }
});

export default BookingScreen;



