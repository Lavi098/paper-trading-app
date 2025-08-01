import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import  {setSelectedIndex} from '../slices/marketSlice'; // Import the action to set selected index
import { useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Navigationprop = NativeStackNavigationProp<AppStackParamList, 'OptionsTable'>;
export default function DiscoverScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation<Navigationprop>();
  const handleSelect = (indexType: string) => {
    dispatch(setSelectedIndex(indexType)); // Set index in Redux
    navigation.navigate('OptionsTable'); // Navigate to the options table screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Market</Text>

      <View style={styles.grid}>
        <TouchableOpacity style={styles.card} onPress={() => handleSelect('NIFTY')}>
          <Text style={styles.cardText}>NIFTY</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => handleSelect('BANKNIFTY')}>
          <Text style={styles.cardText}>BANK NIFTY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  card: {
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  cardText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});

