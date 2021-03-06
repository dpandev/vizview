import React, { useState, useContext, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native-paper'
import ToggleSwitch from '../../components/ToggleSwitch'
import CustomButton from '../../components/CustomButton'
import ErrorMessage from '../../components/ErrorMessage'
import ConfirmActionDialog from '../../components/ConfirmActionDialog'
import { auth, db, emailProvider } from '../../../firebase'
import { AuthenticatedUserContext } from '../../Navigation/AuthenticatedUserProvider'

const DefaultSettings = ({ navigation }) => {
  const { user } = useContext(AuthenticatedUserContext)

  const [activeToggle, setActiveToggle] = useState(true)

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

  const updateUsername = (input) => {
    auth.currentUser
      .updateProfile({
        displayName: input
      })
      .then(() => {
        setGeneralErrorMessage(
          'Success',
          'Username was updated successfully!',
          null
        )
      })
      .then(() => {
        db.collection('users').doc(auth.currentUser.uid).update({
          name: input,
        })
        .catch((error) => {
          setServerErrorMessage('db username', error)
        })
      })
      .catch((error) => {
        setServerErrorMessage('username', error)
      })
  }

  const onEditUsername = () => {
    setActionDialogComponent(
      updateUsername,
      'username',
      false,
      'Update Username',
      'Enter your new username below.'
    )
  }

  const getUserCreds = (currentPassword) => {
    let credentials = emailProvider.credential(
      user.email,
      currentPassword
    )
    return credentials
  }

  const reAuthUser = async (password) => {
    await auth.currentUser
      .reauthenticateWithCredential(getUserCreds(password))
  }

  const updatePassword = (input1, input2) => {
    reAuthUser(input1)
      .then(() => {
        if (input1 === input2) {
          setGeneralErrorMessage(
            'Invalid Password',
            'New password cannot match previous password. Try again.',
            null
          )
        } else if (input2.length < 6) {
          setGeneralErrorMessage(
            'Invalid Password',
            'New passsword should be at least 6 characters in length.',
            null
          )
        } else {
          //update pass func here
          auth.currentUser
            .updatePassword(input2)
            .then(() => {
              setGeneralErrorMessage(
                'Success',
                'Password was updated successfully!',
                null
              )
            })
            .catch((error) => {
              setServerErrorMessage('password', error)
            })
        }
      })
      .catch((error) => {
        setGeneralErrorMessage(
          'Authentication Error',
          'Your input for current password is incorrect. Try again.',
          error
        )
      })
  }

  const onChangePassword = () => {
    setActionDialogComponent(
      updatePassword,
      'current password',
      true,
      'Update Password',
      'Enter your current and new passwords.',
      'new password',
      true,
    )
  }

  const deleteAccount = (input) => {
    reAuthUser(input)
      .then(() => {
        //set associated db collection account type
        db.collection('users').doc(user.uid).update({
          accountType: 'deleted'
        })
        .catch((error) => {
          setServerErrorMessage('account data', error)
        })
        //delete account
        auth.currentUser.delete()
          .then(() => {
            setConfirmBoxToEmpty()
          })
          .catch((error) => {
            setServerErrorMessage('account', error)
          })
      })
      .catch((error) => {
        setGeneralErrorMessage(
          'Authentication Error',
          'Your input for current password is incorrect. Try again.',
          error
        )
      })
  }

  const onDeleteAccount = () => {
    setActionDialogComponent(
      deleteAccount,
      'password',
      true,
      'Are you sure?',
      'Please enter your current password to confirm your account deletion.',
    )
  }

  const updateEmailAddress = (input) => {
    reAuthUser(input)
      .then(() => {
        auth.currentUser.updateEmail(input)
          .then(() => {
            setGeneralErrorMessage(
              'Success',
              'Email has been updated successfully!',
              null
            )
          })
          .catch((error) => {
            setServerErrorMessage('email', error)
          })
      })
      .catch((error) => {
        setServerErrorMessage('email', error)
      })
  }

  const onEditEmailAddress = () => {
    setActionDialogComponent(
      updateEmailAddress,
      'password',
      true,
      'Update Email Address',
      'Please enter your current password and your new email address.',
      'email',
      false,
    )
  }

  const updateToggle = () => {
    console.log(activeToggle)
    setActiveToggle(prevState => !prevState)
    console.log('set toggle:', activeToggle)
  }

  const onConfirmButtonPressed = () => {
    confirmAction(confirmActionInput, confirmActionInput2)
  }

  const onSignOutPressed = () => {
    auth.signOut()
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.accountInfo}>
          <Text>
            <Text style={styles.textLeft}>{'Email:'}</Text>{' '}
            <Text style={styles.textRight}>{user.email}</Text>
          </Text>
        </View>
        <View style={[styles.accountInfo, styles.marginBottom]}>
          <Text>
            <Text style={styles.textLeft}>{'Username:'}</Text>{' '}
            <Text style={styles.textRight}>{user.displayName}</Text>
          </Text>
        </View>

        {/* <View style={styles.toggle}>
          <ToggleSwitch activeState={activeToggle} onToggleChange={updateToggle} settingTitle={'Dark Mode'} />
        </View> */}

        <CustomButton onPress={onEditUsername} text='Edit Username' type='SECONDARY' />
        <CustomButton onPress={onEditEmailAddress} text='Change Email Address' type='SECONDARY' />
        <CustomButton onPress={onChangePassword} text='Change Password' type='SECONDARY' />
        <CustomButton onPress={onDeleteAccount} text='Delete Account' type='SECONDARY' />
        <CustomButton onPress={onSignOutPressed} text='Sign out' />

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
  },
  marginBottom: {
    marginBottom: 25,
  },
  toggle: {
    maxWidth: 400,
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
    fontSize: 17,
  },
  textRight: {
    flex: 1,
    fontWeight: 'bold',
    color: 'tomato',
    fontSize: 17,
  },
})

export default DefaultSettings