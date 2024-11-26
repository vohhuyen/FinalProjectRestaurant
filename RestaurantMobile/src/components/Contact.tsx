import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { WebView } from 'react-native-webview';

const Contact: React.FC<any> = () => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
      <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
      <style>
        #map { width: 100%; height: 100%; margin: 0; padding: 0; }
        html, body { height: 100%; margin: 0; padding: 0; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var map = L.map('map').setView([16.0471, 108.2068], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);
      </script>
    </body>
    </html>
  `;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.mapContainer}>
        <WebView
          style={styles.map}
          originWhitelist={['*']}
          source={{ html }}
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.headerText}>Write to us</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#D4AF37"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#D4AF37"
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Message"
          placeholderTextColor="#D4AF37"
          multiline
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>SEND</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.addressContainer}>
        <Text style={styles.addressTitle}>MANHATTAN</Text>
        <Text style={styles.addressText}>71 Madison Ave</Text>
        <Text style={styles.addressText}>914-309-7011 , 914-329-2131</Text>
        <Text style={styles.addressText}>reservations@laurent.com</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  mapContainer: {
    width: Dimensions.get('window').width * 0.9,
    height: 300,
    borderRadius: 10,
    marginTop: 20,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  formContainer: {
    width: '80%',
    marginTop: 20,
    marginBottom: 20,
  },
  headerText: {
    color: '#D4AF37',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#D4AF37',
    color: 'white',
    marginBottom: 10,
  },
  textarea: {
    height: 100,
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 5,
  },
  addressContainer: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  addressTitle: {
    color: '#D4AF37',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 1,
  },
  addressText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Contact;
