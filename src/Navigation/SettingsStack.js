import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SettingsScreen from '../screens/SettingsScreen'

const SettingsStack = () => {
  const SettingsStack = createNativeStackNavigator()
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
    </SettingsStack.Navigator>
  )
}

export default SettingsStack