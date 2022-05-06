import { 
  View, 
  Text,
  Image, 
  StyleSheet, 
  useWindowDimensions, 
  ScrollView
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import Logo from '../../../assets/images/ProFormBarberLogo.png'
import SocialLoginButtons from '../../components/SocialLoginButtons'
import { useNavigation } from '@react-navigation/native'

const SignInScreen = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const {height} = useWindowDimensions()
  const navigation = useNavigation()

  const onSignInPressed = () => {
    console.warn('SignIn Pressed')
    navigation.navigate('DefaultNavigation')
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