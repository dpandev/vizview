import { 
  Text, 
  StyleSheet,  
  ScrollView,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Modal } from 'react-native-paper'
import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
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

  const onRegisterPressed = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user
        const addToDatabase = () => {
          db.collection('users')
          .doc(user.uid).set({
            name: username,
            email: email,
            createdAt: new Date(),
            tokens: [],
            accountType: 'barber',
          })
          .then(() => {
            auth.currentUser
              .updateProfile({
                displayName: username
              })
          })
        }
        addToDatabase()
          .catch((error) => {
            setErrorMessage(error.message)
          })
      })
      //add username to user object displayName property
      .catch(error => { 
        setErrorMessage(error.message)
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
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  },
  text: {
    color: 'grey',
    marginVertical: 10,
    maxWidth: 325,
    textAlign: 'center'
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