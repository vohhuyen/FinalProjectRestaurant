import axios from 'axios';
import React, { useState } from 'react'
import { ENDPOINTS } from '../../utils/endpoints';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen: React.FC<any> = ({ navigation }) => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(ENDPOINTS.LOGIN, {
        email,
        password,
      });
      if (response.status === 200) {
        await AsyncStorage.setItem('token', response.data.token);
        Alert.alert('Success', 'Login successful');
        navigation.navigate('Home');
      }
      else{
        Alert.alert('Failed', 'Invalid email or passord');
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed');
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
        <View style={styles.background}>
        </View>
      <View style={styles.formLogin}>
        <Text style={styles.title}>LOGIN!</Text>

        <View style={styles.form}>
          <TextInput
            placeholder="E-mail"
            placeholderTextColor="#888"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          /> 
          <TextInput
            placeholder="Password"
            placeholderTextColor="#888"
            style={styles.input}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkText}>You don't have an account yet? Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText} onPress={handleLogin} >Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separatorContainer}>
          <View style={styles.separator} />
          <Text style={styles.separatorText}></Text>
          <View style={styles.separator} />
        </View>

        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={{ uri: 'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png' }}
              style={styles.socialIcon}
            />
            <Text style={styles.separatorText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={{ uri: 'https://image.similarpng.com/very-thumbnail/2020/11/Blue-facebook-icon-on-transparent-background-PNG.png' }}
              style={styles.socialIcon}
            />
            <Text style={styles.separatorText}>Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    background:{
        backgroundColor: '#FFf',
        width: 600,
        height: 600,
        borderRadius: 600,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFB703',
    },
    formLogin: {
      position: 'absolute',
      zIndex: 10,
      padding: 16,
      justifyContent: 'center',
      backgroundColor: '#fff',
      borderRadius: 10,
      width: '70%',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
    },
    form: {
      width: '100%',
    },
    input: {
      width: '100%',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      marginBottom: 12,
      color: 'black'
    },
    linkText: {
      color: '#555',
      textAlign: 'center',
      marginBottom: 12,
    },
    loginButton: {
      width: '50%',
      alignSelf: 'center',
      backgroundColor: '#28a745',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    loginButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    separatorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 16,
    },
    separator: {
      flex: 1,
      height: 1,
      backgroundColor: '#ccc',
    },
    separatorText: {
      marginHorizontal: 2,
      color: '#555',
    },
    socialButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    socialButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      marginHorizontal: 1,
      width: 300,
      color: 'black'
    },
    socialIcon: {
      width: 20,
      height: 20,
    },
  });
export default LoginScreen
