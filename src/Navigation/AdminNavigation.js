import React, { useState } from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import AdminSettings from '../screens/SettingsScreen/AdminSettings'
import ManageBarbers from '../screens/ManageBarbers'
import { useFocusEffect } from '@react-navigation/native'

const Stack = createNativeStackNavigator()

const AdminNavigation = () => {
  const [shouldHide, setShouldHide] = useState(false)

  useFocusEffect(() => {
    setShouldHide(false)
    return () => {
      setShouldHide(true)
    }
  })
  return (shouldHide ? null :
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminSettings" component={AdminSettings} />
      <Stack.Screen name="ManageBarbers" component={ManageBarbers} />
    </Stack.Navigator>
  )
}

export default AdminNavigation