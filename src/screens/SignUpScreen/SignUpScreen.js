import { 
  View,
  Text, 
  StyleSheet,  
  ScrollView,
  ActivityIndicator
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Modal } from 'react-native-paper'
import React, { useState, useEffect } from 'react'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import SocialLoginButtons from '../../components/SocialLoginButtons'
import { auth, db } from '../../../firebase'
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

  const [errorMessage, setErrorMessage] = useState(null)
  const [isRegistered, setIsRegistered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onRegisterPressed = () => {
    setIsLoading(true)
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user
        const addToDatabase = () => {
          db.collection('barbers')
          .doc(email)
          .set({
            name: username,
            email: email,
            createdAt: new Date()
          })
          // db.collection('users')
          // .add({
          //   name: username,
          //   email: email,
          //   createdAt: new Date()
          // })
        }
        addToDatabase()
      })
      .catch(error => { 
        setErrorMessage(error.message)
      })
    setIsLoading(false)
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
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
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
          visible={errorMessage != null} 
          title={"Authentication Error"}
          message={errorMessage} 
          button={"Close"}
          onDismiss={setErrorMessage} 
        />

        <Modal visible={showTerms} onDismiss={dismissTerms} contentContainerStyle={styles.modalContent}>
          <TermsOfService />
        </Modal>

        <Modal visible={showPrivacy} onDismiss={dismissPrivacy} contentContainerStyle={styles.modalContent}>
          <PrivacyPolicy />
        </Modal>

        {isLoading &&
          <View style={styles.loadingCircle}>
            <ActivityIndicator size="large" color="tomato" />
          </View>
        }
        
        <StatusBar style="auto" />
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
  loadingCircle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default SignUpScreen