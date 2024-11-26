import React, { useEffect, useState } from 'react';
import { NavigationContainer, useIsFocused, useNavigationState, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/components/HomeScreen';
import TableScreen from './src/components/table/TableScreen';
import BookingScreen from './src/components/BookingScreen';
import DishScreen from './src/components/dish/DishScreen';
import UserScreen from './src/components/persional/UserScreen';
import Footer from './src/components/elements/Footer';
import LoginScreen from './src/components/auth/LoginScreen';
import RegisterScreen from './src/components/auth/RegisterScreen';
import TableDetail from './src/components/table/TableDetail';
import DishDetailScreen from './src/components/dish/DishDetail';
import Contact from './src/components/Contact';
import BlogScreen from './src/components/blog/BlogScreen';
import BlogDetails from './src/components/blog/BlogDetails';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="Table" component={TableScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="TableDetail" component={TableDetail}/>
        <Stack.Screen name="Booking" component={BookingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dish" component={DishScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="DishDetail" component={DishDetailScreen}/>
        <Stack.Screen name="User" component={UserScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="Blog" component={BlogScreen} />
        <Stack.Screen name="BlogDetail" component={BlogDetails} />
      </Stack.Navigator>
      {/* <ShowFooter /> */}
      <Footer />
    </NavigationContainer>
  );
};

// const ShowFooter: React.FC = () => {
//   const currentRouteName = useNavigationState(state => state.routes[state.index]?.name);
//   if (currentRouteName !== 'Login' && currentRouteName !== 'Register') {
//     return <Footer />;
//   }
//   return null;
// };

export default App;
