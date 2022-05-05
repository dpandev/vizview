import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TestScreen from './TestScreen';
import SignInScreen from '../SignInScreen';
import SignUpScreen from '../SignUpScreen';
import CheckinScreen from '../CheckinScreen';
import VisitorFormScreen from '../VisitorFormScreen';
import NotificationScreen from '../NotificationScreen';
import SettingsStackScreen from '../SettingsScreen/SettingsStackScreen';
import ConfirmEmailScreen from '../ConfirmEmailScreen';
import ForgotPasswordScreen from '../ForgotPasswordScreen';
import NewPasswordScreen from '../NewPasswordScreen'

export default function TestStackScreen() {
  const TestStack = createNativeStackNavigator();
  return (
    <TestStack.Navigator>
      <TestStack.Screen name="TestScreen" component={TestScreen} />
      <TestStack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false }} />
      <TestStack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
      <TestStack.Screen name="ConfirmEmailScreen" component={ConfirmEmailScreen} options={{ headerShown: false }} />
      <TestStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }} />
      <TestStack.Screen name="NewPasswordScreen" component={NewPasswordScreen} options={{ headerShown: false }} />
      <TestStack.Screen name="CheckinScreen" component={CheckinScreen} />
      <TestStack.Screen name="VisitorFormScreen" component={VisitorFormScreen} options={{ headerShown: false }} />
      <TestStack.Screen name="NotificationScreen" component={NotificationScreen} />
      <TestStack.Screen name="SettingsStackScreen" component={SettingsStackScreen} options={{ headerShown: false }} />
    </TestStack.Navigator>
  );
}