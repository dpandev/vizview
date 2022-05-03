import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TestScreen from './TestScreen';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import CheckinScreen from '../CheckinScreen';
import VisitorForm from '../VisitorForm';
import NotificationScreen from '../NotificationScreen';
import HomeStackScreen from '../Home/HomeStackScreen';
import SettingsStackScreen from '../Settings/SettingsStackScreen';

export default function TestStackScreen() {
  const TestStack = createNativeStackNavigator();
  return (
    <TestStack.Navigator>
      <TestStack.Screen name="TestScreen" component={TestScreen} />
      <TestStack.Screen name="LoginForm" component={LoginForm} />
      <TestStack.Screen name="RegisterForm" component={RegisterForm} />
      <TestStack.Screen name="CheckinScreen" component={CheckinScreen} />
      <TestStack.Screen name="VisitorForm" component={VisitorForm} />
      <TestStack.Screen name="NotificationScreen" component={NotificationScreen} options={{ headerShown: false }} />
      <TestStack.Screen name="HomeStackScreen" component={HomeStackScreen} options={{ headerShown: false }} />
      <TestStack.Screen name="SettingsStackScreen" component={SettingsStackScreen} options={{ headerShown: false }} />
    </TestStack.Navigator>
  );
}