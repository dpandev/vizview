import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/CustomButton'
import ErrorMessage from '../../components/ErrorMessage'
import ConfirmActionDialog from '../../components/ConfirmActionDialog'
import { db } from '../../../firebase'

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

  const setActionDialogComponent = (
    func, 
    placeholder1, 
    secure1, 
    title, 
    message, 
    placeholder2, 
    secure2
    ) => {
      setConfirmBoxToEmpty()
      setConfirmAction(() => func)
      setConfirmActionTitle(title)
      setConfirmActionPlaceholder(placeholder1)
      placeholder2 && setConfirmActionPlaceholder2(placeholder2)
      setConfirmActionSecure(secure1)
      setConfirmActionSecure2(secure2)
      setConfirmActionDialog(message)
  }

  const setServerErrorMessage = (errorType, errorObj) => {
    setConfirmBoxToEmpty()
    console.log('ServerErrorMessage: ', errorObj)
    setErrorTitle('Server Error')
    setErrorMessage('An error has occurred while updating your ' + errorType + '. Try again.')
  }

  const setGeneralErrorMessage = (errorType, errorMsg, errorObj) => {
    setConfirmBoxToEmpty()
    console.log('GeneralErrorMessage: ', errorObj)
    setErrorTitle(errorType)
    setErrorMessage(errorMsg)
  }

  const onConfirmButtonPressed = () => {
    confirmAction(confirmActionInput, confirmActionInput2)
  }

  const onManageBarbers = () => {
    navigation.navigate('ManageBarbers')
  }

  const updateAuthCode = async (oldCode, newCode) => {
    if (oldCode === '' || newCode === '') {
      setGeneralErrorMessage(
        'Validation Error',
        'Input cannot be empty.',
        null
      )
    } else {
      const dbCode = db.collection('validation').doc('authorization')
        await dbCode.get()
          .then((doc) => {
            if (doc.data().code === oldCode) {
              dbCode.update({
                code: newCode
              })
              .then(() => {
                setGeneralErrorMessage(
                  'Success',
                  'Authorization code was updated successfully!',
                  null
                )
              })
              .catch((error) => {
                setServerErrorMessage(
                  'authorization code',
                  error
                )
              })
            } else {
              setGeneralErrorMessage(
                'Authorization Code',
                'Old authorization code is invalid.',
                null
              )
            }
          })
          .catch((error) => {
            setServerErrorMessage(
              'auth code',
              error
            )
          })
        }
  }

  const onChangeCode = async () => {
    setActionDialogComponent(
      updateAuthCode,
      'old authorization code',
      false,
      'Change Authorization Code',
      'Enter your old and new authorization codes below',
      'new authorization code',
      false
    )
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
      <SafeAreaView style={styles.container}>

        <CustomButton onPress={onManageBarbers} text='Manage Barbers' type='SECONDARY' />
        <CustomButton onPress={onChangeCode} text='Change Authorization Code' type='SECONDARY' />

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