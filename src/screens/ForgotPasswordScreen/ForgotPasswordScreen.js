import {  
  Text, 
  StyleSheet, 
  ScrollView
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'

const ForgotPasswordScreen = () => {
  const [username, setUsername] = useState('')

  const onSendPressed = () => {
    console.warn('Confirm Pressed')
  }

  const onSignInPressed = () => {
    console.warn('SignIn Pressed')
  }


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>

        <CustomInput 
          placeholder='Enter your username' 
          value={username} 
          setValue={setUsername} 
        />

        <CustomButton onPress={onSendPressed} text={"Send"} />

        <CustomButton
          onPress={onSignInPressed} 
          text={"Back to Sign in"} 
          type="TERTIARY"
        />
        
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  },
})

export default ForgotPasswordScreen