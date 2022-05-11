import React from 'react'
import { Dialog, Button, Paragraph } from 'react-native-paper'

const ErrorMessage = ({ visible, title, message, button, button2, onDismiss, onButton2Press }) => {

  return (
    <Dialog visible={visible} onDismiss={() => onDismiss(null)}>
      <Dialog.Title>⚠️ {title}</Dialog.Title>
      <Dialog.Content>
        <Paragraph>{message}</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={() => onDismiss(null)}>{button}</Button>
        {button2 && <Button onPress={() => onButton2Press()}>{button2}</Button>}
      </Dialog.Actions>
    </Dialog>
  )
}

export default ErrorMessage