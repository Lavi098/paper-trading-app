import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/Navigation/RootNavigator';
import { Provider, useDispatch } from 'react-redux';
import { store } from './src/store/store';
import { loginSuccess } from './src/slices/authSlice';
import { getToken } from './src/utils/tokenStorage';
import {MenuProvider} from 'react-native-popup-menu';
function AppEntry() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (token) {
        dispatch(loginSuccess(token));
      }
    };
    checkToken();
  }, [dispatch]);

  return <RootNavigator />;
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MenuProvider>
        <AppEntry />
        </MenuProvider>
      </NavigationContainer>
    </Provider>
  );
}

