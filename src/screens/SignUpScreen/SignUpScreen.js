import { 
  Text, 
  StyleSheet,  
  ScrollView
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import SocialLoginButtons from '../../components/SocialLoginButtons'

const SignUpScreen = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')


  const onRegisterPressed = () => {
    console.warn('Sign In')
  }

  const onTosPressed = () => {
    console.warn('onTosPressed')
  }

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed')
  }

  const onSignInPressed = () => {
    console.warn('SignIn Pressed')
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.root}>
        <Text style={styles.title}>Create an account</Text>
        <CustomInput 
          placeholder='Username' 
          value={username} 
          setValue={setUsername} 
        />
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
        <CustomInput 
          placeholder='Confirm Password' 
          value={passwordConfirm} 
          setValue={setPasswordConfirm} 
          secureTextEntry
        />

        <CustomButton onPress={onRegisterPressed} text={"Register"} />

        <Text style={styles.text}>
          By registering, you confirm that you accept our{' '}
          <Text style={styles.link} onPress={onTosPressed}>Terms of Use</Text> and{' '}
          <Text style={styles.link} onPress={onPrivacyPressed}>Privacy Policy</Text>.
        </Text>

        <SocialLoginButtons />

        <CustomButton
          onPress={onSignInPressed} 
          text={"Have an account? Sign in"} 
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
  text: {
    color: 'grey',
    marginVertical: 10,
  },
  link: {
    color: 'tomato',
  },
})

export default SignUpScreen