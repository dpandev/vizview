import { 
  View, 
  Text,
  Image, 
  StyleSheet, 
  useWindowDimensions, 
  ScrollView, 
  KeyboardAvoidingView 
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import Logo from '../../../assets/images/ProFormBarberLogo.png'
import SocialLoginButtons from '../../components/SocialLoginButtons'

const SignInScreen = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const {height} = useWindowDimensions()

  const onSignInPressed = () => {
    console.warn('Sign In')
  }

  const onForgotPasswordPressed = () => {
    console.warn('Forgot Password')
  }

  const onSignupPressed = () => {
    console.warn('Register Pressed')
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.root}>
        {/* <KeyboardAvoidingView 
          behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
          style={{ flex: 1 }}
        > */}
          <Image 
            source={Logo} 
            style={[styles.logo, {height: height * 0.3}]} 
            resizeMode='contain' 
          />
          <CustomInput 
            placeholder='Username' 
            value={username} 
            setValue={setUsername} 
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
        {/* </KeyboardAvoidingView> */}
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