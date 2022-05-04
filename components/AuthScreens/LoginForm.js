import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import FormField from './FormField';
import { formData } from './formData';
import { Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginForm = ({navigation, route}, props) => { //import and use activityindicator from paper when login/reg request process is loading
  const [formValues, handleFormValueChange, setFormValues] = formData({
    email: '',
    password: '',
  })
  const handleSubmit = () => {
    console.log("login submit")
    //temp path to checkin screen (as checkin-guest account view)
    navigation.navigate('CheckinScreen')
  }

  return (  //TODO really should just make register/login form into one reusable component
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={{
          fontSize: 24,
          textAlign: 'center',
          fontWeight: "700",
          paddingBottom: 12,
        }}>User Account Login</Text>
        <FormField
          label='Email'
          formKey='email'
          placeholder='Your email id'
          textInputProps={{
            autoCapitalize: "none"
          }}
          handleFormValueChange={handleFormValueChange}
        />
        <FormField
          label='Password'
          formKey='password'
          placeholder='Your password'
          textInputProps={{
            autoCapitalize: "none"
          }}
          handleFormValueChange={handleFormValueChange}
        />
        <Button
          mode='contained'
          style={styles.button}
          labelStyle={styles.btnContent}
          onPress={handleSubmit}>
            Login
        </Button>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    margin: 20,
  },
  header: {
    fontSize: 20,
    paddingTop: 30
  },
  formText: {
    fontSize: 20,
    padding: 10,
    paddingLeft: 0
  },
  button: {
    marginTop: 40,
  },
  btnContent: {
    fontSize: 18,
    padding: 10,
  }
})

export default LoginForm;