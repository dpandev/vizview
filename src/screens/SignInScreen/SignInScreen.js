import { 
  StyleSheet,  
  ScrollView
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import Logo from '../../components/Logo'
import { auth } from '../../../firebase'
import ErrorMessage from '../../components/ErrorMessage'

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const onSignInPressed = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
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
          keyboardType='email-address'
        />
        <CustomInput 
          placeholder='Password' 
          value={password} 
          setValue={setPassword} 
          secureTextEntry 
        />
        <CustomButton onPress={onSignInPressed} text={"Sign In"} />
        <CustomButton onPress={onForgotPasswordPressed} text={"Forgot Password?"} type='TERTIARY' />

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
})

export default SignInScreen