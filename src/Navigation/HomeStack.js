import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/Home/HomeScreen'
import VisitorFormScreen from '../screens/VisitorFormScreen'
import VisitorCheckinScreen from '../screens/VisitorCheckinScreen'
import PostCheckinScreen from '../screens/PostCheckinScreen'

const HomeStack = () => {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="VisitorCheckin" component={VisitorCheckinScreen} />
      <Stack.Screen name="VisitorForm" component={VisitorFormScreen} />
      <Stack.Screen name="PostCheckin" component={PostCheckinScreen} />
    </Stack.Navigator>
  )
}

export default HomeStack