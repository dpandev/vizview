import React from 'react'
import { Dialog, Button, Paragraph } from 'react-native-paper'

const ErrorMessage = ({ visible, title, message, button, onDismiss }) => {

  return (
    <Dialog visible={visible} onDismiss={() => onDismiss(false)}>
      <Dialog.Title>{title} ⚠️</Dialog.Title>
      <Dialog.Content>
        <Paragraph>{message}</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={() => onDismiss(false)}>{button}</Button>
      </Dialog.Actions>
    </Dialog>
  )
}

export default ErrorMessage