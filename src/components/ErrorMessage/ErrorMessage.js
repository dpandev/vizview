import React from 'react'
import { StyleSheet } from 'react-native'
import { Dialog, Button, Paragraph } from 'react-native-paper'

const ErrorMessage = ({ visible, title, message, button, button2, onDismiss, onButton2Press }) => {

  return (
    <Dialog visible={visible} onDismiss={() => onDismiss(null)} style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    width: '90%',
    maxWidth: 500,
    alignSelf: 'center',
    borderRadius: 5,
  },
})

export default ErrorMessage