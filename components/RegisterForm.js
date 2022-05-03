import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import FormField from './FormField';
import { formData } from '../formData';
import { Text, Button } from 'react-native-paper';

const RegisterForm = ({navigation, route}, props) => {
  const [formValues, handleFormValueChange, setFormValues] = formData({
    username: '',
    email: '',
    password: ''
  })
  const handleSubmit = () => {
    console.log("register submit")
    navigation.navigate('TestScreen')
  }

  return (  //TODO add form validation
    <ScrollView>
      <View style={styles.container}>
        <Text style={{
          fontSize: 24,
          textAlign: 'center',
          fontWeight: "700",
          paddingBottom: 12,
        }}>User Account Registration</Text>
        <FormField
          label='Username'
          formKey='username'
          placeholder='Your username'
          handleFormValueChange={handleFormValueChange}
        />
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
            Register
        </Button>
      </View>
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

export default RegisterForm;