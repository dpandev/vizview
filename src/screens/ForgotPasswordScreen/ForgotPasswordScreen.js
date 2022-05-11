import {  
  Text, 
  StyleSheet, 
  ScrollView
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import ErrorMessage from '../../components/ErrorMessage'
import { auth } from '../../../firebase'

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const onSendPressed = () => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setErrorMessage('Password reset email has been sent!')
      })
      .catch((error) => {
        setErrorMessage('There was a problem sending the request. Please try again.')
      })
  }

  const onSignInPressed = () => {
    navigation.goBack()
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
      <SafeAreaView style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>

        <CustomInput 
          placeholder='Enter your email' 
          value={email} 
          setValue={setEmail} 
        />

        <CustomButton onPress={onSendPressed} text={"Send"} />

        <CustomButton
          onPress={onSignInPressed} 
          text={"Go Back"} 
          type="TERTIARY"
        />

        <ErrorMessage 
          visible={errorMessage != null}
          title='Password Reset'
          message={errorMessage}
          button={"Close"}
          onDismiss={setErrorMessage}
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