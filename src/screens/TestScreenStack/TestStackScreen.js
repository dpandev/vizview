import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TestScreen from './TestScreen'
import SignInScreen from '../SignInScreen'
import SignUpScreen from '../SignUpScreen'
import VisitorCheckinScreen from '../VisitorCheckinScreen'
import NotificationScreen from '../NotificationScreen'
import SettingsScreen from '../SettingsScreen/SettingsScreen'
import ConfirmEmailScreen from '../ConfirmEmailScreen'
import ForgotPasswordScreen from '../ForgotPasswordScreen'
import NewPasswordScreen from '../NewPasswordScreen'
import HomeScreen from '../Home/HomeScreen'
import PostCheckinScreen from '../PostCheckinScreen'

export default function TestStackScreen() {
  const TestStack = createNativeStackNavigator()
  return (
    <TestStack.Navigator>
      <TestStack.Screen name="TestScreen" component={TestScreen} />
      <TestStack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
      <TestStack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
      <TestStack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} options={{ headerShown: false }} />
      <TestStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
      <TestStack.Screen name="NewPassword" component={NewPasswordScreen} options={{ headerShown: false }} />
      <TestStack.Screen name="VisitorCheckinScreen" component={VisitorCheckinScreen} options={{ headerShown: false }} />
      <TestStack.Screen name="PostCheckin" component={PostCheckinScreen} options={{ headerShown: false }} />
      <TestStack.Screen name="Notification" component={NotificationScreen} />
      <TestStack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
      <TestStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
    </TestStack.Navigator>
  )
}