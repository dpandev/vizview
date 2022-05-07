import { 
  Text, 
  StyleSheet, 
  ScrollView
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'

const ConfirmEmailScreen = ({ navigation }) => {
  const [username, setUsername] = useState('')
  const [code, setCode] = useState('')

  const onConfirmPressed = () => {
    console.warn('Confirm Pressed')
  }

  const onSignInPressed = () => {
    console.warn('SignIn Pressed')
  }

  const onResendPressed = () => {
    console.warn('Resend Pressed')
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>

        <CustomInput 
          placeholder='Enter your username' 
          value={username} 
          setValue={setUsername} 
        />
        <CustomInput 
          placeholder='Enter you confirmation code' 
          value={code} 
          setValue={setCode} 
        />

        <CustomButton onPress={onConfirmPressed} text={"Confirm"} />

        <CustomButton
          onPress={onResendPressed} 
          text={"Resend code"} 
          type="SECONDARY"
        />
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

export default ConfirmEmailScreen