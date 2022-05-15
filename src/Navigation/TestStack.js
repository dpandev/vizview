import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TestScreen from '../screens/TestScreen'
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import VisitorCheckinScreen from '../screens/VisitorCheckinScreen'
import NotificationScreen from '../screens/NotificationsScreen'
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen'
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen'
import HomeScreen from '../screens/Home/HomeScreen'
import PostCheckinScreen from '../screens/PostCheckinScreen'
import ManageBarbers from '../screens/ManageBarbers'

const TestStack = () => {
  const TestStack = createNativeStackNavigator()
  return (
    <TestStack.Navigator>
      <TestStack.Screen name="TestScreen" component={TestScreen} />
      <TestStack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
      <TestStack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
      <TestStack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} options={{ headerShown: false }} />
      <TestStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
      <TestStack.Screen name="VisitorCheckinScreen" component={VisitorCheckinScreen} options={{ headerShown: false }} />
      <TestStack.Screen name="PostCheckin" component={PostCheckinScreen} options={{ headerShown: false }} />
      <TestStack.Screen name="Notification" component={NotificationScreen} />
      <TestStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <TestStack.Screen name="ManageBarbers" component={ManageBarbers} options={{ headerShown: false }} />
    </TestStack.Navigator>
  )
}

export default TestStack