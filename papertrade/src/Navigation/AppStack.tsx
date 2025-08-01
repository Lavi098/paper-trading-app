import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../Screens/DashboardScreen';
import PositionTabNavigator from './PositionTabNavigator'; // if you still need it
import ResetPortfolioScreen from '../Screens/ResetPortfolioScreen'; // if you have this screen
import OptionsTableScreen from '../Screens/OptionsTableScreen';
import { AppStackParamList } from '../types/navigation';
const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="MainTabs" component={PositionTabNavigator} />
      <Stack.Screen name="ResetPortfolio" component={ResetPortfolioScreen} />
      <Stack.Screen name="OptionsTable" component={OptionsTableScreen} />
    </Stack.Navigator>
  );
}
