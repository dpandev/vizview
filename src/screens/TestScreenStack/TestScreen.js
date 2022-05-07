import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Button, Text } from 'react-native-paper'

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
          onPress={() => handleClick('SignIn')}>
            SignIn
        </Button>
        <Button 
          labelStyle={styles.btnContent} 
          style={styles.button}
          mode='text' 
          onPress={() => handleClick('SignUp')}>
            SignUp
        </Button>
        <Button 
          labelStyle={styles.btnContent} 
          style={styles.button}
          mode='text' 
          onPress={() => handleClick('ConfirmEmail')}>
            ConfirmEmail
        </Button>
        <Button 
          labelStyle={styles.btnContent} 
          style={styles.button}
          mode='text' 
          onPress={() => handleClick('ForgotPassword')}>
            ForgotPassword
        </Button>
        <Button 
          labelStyle={styles.btnContent} 
          style={styles.button}
          mode='text' 
          onPress={() => handleClick('NewPassword')}>
            NewPassword
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
          onPress={() => handleClick('VisitorCheckin')}>
            VisitorCheckin
        </Button>
        <Button 
          labelStyle={styles.btnContent} 
          style={styles.button}
          mode='text' 
          onPress={() => handleClick('Notifications')}>
            Notifications
        </Button>
        <Button 
          labelStyle={styles.btnContent} 
          style={styles.button}
          mode='text' 
          onPress={() => handleClick('HomeScreen')}>
            HomeScreen
        </Button>
        <Button 
          labelStyle={styles.btnContent} 
          style={styles.button}
          mode='text' 
          onPress={() => handleClick('Settings')}>
            SettingsScreen
        </Button>
      </View>
    </ScrollView>
  )
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
})