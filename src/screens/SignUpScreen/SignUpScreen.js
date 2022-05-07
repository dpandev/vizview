import { 
  Text, 
  StyleSheet,  
  ScrollView
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Modal } from 'react-native-paper'
import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import SocialLoginButtons from '../../components/SocialLoginButtons'
import { auth } from '../../../firebase'
import PrivacyPolicy from '../../components/PrivacyPolicy'
import TermsOfService from '../../components/TermsOfService'
import ErrorMessage from '../../components/ErrorMessage'

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showTerms, setShowTerms] = useState(false)

  const [authError, setAuthError] = useState(false)

  const onRegisterPressed = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user
        console.log("registered with: ", user.email)
      }).catch(error => {
        setAuthError(true)
      })
  }

  const onTosPressed = () => {
    setShowTerms(true)
  }

  const dismissTerms = () => {
    setShowTerms(false)
  }

  const onPrivacyPressed = () => {
    setShowPrivacy(true)
  }

  const dismissPrivacy = () => {
    setShowPrivacy(false)
  }

  const onSignInPressed = () => {
    navigation.navigate('SignIn')
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

        <ErrorMessage 
          visible={authError} 
          title={"Authentication Error"}
          message={"User Registration Failed. Please try again."} 
          button={"Close"}
          onDismiss={setAuthError} 
        />

        <Modal visible={showTerms} onDismiss={dismissTerms} contentContainerStyle={styles.modalContent}>
          <TermsOfService />
        </Modal>

        <Modal visible={showPrivacy} onDismiss={dismissPrivacy} contentContainerStyle={styles.modalContent}>
          <PrivacyPolicy />
        </Modal>

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
  modalContent: {
    backgroundColor: 'white',
    padding: 5,
    width: '75%',
    height: '75%',
    alignSelf: 'center',
  },
})

export default SignUpScreen