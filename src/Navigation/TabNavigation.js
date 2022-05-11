import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import NotificationScreen from '../screens/NotificationsScreen'
import SettingsStackScreen from './SettingsStack'
import HomeStackScreen from './HomeStack'
import TestStack from './TestStack'

const Tab = createBottomTabNavigator()

const TabNavigation = () => {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName

          if (route.name === 'Home') {
            iconName = 'home'
          } else if (route.name === 'Settings') {
            iconName = 'settings'
          } else if (route.name === 'Notifications') {
            iconName = 'notifications'
          } else if (route.name === 'TestStack') {
            iconName = 'build'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'black',
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name='Home' component={HomeStackScreen} options={{ headerShown: false }} />
      <Tab.Screen name='Notifications' component={NotificationScreen} options={{ headerShown: true, headerTitleAlign: 'center', }} />
      <Tab.Screen name='Settings' component={SettingsStackScreen} options={{ headerShown: false }} />
      {/* will remove/replace TestScreenStack for prod */}
      <Tab.Screen name='TestStack' component={TestStack} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}

export default TabNavigation