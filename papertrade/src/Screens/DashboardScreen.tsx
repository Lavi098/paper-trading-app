/*import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { removeToken } from '../utils/tokenStorage';

export default function DashboardScreen({ navigation }: any) {
  const handleLogout = async () => {
    await removeToken();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Dashboard</Text>
      <Text style={styles.subtitle}>You are successfully logged in!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 20 },
});
*/

import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { removeToken } from '../utils/tokenStorage';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import PositionTabNavigator from '../Navigation/PositionTabNavigator';

export default function DashboardScreen() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await removeToken();
    dispatch(logout());
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Tab Navigator UI */}
      <PositionTabNavigator />

      {/* Logout Button Overlay */}
      <View style={styles.logoutContainer}>
        <Button title="Logout" onPress={handleLogout} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoutContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
});
