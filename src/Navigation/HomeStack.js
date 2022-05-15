import React, { useState, useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/Home/HomeScreen'
import VisitorFormScreen from '../screens/VisitorFormScreen'
import VisitorCheckinScreen from '../screens/VisitorCheckinScreen'
import PostCheckinScreen from '../screens/PostCheckinScreen'
import { useFocusEffect } from '@react-navigation/native'
import { AuthenticatedUserContext } from './AuthenticatedUserProvider'

const HomeStack = () => {
  const { account } = useContext(AuthenticatedUserContext)
  const [shouldHide, setShouldHide] = useState(false)
  const Stack = createNativeStackNavigator()

  useFocusEffect(() => {
    setShouldHide(false)
    return () => {
      setShouldHide(true)
    }
  })

  return (shouldHide ? null :
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {account != 'guest' &&
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      }
      <Stack.Screen name="VisitorCheckin" component={VisitorCheckinScreen} />
      <Stack.Screen name="VisitorForm" component={VisitorFormScreen} />
      <Stack.Screen name="PostCheckin" component={PostCheckinScreen} />
    </Stack.Navigator>
  )
}

export default HomeStack