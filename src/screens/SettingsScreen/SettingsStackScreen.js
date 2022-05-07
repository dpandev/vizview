import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from './SettingsScreen'

export default function SettingsStackScreen() {
  const SettingsStack = createNativeStackNavigator();
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
    </SettingsStack.Navigator>
  );
}