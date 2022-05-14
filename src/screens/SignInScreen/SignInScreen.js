import { 
  StyleSheet,  
  ScrollView,
  Platform
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import Logo from '../../components/Logo'
import SocialLoginButtons from '../../components/SocialLoginButtons'
import {auth} from '../../../firebase'
import ErrorMessage from '../../components/ErrorMessage'
import AppleLoginButton from '../../components/SocialLoginButtons/AppleLoginButton'

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const onSignInPressed = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user
      }).catch(error => {
        setErrorMessage(error.message)
      })
  }

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword')
  }

  const onSignupPressed = () => {
    navigation.navigate('SignUp')
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
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

        {Platform.OS === 'ios' ? <AppleLoginButton /> : null}
        <SocialLoginButtons />

        <CustomButton
          onPress={onSignupPressed}
          text={"Don't have an account? Create one"}
          type='TERTIARY'
        />
        <ErrorMessage 
          visible={errorMessage != null} 
          title={"Authentication Error"}
          message={errorMessage} 
          button={"Close"}
          onDismiss={setErrorMessage} 
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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