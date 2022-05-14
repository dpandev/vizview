import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { Dialog, Button, Paragraph } from 'react-native-paper'

const ConfirmActionDialog = ({ 
  visible, 
  title, 
  message, 
  placeholder1,
  inputText, 
  setInputText,
  secureText1, 
  placeholder2,
  inputText2, 
  setInputText2, 
  button, 
  button2, 
  onDismiss, 
  onButton2Press,
  secureText2,
}) => {

  return (
    <Dialog visible={visible} onDismiss={() => onDismiss()} style={styles.container}>
      <Dialog.Title>⚠️ {title}</Dialog.Title>
      <Dialog.Content>
        <Paragraph>{message}</Paragraph>
        <TextInput
          secureTextEntry={secureText1}
          placeholder={placeholder1}
          value={inputText}
          onChangeText={(input) => setInputText(input)}
          style={styles.textInput}
          placeholderTextColor="#a0a0a0"
        />
        {placeholder2 != null
          ? <TextInput 
              secureTextEntry={secureText2}
              placeholder={placeholder2}
              value={inputText2}
              onChangeText={(input) => setInputText2(input)}
              style={styles.textInput}
              placeholderTextColor="#a0a0a0"
            />
          : <></>
        }
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={() => onDismiss()} style={styles.button}>{button}</Button>
        {button2 && <Button onPress={() => onButton2Press()} style={styles.button}>{button2}</Button>}
      </Dialog.Actions>
    </Dialog>
  )
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 500,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
  },
  textInput: {
    backgroundColor: '#f9f9f9',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: 'red'
  },
  button: {
    marginHorizontal: 10,
  },
})

export default ConfirmActionDialog