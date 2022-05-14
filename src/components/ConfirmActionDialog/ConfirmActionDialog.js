import React from 'react'
import { StyleSheet } from 'react-native'
import { Dialog, Button, Paragraph, TextInput } from 'react-native-paper'

const ConfirmActionDialog = ({ 
  visible, 
  title, 
  message, 
  placeholder1,
  inputText, 
  setInputText, 
  placeholder2,
  inputText2, 
  setInputText2, 
  button, 
  button2, 
  onDismiss, 
  onButton2Press 
}) => {

  return (
    <Dialog visible={visible} onDismiss={() => onDismiss()}>
      <Dialog.Title>⚠️ {title}</Dialog.Title>
      <Dialog.Content>
        <Paragraph>{message}</Paragraph>
        <TextInput
          label=''
          mode='outlined'
          placeholder={placeholder1}
          value={inputText}
          onChangeText={(input) => setInputText(input)}
          style={styles.textInput}
        />
        {placeholder2 != null
          ? <TextInput 
              label=''
              mode='outlined'
              placeholder={placeholder2}
              value={inputText2}
              onChangeText={(input) => setInputText2(input)}
              style={styles.textInput}
            />
          : <></>
        }
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={() => onDismiss()}>{button}</Button>
        {button2 && <Button onPress={() => onButton2Press()}>{button2}</Button>}
      </Dialog.Actions>
    </Dialog>
  )
}

const styles = StyleSheet.create({
  textInput: {
    marginVertical: 10,
  },
})

export default ConfirmActionDialog