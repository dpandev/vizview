import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import NotificationScreen from '../screens/NotificationsScreen'
import DefaultSettings from '../screens/SettingsScreen/DefaultSettings'
import HomeStackScreen from './HomeStack'
import TestStack from './TestStack'
import { AuthenticatedUserContext } from './AuthenticatedUserProvider'
import AdminNavigation from './AdminNavigation'

const Tab = createBottomTabNavigator()

const TabNavigation = () => {
  const {account } = useContext(AuthenticatedUserContext)

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
          } else if (route.name === 'AdminNavigation') {
            iconName = 'build'
          } else if (route.name === 'TestStack') {
            iconName = 'rocket'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'black',
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen 
        name='Home' 
        component={HomeStackScreen} 
        options={{ headerShown: false }} 
      />
      {account != 'guest' &&
        <Tab.Screen 
          name='Notifications' 
          component={NotificationScreen} 
          options={{ headerShown: true, headerTitleAlign: 'center', }} 
        />
      }
      <Tab.Screen 
        name='Settings' 
        component={DefaultSettings} 
        options={{ headerShown: false }} 
      />
      {account === 'admin' &&
        <Tab.Screen 
          name='AdminNavigation' 
          component={AdminNavigation} 
          options={{ headerShown: false }} 
        />
      }
      {/* TODO remove/replace TestScreenStack for prod */}
      {account === 'admin' &&
        <Tab.Screen 
          name='TestStack' 
          component={TestStack} 
          options={{ headerShown: false }} 
        />
      }
    </Tab.Navigator>
  )
}

export default TabNavigation