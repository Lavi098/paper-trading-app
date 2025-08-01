


import React, { useState } from 'react';
import { Alert ,View, Text, TextInput, TouchableOpacity, StyleSheet,  KeyboardAvoidingView, Platform } from 'react-native';
import  LinearGradient from 'react-native-linear-gradient';
import { loginUser } from '../services/auth';
import { saveToken } from '../utils/tokenStorage';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../slices/authSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await loginUser({ email, password });
      await saveToken(response.access_token);
        dispatch(loginSuccess(response.access_token));
    } catch (err) {
      Alert.alert('Login failed. Check credentials.');
    }
  };

  return (
    <LinearGradient colors={['#1C1C1E', '#121212']} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.inner}>
        <Text style={styles.title}>Welcome Back 👋</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>

        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={20} color="#aaa" />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#aaa"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={20} color="#aaa" />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#aaa"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.bottomText}>Don’t have an account? <Text style={{ color: '#4ADE80' }}>Sign Up</Text></Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 32,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2D',
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 16,
    height: 50,
  },
  input: {
    flex: 1,
    color: '#fff',
    marginLeft: 8,
  },
  button: {
    backgroundColor: '#4ADE80',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomText: {
    color: '#aaa',
    textAlign: 'center',
  },
});

