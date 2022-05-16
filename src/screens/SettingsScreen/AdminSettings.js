import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/CustomButton'
import ErrorMessage from '../../components/ErrorMessage'
import ConfirmActionDialog from '../../components/ConfirmActionDialog'

const AdminSettings = ({ navigation }) => {

  const [errorTitle, setErrorTitle] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const [confirmActionTitle, setConfirmActionTitle] = useState(null)
  const [confirmActionDialog, setConfirmActionDialog] = useState(null)
  const [confirmActionInput, setConfirmActionInput] = useState('')
  const [confirmActionInput2, setConfirmActionInput2] = useState('')
  const [confirmActionPlaceholder, setConfirmActionPlaceholder] = useState(null)
  const [confirmActionPlaceholder2, setConfirmActionPlaceholder2] = useState(null)
  const [confirmActionSecure, setConfirmActionSecure] = useState(false)
  const [confirmActionSecure2, setConfirmActionSecure2] = useState(false)
  const [confirmAction, setConfirmAction] = useState(() => () => {})

  const setConfirmBoxToEmpty = () => {
    setConfirmActionDialog(null)
    setConfirmActionPlaceholder(null)
    setConfirmActionPlaceholder2(null)
    setConfirmActionTitle(null)
    setConfirmActionInput('')
    setConfirmActionInput2('')
    setConfirmActionSecure(false)
    setConfirmActionSecure2(false)
    setConfirmAction(() => () => {})
  }

  const onConfirmButtonPressed = () => {
    confirmAction(confirmActionInput, confirmActionInput2)
  }

  const onManageBarbers = () => {
    navigation.navigate('ManageBarbers')
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
      <SafeAreaView style={styles.container}>

        <CustomButton onPress={onManageBarbers} text='Manage Barbers' type='SECONDARY' />

        <ErrorMessage 
          visible={errorMessage != null} 
          title={errorTitle}
          message={errorMessage} 
          button={"Close"}
          onDismiss={setErrorMessage} 
        />

        <ConfirmActionDialog
          visible={confirmActionDialog != null} 
          title={confirmActionTitle}
          message={confirmActionDialog} 
          placeholder1={confirmActionPlaceholder}
          inputText={confirmActionInput}
          setInputText={setConfirmActionInput}
          secureText1={confirmActionSecure}
          placeholder2={confirmActionPlaceholder2}
          inputText2={confirmActionInput2}
          setInputText2={setConfirmActionInput2}
          button={"Cancel"}
          onDismiss={setConfirmBoxToEmpty} 
          button2={'Confirm'}
          onButton2Press={onConfirmButtonPressed}
          secureText2={confirmActionSecure2}
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
    maxHeight: '100%',
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    maxWidth: 400,
  },
  optionTextValue: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },
  textLeft: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  textRight: {
    flex: 1,
    fontWeight: 'bold',
    color: 'tomato',
  },
})

export default AdminSettings