import React, { useState, useEffect, useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import TabNavigation from './TabNavigation'
import AuthStack from './AuthStack'
import { auth } from '../../firebase'
import { AuthenticatedUserContext } from './AuthenticatedUserProvider'
import { View, ActivityIndicator } from 'react-native'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  const { user, setUser, isVerified, setIsVerified } = useContext(AuthenticatedUserContext)
  const [isLoading, setIsLoading] = useState(true)

  const handleUser = (user) => {
    if (user) {
      setUser(user)
      if (auth.currentUser.emailVerified) {
        setIsVerified(true)
      } else {
        setIsVerified(false)
      }
    } else {
      setUser(null)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(handleUser)
    return () => unsubscribe()
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
          isVerified ? (
            <Stack.Screen name="TabNavigation" component={TabNavigation} /> 
          ) : (
            <Stack.Screen name="AuthStack" component={AuthStack} />
          )
        ) : (
            <Stack.Screen name='AuthStack' component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation