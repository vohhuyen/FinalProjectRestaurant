import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { ENDPOINTS } from '../../utils/endpoints';
import AnimatedLoading from '../AnimatedLoading';

type RootStackParamList = {
  TableDetail: { table: Table };
};

type TableScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TableDetail'>;

interface Table {
  _id: string;
  name: string;
  status: string;
  description: string;
  quantity: number;
  image: string[];
}

interface Area {
  _id: string;
  name: string;
  description: string;
  tables: Table[];
}

interface Props {
  navigation: TableScreenNavigationProp;
}

const TableScreen: React.FC<Props> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [areas, setAreas] = useState<Area[]>([]);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get(ENDPOINTS.GET_TABLE_WITH_AREA, {
          withCredentials: true,
        });
        const tableData = response.data;
        setAreas(tableData);
        setIsLoading(false);
      } catch (error) {
        console.log('Error fetching tables:', error);
        setIsLoading(false);
      }
    };

    fetchTables();
  }, []);
  const handleTablePress = (table: Table) => {
    navigation.navigate('TableDetail', { table });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <AnimatedLoading />
        </View>
        
      ) : (
        <ScrollView>
          {areas.map((area, index) => (
            <View key={index} style={styles.areaContainer}>
              <Text style={styles.floorText}>{area.name}</Text>
              <Text style={styles.floorTextDescription}>{area.description}</Text>
              {area.tables.map((table, index) => (
                <TouchableOpacity key={index} style={styles.tableItem} onPress={() => handleTablePress(table)}>
                  <View style={styles.tableImageContainer}>
                    {table.image[0] ? (
                      <Image
                        source={{ uri: `${ENDPOINTS.API_URL}${table.image[0]}` }}
                        style={styles.tableImage}
                      />
                    ):(
                      <Image
                        source={require('../../../asset/image-booking.jpg')}
                        style={styles.tableImage}
                      />
                    )}
                    
                  </View>
                  <View style={styles.tableInfo}>
                    <Text style={styles.tableName}>{table.name}</Text>
                    <Text style={styles.tableStatus}>{table.status}</Text>
                    <Text style={styles.tableDescription}>{table.description}</Text>
                    <Text style={styles.tableQuantity}>{`Quantity: ${table.quantity}`}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
       </ScrollView>
    )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', 
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floorText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#9C7C57'
  },
  floorTextDescription: {
    fontSize: 11,
    color: '#C0C0C0',
    marginBottom: 20,
  },
  areaContainer: {
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#333',
    padding: 10,
    marginTop: 20,
  },
  tableImageContainer: {
    flex: 1,
    marginRight: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableImage: {
    width: 120,
    height: 160,
    resizeMode: 'cover',
  },
  tableItem: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  tableInfo: {
    flex: 2,
  },
  tableName: {
    color: '#F2C94C',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  tableStatus: {
    color: '#27AE60',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  tableDescription: {
    color: '#BDBDBD',
    fontSize: 12,
    marginBottom: 6,
    fontStyle: 'italic',
  },
  tableQuantity: {
    color: '#E0E0E0',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default TableScreen;
