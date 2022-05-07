import { 
  StyleSheet,  
  ScrollView
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import Logo from '../../components/Logo'
import SocialLoginButtons from '../../components/SocialLoginButtons'
import {auth} from '../../../firebase'
import ErrorMessage from '../../components/ErrorMessage'

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState(false)

  const onSignInPressed = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user
      }).catch(error => {
        setAuthError(true)
      })
  }

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword')
  }

  const onSignupPressed = () => {
    navigation.navigate('SignUp')
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.root}>
        <Logo />
        <CustomInput 
          placeholder='Email' 
          value={email} 
          setValue={setEmail} 
        />
        <CustomInput 
          placeholder='Password' 
          value={password} 
          setValue={setPassword} 
          secureTextEntry 
        />
        <CustomButton onPress={onSignInPressed} text={"Sign In"} />
        <CustomButton onPress={onForgotPasswordPressed} text={"Forgot Password?"} type='TERTIARY' />

        <SocialLoginButtons />

        <CustomButton
          onPress={onSignupPressed}
          text={"Don't have an account? Create one"}
          type='TERTIARY'
        />
        <ErrorMessage 
          visible={authError} 
          title={"Authentication Error"}
          message={"User Login Failed. Please try again."} 
          button={"Close"}
          onDismiss={setAuthError} 
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
  logo: {
    width: '70%',
    maxWidth: 200,
    maxHeight: 200,
    marginBottom: 35,
  },
})

export default SignInScreen