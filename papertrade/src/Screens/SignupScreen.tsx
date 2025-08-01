import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { registerUser } from '../services/auth';
import { saveToken } from '../utils/tokenStorage';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../slices/authSlice';

export default function SignupScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSignup = async () => {
    try {
      const res = await registerUser({ email, password });
      await saveToken(res.access_token);

      // ✅ Dispatch Redux login state
      dispatch(loginSuccess(res.access_token));

      // ❌ DO NOT manually navigate to Dashboard or MainTabs
      // ✅ Let RootNavigator handle redirection based on Redux state
    } catch (err) {
      Alert.alert('Signup Failed', 'Email may already be registered.');
    }
  };

return (
    <LinearGradient colors={['#1C1C1E', '#121212']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.inner}
      >
        <Text style={styles.title}>Create Account </Text>
        <Text style={styles.subtitle}>Join the smart traders' club</Text>

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

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.bottomText}>
            Already have an account?{' '}
            <Text style={{ color: '#4ADE80' }}>Login</Text>
          </Text>
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
