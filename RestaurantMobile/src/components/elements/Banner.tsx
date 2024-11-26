import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Dimensions, ImageBackground, Animated, Modal, TouchableOpacity, Button } from 'react-native';
import Search from './Search';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const images = [
  { source: require('../../../asset/main-banner-1.jpg'), text: 'the food heaven' },
  { source: require('../../../asset/main-banner-2.jpg'), text: 'the best dishes' },
  { source: require('../../../asset/main-banner-3.jpg'), text: 'the finest drinks' },
];
export type RootStackParamList = {
  Home: undefined;
  Contact: undefined;
  Blog: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
const Banner: React.FC<any> = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const currentIndex = useRef(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const imageList = [...images, ...images];

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const slideInterval = 5000;

    const startAnimation = () => {
      const nextIndex = currentIndex.current + 1;

      Animated.timing(scrollX, {
        toValue: -width * nextIndex,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        currentIndex.current = nextIndex;

        if (nextIndex === images.length) {
          scrollX.setValue(0);
          currentIndex.current = 0;
        }

        setTimeout(startAnimation, slideInterval);
      });
    };

    const interval = setTimeout(startAnimation, slideInterval);

    return () => clearTimeout(interval);
  }, [scrollX]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Search />
        <FontAwesome style={styles.icon} name="bars" size={30} color="#C9AB81" onPress={toggleModal} />
      </View>
      <Animated.View style={[styles.slider, { transform: [{ translateX: scrollX }] }]}>
        {imageList.map((item, index) => (
          <View key={index} style={styles.slide}>
            <ImageBackground style={styles.image} imageStyle={{ resizeMode: 'cover' }} source={item.source}>
              <Text style={styles.text}>{item.text}</Text>
            </ImageBackground>
          </View>
        ))}
      </Animated.View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => { navigation.navigate('Contact'); toggleModal(); }}>
              <Text style={styles.modalText}>Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {  navigation.navigate('Blog'); toggleModal(); }}>
              <Text style={styles.modalText}>Blog</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.modalClose}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: 'black',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  icon: {
    position: 'absolute',
    zIndex: 1,
    padding: 13,
    right: 0
  },
  slider: {
    flexDirection: 'row',
    width: width * images.length * 2,
  },
  slide: {
    width: width,
    height: 250,
  },
  image: {
    height: 250,
    backgroundColor: 'rgb(12, 19, 21)',
    justifyContent: 'center',
  },
  text: {
    position: 'absolute',
    left: '25%',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#C9AB81',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 250,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  modalClose: {
    fontSize: 16,
    color: 'red',
  },
});

export default Banner;




// import React, { useState, useEffect, useRef } from 'react';
// import { View, StyleSheet, Text, Dimensions, ImageBackground, Animated, Modal, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';  // Import useNavigation hook
// import FontAwesome from 'react-native-vector-icons/FontAwesome6';

// const { width } = Dimensions.get('window');

// const images = [
//   { source: require('../../../asset/main-banner-1.jpg'), text: 'the food heaven' },
//   { source: require('../../../asset/main-banner-2.jpg'), text: 'the best dishes' },
//   { source: require('../../../asset/main-banner-3.jpg'), text: 'the finest drinks' },
// ];
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// // Define your route types
// export type RootStackParamList = {
//   Home: undefined;
//   Contact: undefined;
//   Blog: undefined;
//   // Add other routes as needed
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// const Banner: React.FC = () => {
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const currentIndex = useRef(0);
//   const [isModalVisible, setModalVisible] = useState(false);
//   const imageList = [...images, ...images];

//   // Lấy navigation object từ useNavigation hook
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

//   useEffect(() => {
//     const slideInterval = 5000;

//     const startAnimation = () => {
//       const nextIndex = currentIndex.current + 1;

//       Animated.timing(scrollX, {
//         toValue: -width * nextIndex,
//         duration: 1000,
//         useNativeDriver: true,
//       }).start(() => {
//         currentIndex.current = nextIndex;

//         if (nextIndex === images.length) {
//           scrollX.setValue(0);
//           currentIndex.current = 0;
//         }

//         setTimeout(startAnimation, slideInterval);
//       });
//     };

//     const interval = setTimeout(startAnimation, slideInterval);

//     return () => clearTimeout(interval);
//   }, [scrollX]);

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <FontAwesome style={styles.icon} name="bars" size={30} color="#C9AB81" onPress={toggleModal} />
//       </View>
//       <Animated.View style={[styles.slider, { transform: [{ translateX: scrollX }] }]}>
//         {imageList.map((item, index) => (
//           <View key={index} style={styles.slide}>
//             <ImageBackground style={styles.image} imageStyle={{ resizeMode: 'cover' }} source={item.source}>
//               <Text style={styles.text}>{item.text}</Text>
//             </ImageBackground>
//           </View>
//         ))}
//       </Animated.View>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={isModalVisible}
//         onRequestClose={toggleModal}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <TouchableOpacity onPress={() => { navigation.navigate('Contact'); toggleModal(); }}>
//               <Text style={styles.modalText}>Contact</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => { navigation.navigate('Blog'); toggleModal(); }}>
//               <Text style={styles.modalText}>Blog</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={toggleModal}>
//               <Text style={styles.modalClose}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     overflow: 'hidden',
//     backgroundColor: 'black',
//   },
//   header: {
//     display: 'flex',
//     justifyContent: 'space-between',
//   },
//   icon: {
//     position: 'absolute',
//     zIndex: 1,
//     padding: 13,
//     right: 0
//   },
//   slider: {
//     flexDirection: 'row',
//     width: width * images.length * 2,
//   },
//   slide: {
//     width: width,
//     height: 250,
//   },
//   image: {
//     height: 250,
//     backgroundColor: 'rgb(12, 19, 21)',
//     justifyContent: 'center',
//   },
//   text: {
//     position: 'absolute',
//     left: '25%',
//     textTransform: 'uppercase',
//     letterSpacing: 2,
//     color: '#C9AB81',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: 250,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//     alignItems: 'center',
//   },
//   modalText: {
//     fontSize: 18,
//     marginBottom: 15,
//   },
//   modalClose: {
//     fontSize: 16,
//     color: 'red',
//   },
// });

// export default Banner;

