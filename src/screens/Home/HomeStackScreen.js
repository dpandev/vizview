import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './HomeScreen'
import VisitorFormScreen from '../VisitorFormScreen'
import CheckinScreen from '../CheckinScreen'
import SignInScreen from '../SignInScreen'
import SignUpScreen from '../SignUpScreen'
import NewPasswordScreen from '../NewPasswordScreen'
import ConfirmEmailScreen from '../ConfirmEmailScreen'
import ForgotPasswordScreen from '../ForgotPasswordScreen'

export default function HomeStackScreen() {
  const HomeStack = createNativeStackNavigator()
  return (  //TODO: logic for if user logged in, also if checkin-guest user logged in then show checkin screen
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false }}/>
      <HomeStack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }}/>
      <HomeStack.Screen name="ConfirmEmailScreen" component={ConfirmEmailScreen} options={{ headerShown: false }}/>
      <HomeStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }}/>
      <HomeStack.Screen name="NewPasswordScreen" component={NewPasswordScreen} options={{ headerShown: false }}/>
      <HomeStack.Screen name="VisitorFormScreen" component={VisitorFormScreen} />
      <HomeStack.Screen name="CheckinScreen" component={CheckinScreen} options={{ headerShown: false }}/>
    </HomeStack.Navigator>
  );
}