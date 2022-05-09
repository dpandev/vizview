import React from 'react'
import { Dialog, Button, Paragraph } from 'react-native-paper'

const ErrorMessage = ({ visible, title, message, button, onDismiss }) => {

  return (
    <Dialog visible={visible} onDismiss={() => onDismiss(null)}>
      <Dialog.Title>{title} ⚠️</Dialog.Title>
      <Dialog.Content>
        <Paragraph>{message}</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={() => onDismiss(null)}>{button}</Button>
      </Dialog.Actions>
    </Dialog>
  )
}

export default ErrorMessage