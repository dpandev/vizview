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

const ConfirmEmailScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorTitle, setErrorTitle] = useState('')
  const [signOutPressed, setSignOutPressed] = useState(false)
  const [isLinkSent, setIsLinkSent] = useState(false)

  const isValid = () => {
    return auth.currentUser.email === email
  }

  const onConfirmPressed = () => {
    isValid() ? (
      auth.currentUser
        .sendEmailVerification()
        .catch(() => {
          setErrorTitle("Authentication Error")
          setErrorMessage("There was a problem sending the request. Please try again.")
        })
        .then(() => {
          setErrorTitle("Check your email")
          setErrorMessage("A verification link has been sent to your email.")
          setIsLinkSent(true)
        })
    ) : (
      setErrorTitle("Validation Error"),
      setErrorMessage("Please use the email address you signed up with.")
    )
  }

  const signOut = () => {
    auth.signOut()
  }

  const onBackToSignInPressed = () => {
    setSignOutPressed(true)
  }

  const onResendPressed = () => {
    //TODO: "can send again in 5 minutes..."
    onConfirmPressed()
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
      <SafeAreaView style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>

        <CustomInput 
          placeholder='Enter your email' 
          value={email} 
          setValue={setEmail} 
        />

        {isLinkSent ? (
          <CustomButton
            onPress={onResendPressed} 
            text={"Resend Link"} 
            type="SECONDARY"
          />
        ) : (
          <CustomButton 
            onPress={onConfirmPressed} 
            text={"Send Verification Link"} 
          />
        )}

        <CustomButton
          onPress={onBackToSignInPressed} 
          text={"Back to Sign in"} 
          type="TERTIARY"
        />

        <ErrorMessage
          visible={signOutPressed}
          title={"Are you sure?"}
          message="You will be automatically signed out if you choose to go back to the sign in screen."
          button="Stay"
          onDismiss={setSignOutPressed}
          button2="Go back"
          onButton2Press={signOut}
        />

        <ErrorMessage 
          visible={errorMessage != null}
          title={errorTitle}
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

export default ConfirmEmailScreen