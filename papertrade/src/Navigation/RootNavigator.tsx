/*import React, { useEffect, useState } from 'react';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import LoadingScreen from '../Screens/LoadingScreen';
import { getToken } from '../utils/tokenStorage';

export default function RootNavigator() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getToken();
        console.log('TOKEN FOUND:', token);
        setAuthenticated(!!token); // true if token exists
      } catch (error) {
        console.error('Error checking token:', error);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    console.log('Loading...');
    return <LoadingScreen />;
  }

  console.log('Authenticated:', authenticated);
  return authenticated ? <AppStack /> : <AuthStack />;
}
*/

import React from 'react';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function RootNavigator() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Optional: you can show loading if needed, but not required anymore
  // if (loading) return <LoadingScreen />;

  return isAuthenticated ? <AppStack /> : <AuthStack />;
}
