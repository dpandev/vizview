import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Button } from 'react-native-paper'

export default function TestScreen({ navigation }) {

  const handleClick = (value) => {
    console.log('TestScreen: ', value)
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
            Sign In
        </Button>
        <Button 
          labelStyle={styles.btnContent} 
          style={styles.button}
          mode='text' 
          onPress={() => handleClick('SignUp')}>
            Sign Up
        </Button>
        <Button 
          labelStyle={styles.btnContent} 
          style={styles.button}
          mode='text' 
          onPress={() => handleClick('ConfirmEmail')}>
            Confirm Email
        </Button>
        <Button 
          labelStyle={styles.btnContent} 
          style={styles.button}
          mode='text' 
          onPress={() => handleClick('ForgotPassword')}>
            Forgot Password
        </Button>
        <Button 
          labelStyle={styles.btnContent} 
          style={styles.button}
          mode='text' 
          onPress={() => handleClick('VisitorForm')}>
            Visitor Form
        </Button>
        <Button 
          labelStyle={styles.btnContent} 
          style={styles.button}
          mode='text' 
          onPress={() => handleClick('VisitorCheckin')}>
            Visitor Checkin
        </Button>
        <Button 
          labelStyle={styles.btnContent} 
          style={styles.button}
          mode='text' 
          onPress={() => handleClick('PostCheckin')}>
            Post Checkin
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
            Home Screen
        </Button>
        <Button 
          labelStyle={styles.btnContent} 
          style={styles.button}
          mode='text' 
          onPress={() => handleClick('Settings')}>
            Settings Screen
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