import React, { useState, useEffect, useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import DefaultNavigation from './TabNavigation'
import AuthStack from './AuthStack'
import { auth } from '../../firebase'
import { AuthenticatedUserContext } from './AuthenticatedUserProvider'
import { View, ActivityIndicator } from 'react-native'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async authenticatedUser => {
      try {
        await (authenticatedUser ? setUser(authenticatedUser) : setUser(null))
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    })
    return unsubscribe
  }, [])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
            <Stack.Screen name="DefaultNavigation" component={DefaultNavigation} />
        ) : (
            <Stack.Screen name='AuthStack' component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation