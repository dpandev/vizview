import React, { useState, useEffect, useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import TabNavigation from './TabNavigation'
import AuthStack from './AuthStack'
import { auth, db } from '../../firebase'
import { AuthenticatedUserContext } from './AuthenticatedUserProvider'
import { View, ActivityIndicator } from 'react-native'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  const { user, setUser, isVerified, setIsVerified, account, setAccount } = useContext(AuthenticatedUserContext)
  const [isLoading, setIsLoading] = useState(true)

  const getAccountType = async (user) => {
    let data = await 
      db.collection('users').doc(user).get()
        .then((doc) => {
          console.log('trying to get this bread')
          console.log(account)
          let type = doc.data().accountType
          setAccount(type)
          console.log('how about now? ', account)
        })
        .catch((error) => console.log('nav error: ', error.message))
    return data
  }

  const handleUser = (user) => {
    if (user) {
      setUser(user)
      console.log('about to run')
      getAccountType(user.uid)
      console.log('already ran')
      if (auth.currentUser.emailVerified) {
        setIsVerified(true)
      } else {
        setIsVerified(false)
      }
    } else {
      setUser(null)
      setAccount(null)
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