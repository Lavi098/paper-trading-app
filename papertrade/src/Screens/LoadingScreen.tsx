import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { getToken } from '../utils/tokenStorage';

export default function LoadingScreen({ navigation }: any) {
  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (token) {
        navigation.replace('Dashboard');
      } else {
        navigation.replace('Login');
      }
    };
    checkToken();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1C1C1E' },
});

/*import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default function LoadingScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#1C1C1E', justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={{ color: 'white', marginTop: 10 }}>Loading...</Text>
    </View>
  );
}*/

