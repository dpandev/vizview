import React, { useState, useEffect, useContext } from 'react'
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

  const [errorTitle, setErrorTitle] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const [confirmActionTitle, setConfirmActionTitle] = useState(null)
  const [confirmActionDialog, setConfirmActionDialog] = useState(null)
  const [confirmActionInput, setConfirmActionInput] = useState('')
  const [confirmActionInput2, setConfirmActionInput2] = useState('')
  const [confirmActionPlaceholder, setConfirmActionPlaceholder] = useState(null)
  const [confirmActionPlaceholder2, setConfirmActionPlaceholder2] = useState(null)
  const [confirmAction, setConfirmAction] = useState(() => () => {})
  
  const settings = {
    test1: {
      name: 'Guest Account',
      active: true,
    },
    test2: {
      name: 'Push Notifications',
      active: false,
    },
    test3: {
      name: 'Dark Mode (Future Update)',
      active: false,
    },
  }

  const setConfirmBoxToEmpty = () => {
    setConfirmActionPlaceholder(null)
    setConfirmActionPlaceholder2(null)
    setConfirmActionDialog(null)
    setConfirmActionTitle(null)
    setConfirmActionInput('')
    setConfirmActionInput2('')
    setConfirmAction(() => () => {})
  }

  const setServerErrorMessage = (errorType, errorObj) => {
    console.log('ServerErrorMessage: ', errorObj)
    setConfirmBoxToEmpty()
    setErrorTitle('Server Error')
    setErrorMessage('An error has occurred while updating your ', errorType, '. Try again.')
  }

  const setGeneralErrorMessage = (errorType, errorMsg, errorObj) => {
    console.log('GeneralErrorMessage: ', errorObj)
    setConfirmBoxToEmpty()
    setErrorTitle(errorType)
    setErrorMessage(errorMsg)
  }

  const setActionDialogComponent = (func, placeholder1, title, message, placeholder2) => {
    setConfirmBoxToEmpty()
    setConfirmAction(() => func)
    setConfirmActionTitle(title)
    setConfirmActionPlaceholder(placeholder1)
    placeholder2 && setConfirmActionPlaceholder2(placeholder2)
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
      .catch((error) => {
        setServerErrorMessage('username', error)
      })
  }

  const onEditUsername = () => {
    setActionDialogComponent(
      updateUsername,
      'username',
      'Update Username',
      'Enter your new username below.'
    )
  }

  const getUserCreds = (currentPassword) => {
    // const signInProvider = user.providerData.providerID
    let credentials = emailProvider.credential(
      user.email,
      currentPassword
    )
    // console.log(signInProvider)  //for other auth providers
    // switch (signInProvider) {
    //   case 'password':
    //     credentials = emailProvider.credential(
    //       user.email,
    //       currentPassword
    //     )
    //     break
    //   case 'phone':
    //     //
    //     break
    //   case 'google.com':
    //     //
    //     break
    //   case 'facebook.com':
    //     //
    //     break
    //   case 'apple.com':
    //     //
    //     break
    //   default:
    //     //
    //     break
    // }
    return credentials
  }

  const reAuthUser = async (password) => {
    await auth.currentUser
      .reauthenticateWithCredential(getUserCreds(password))
  }

  const updatePassword = (input1, input2) => {  //TODO: check for providerData and then choose approriate provider re-auth method
    //currently just using email provider
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
      'Update Password',
      'Enter your current and new passwords.',
      'new password'
    )
  }

  const deleteAccount = (input) => {
    reAuthUser(input)
      .then(() => {
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
  }

  const onEditEmailAddress = () => {
    setActionDialogComponent(
      updateEmailAddress,
      'password',
      'Update Email Address',
      'Please enter your current password and your new email address.',
      'email'
    )
  }

  const onConfirmButtonPressed = () => {
    confirmAction(confirmActionInput, confirmActionInput2)
  }

  const onSignOutPressed = () => {
    auth.signOut()
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.accountInfo}>
          <Text>
            <Text style={styles.textLeft}>{'Logged in as:'}</Text>{' '}
            <Text style={styles.textRight}>{user.email}</Text>
          </Text>
        </View>
        <View style={styles.accountInfo}>
          <Text>
            <Text style={styles.textLeft}>{'Username:'}</Text>{' '}
            <Text style={styles.textRight}>{user.displayName}</Text>
          </Text>
        </View>
        
        {Object.values(settings).map((setting, index) => ( 
          //need to pass setting active state to toggle and send state back to here from toggle,or just update here seperately
          <View style={styles.option} key={index}>
            <Text style={styles.optionTextValue}>{setting.name}</Text>
            <Text styles={styles.optionTextValue}>{setting.active ? 'Enabled' : 'Disabled'}</Text>
            <ToggleSwitch activeState={setting.active} />
          </View>
        ))}

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
          placeholder2={confirmActionPlaceholder2}
          inputText2={confirmActionInput2}
          setInputText2={setConfirmActionInput2}
          button={"Cancel"}
          onDismiss={setConfirmBoxToEmpty} 
          button2={'Confirm'}
          onButton2Press={onConfirmButtonPressed}
        />

      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
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

export default DefaultSettings