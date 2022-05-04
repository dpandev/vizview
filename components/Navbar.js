import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NotificationScreen from './NotificationScreen';
import SettingsStackScreen from './Settings/SettingsStackScreen';
import HomeStackScreen from './Home/HomeStackScreen';
import TestStackScreen from './TestScreenStack/TestStackScreen';

const Tab = createBottomTabNavigator()

export default function NavBar() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
  
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Settings') {
              iconName = 'settings';
            } else if (route.name === 'Notifications') {
              iconName = 'notifications';
            } else if (route.name === 'TestStackScreen') {
              iconName = 'build';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'black',
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen name='Home' component={HomeStackScreen} options={{ headerShown: false }} />
        <Tab.Screen name='Notifications' component={NotificationScreen} options={{ headerShown: true, headerTitleAlign: 'center', }} />
        <Tab.Screen name='Settings' component={SettingsStackScreen} options={{ headerShown: false }} />
        <Tab.Screen name='TestStackScreen' component={TestStackScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}