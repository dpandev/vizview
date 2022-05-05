import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import LogoTitle from '../../components/LogoTitle'

export default function HomeScreen({ navigation }) {

  const handleClick = (value) => {
    console.log("Button Pressed")
    console.log(value)
    if (value === 'register') {
      navigation.navigate('SignUpScreen')
    } else {
      navigation.navigate('SignInScreen')
    }
  }

  return (  //if logged in, display alt screen
    <SafeAreaView style={styles.container}>
      <LogoTitle />
      <Text style={styles.brandText}>
        {'VizView'}
      </Text>
      <Button 
        labelStyle={styles.btnContent} 
        style={styles.button}
        mode='text' 
        onPress={() => handleClick('login')}>
          Login
      </Button>
      <Button 
        labelStyle={styles.btnContent} 
        style={styles.button}
        mode='text' 
        onPress={() => handleClick('register')}>
          Register
      </Button>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 75,
  },
  titleText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 30,
    marginBottom: 15,
  },
  button: {
    width: '80%',
    marginBottom: 25,
  },
  btnContent: {
    fontSize: 18,
    fontWeight: '600',
    padding: 10,
  }
})