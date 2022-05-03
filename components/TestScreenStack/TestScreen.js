import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function TestScreen({ navigation }) {

  const handleClick = (value) => {
    console.log("Button Pressed")
    console.log(value)
    navigation.navigate(value)
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Button 
          labelStyle={styles.btnContent} 
          style={styles.button}
          mode='text' 
          onPress={() => handleClick('LoginForm')}>
            Login
        </Button>
        <Button 
          labelStyle={styles.btnContent} 
          style={styles.button}
          mode='text' 
          onPress={() => handleClick('RegisterForm')}>
            Register
        </Button>
        <Button 
          labelStyle={styles.btnContent} 
          style={styles.button}
          mode='text' 
          onPress={() => handleClick('CheckinScreen')}>
            CheckinScreen
        </Button>
        <Button 
          labelStyle={styles.btnContent} 
          style={styles.button}
          mode='text' 
          onPress={() => handleClick('VisitorForm')}>
            VisitorForm
        </Button>
        <Button 
          labelStyle={styles.btnContent} 
          style={styles.button}
          mode='text' 
          onPress={() => handleClick('NotificationScreen')}>
            Notifications
        </Button>
        <Button 
          labelStyle={styles.btnContent} 
          style={styles.button}
          mode='text' 
          onPress={() => handleClick('HomeStackScreen')}>
            HomeStackScreen
        </Button>
        <Button 
          labelStyle={styles.btnContent} 
          style={styles.button}
          mode='text' 
          onPress={() => handleClick('SettingsStackScreen')}>
            SettingsStackScreen
        </Button>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
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
});