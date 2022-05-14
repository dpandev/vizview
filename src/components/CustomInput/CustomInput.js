import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const CustomInput = ({ value, setValue, placeholder, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <TextInput 
        value = {value}
        onChangeText={setValue}
        placeholder={placeholder} 
        style={styles.input} 
        secureTextEntry={secureTextEntry}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  input: {
    //
  },
})

export default CustomInput