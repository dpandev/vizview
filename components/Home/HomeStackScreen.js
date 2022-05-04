import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import LoginForm from '../AuthScreens/LoginForm';
import RegisterForm from '../AuthScreens/RegisterForm';
import VisitorForm from '../VisitorForm';
import CheckinScreen from '../CheckinScreen';

export default function HomeStackScreen() {
  const HomeStack = createNativeStackNavigator();
  return (  //TODO: logic for if user logged in, also if checkin-guest user logged in then show checkin screen
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="LoginForm" component={LoginForm} />
      <HomeStack.Screen name="RegisterForm" component={RegisterForm} />
      <HomeStack.Screen name="VisitorForm" component={VisitorForm} />
      <HomeStack.Screen name="CheckinScreen" component={CheckinScreen} options={{ headerShown: false }}/>
    </HomeStack.Navigator>
  );
}