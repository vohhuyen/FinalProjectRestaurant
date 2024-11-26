import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, ImageBackground } from 'react-native';
import { ENDPOINTS } from '../../utils/endpoints';

interface Table {
  name: string;
  type: string;
  description: string;
  quantity: number;
  image: string[];
}

const TableDetailScreen: React.FC<{ route: any }> = ({ route }) => {
  const { table }: { table: Table } = route.params;

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../../../asset/background3.jpg')} 
        style={styles.tableInfo}
      >
        {table.image.map((image, index) => (
          <Image
            key={index}
            source={{ uri: `${ENDPOINTS.API_URL}${image}` }}
            style={styles.tableImage}
          />
        ))}
        <View style={styles.tableDetails}>
          <Text style={styles.tableName}>{table.name}</Text>
          <Text style={styles.tableType}>Type: {table.type}</Text>
          <Text style={styles.tableDescription}>{table.description}</Text>
          <Text style={styles.tableQuantity}>Quantity: {table.quantity}</Text>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tableInfo: {
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableImage: {
    width: 300,
    height: 300,
    borderRadius: 12,
    margin: 10,
    borderWidth: 3, 
    borderColor: '#ffffff', 
    shadowColor: '#ffffff', 
    shadowOffset: { width: 0, height: 0 }, 
    shadowOpacity: 0.8, 
    shadowRadius: 10, 
  },
  tableDetails: {
    marginTop: 20,
  },
  tableName: {
    color: '#F2C94C',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  tableType: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 6,
  },
  tableDescription: {
    color: '#AAAAAA',
    fontSize: 16,
    marginBottom: 6,
  },
  tableQuantity: {
    color: '#27AE60',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TableDetailScreen;
