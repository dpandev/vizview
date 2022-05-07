import {  
  Text, 
  StyleSheet, 
  ScrollView
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'

const NewPasswordScreen = ({ navigation }) => {
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitPressed = () => {
    console.warn('Submit Pressed')
    // navigation.navigate('')
  }

  const onSignInPressed = () => {
    navigation.navigate('SignIn')
  }


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>

        <CustomInput 
          placeholder='Enter your confirmation code' 
          value={code} 
          setValue={setCode} 
        />
        <CustomInput 
          placeholder='Enter your new password' 
          value={password} 
          setValue={setPassword} 
          secureTextEntry
        />

        <CustomButton onPress={onSubmitPressed} text={"Submit"} />

        <CustomButton
          onPress={onSignInPressed} 
          text={"Back to Sign in"} 
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
})

export default NewPasswordScreen