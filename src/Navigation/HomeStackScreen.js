import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/Home/HomeScreen'
import VisitorFormScreen from '../screens/VisitorFormScreen'
import VisitorCheckinScreen from '../screens/VisitorCheckinScreen'
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import NewPasswordScreen from '../screens/NewPasswordScreen'
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen'
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen'

export default function HomeStackScreen() {
  const HomeStack = createNativeStackNavigator()
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="SignIn" component={SignInScreen} />
      <HomeStack.Screen name="SignUp" component={SignUpScreen} />
      <HomeStack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
      <HomeStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <HomeStack.Screen name="NewPassword" component={NewPasswordScreen} />
      <HomeStack.Screen name="VisitorForm" component={VisitorFormScreen} />
      <HomeStack.Screen name="VisitorCheckin" component={VisitorCheckinScreen} />
    </HomeStack.Navigator>
  )
}