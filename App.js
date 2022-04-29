import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import CheckinScreen from './components/CheckinScreen';
import VisitorForm from './components/VisitorForm';
import RegisterForm from './components/RegisterForm';
import MainScreen from './components/MainScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogoTitle from './components/LogoTitle';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',
    accent: 'black',
    //text: 'black',
    //background: 'blue',
    //surface: 'blue',
  },
  // dark: true,
};

export default function App() {
  return (  //TODO staff auth pages
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='MainScreen' component={MainScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='Register' component={RegisterForm} />
          <Stack.Screen
            name="Checkin"
            component={CheckinScreen}
            options={{ headerTitle: (props) => (
              <LogoTitle />
              ),
              headerTitleAlign: 'center'
            }}
          />
          <Stack.Screen name='VisitorForm' component={VisitorForm} />
          {/* <Stack.Screen name='Main' component={MainScreen} /> */}
          {/* <Stack.Screen name='Register' component={RegisterForm} /> */}
          {/* <Stack.Screen name='Login' component={Login} /> */}

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
