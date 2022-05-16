import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const CustomInput = ({ value, setValue, placeholder, secureTextEntry, keyboardType }) => {
  return (
    <View style={styles.container}>
      <TextInput 
        value = {value}
        onChangeText={setValue}
        placeholder={placeholder} 
        style={styles.input} 
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#a0a0a0"
        autoCorrect={false}
        autoCapitalize='none'
        keyboardType={keyboardType}
        selectionColor='tomato'
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
    paddingVertical: 17,
    paddingHorizontal: 15,
  },
  input: {
    fontSize: 18,
  },
})

export default CustomInput