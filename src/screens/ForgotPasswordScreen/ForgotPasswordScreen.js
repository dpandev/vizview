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
  const [isLinkSent, setIsLinkSent] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  const timeout = (delay) => {
    return new Promise(res => {
      setIsDisabled(true)
      setTimeout(res, delay)
    })
  }

  const onSendPressed = () => {
    console.log(isDisabled)
    if (isDisabled) {
      setErrorMessage('Please wait at least 3 minutes before sending another request.')
    } else {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          setErrorMessage('Password reset email has been sent!')
          setIsLinkSent(true)
          timeout(180).then(setIsDisabled(false))
        })
        .catch((error) => {
          setErrorMessage(error.message)
        })
    }
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

        {isLinkSent ? (
          <CustomButton
            onPress={onSendPressed} 
            text={"Resend Password Reset Link"} 
            type="SECONDARY"
          />
        ) : (
          <CustomButton 
            onPress={onSendPressed} 
            text={"Send Password Reset Link"} 
          />
        )}

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