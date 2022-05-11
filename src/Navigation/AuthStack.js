import React, { useContext } from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen'
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen'
import NewPasswordScreen from '../screens/NewPasswordScreen'
import { AuthenticatedUserContext } from './AuthenticatedUserProvider'

const Stack = createNativeStackNavigator()

const AuthStack = () => {
  const { isVerified, user } = useContext(AuthenticatedUserContext)

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {user && !isVerified ? (
        <>
          <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default AuthStack