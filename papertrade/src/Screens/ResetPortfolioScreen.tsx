

import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { updateMargin } from '../slices/userSlice';
import { LinearGradient } from 'react-native-linear-gradient'; // If using expo
import { SafeAreaView } from 'react-native-safe-area-context';
// If NOT using expo: use from `react-native-linear-gradient`

export default function ResetPortfolioScreen({ navigation }: any) {
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();

  const handleReset = () => {
    const newAmount = parseFloat(amount);
    if (isNaN(newAmount) || newAmount <= 0) {
      Alert.alert('Invalid amount', 'Please enter a valid number.');
      return;
    }

    dispatch(updateMargin(newAmount));
    Alert.alert('Portfolio Reset', `Available Margin set to ₹${newAmount}`);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.title}>Reset Portfolio</Text>
        <Text style={styles.subtitle}>Set your starting margin amount</Text>

        <TextInput
          placeholder="Enter amount (e.g., 100000)"
          placeholderTextColor="#888"
          keyboardType="numeric"
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
        />

        <TouchableOpacity onPress={handleReset} style={styles.buttonWrapper}>
          <LinearGradient
            colors={['#4ADE80', '#22C55E']}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Confirm Reset</Text>
          </LinearGradient>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: '#aaa',
    fontSize: 15,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#2C2C2E',
    color: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 30,
  },
  buttonWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
