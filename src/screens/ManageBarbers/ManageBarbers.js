import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect } from 'react'
import { auth, db } from '../../../firebase'
import CustomInfoButton from '../../components/CustomInfoButton'
import ConfirmActionDialog from '../../components/ConfirmActionDialog'
import ErrorMessage from '../../components/ErrorMessage'

const ManageBarbers = () => {
  const [usersList, setUsersList] = useState([])

  const [selectedUser, setSelectedUser] = useState({})
  const [accountOption, setAccountOption] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [hasChanged, setHasChanged] = useState(false)

  const [errorTitle, setErrorTitle] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const dbAccounts = db.collection('users').where('accountType', 'in', ['barber', 'guest'])
  const dbCollection = db.collection('users')

  const setConfirmBoxToEmpty = () => {
    setIsVisible(false)
    setAccountOption('')
    setSelectedUser({})
  }

  const cancelActionWithError = (title, message, errorObj) => {
    errorObj && console.log(errorObj.message)
    setConfirmBoxToEmpty()
    setErrorTitle(title)
    setErrorMessage(message)
  }

  const changeAccountType = (action) => {
    if (action === 'add') {
      //change account in db to barber
      dbCollection.doc(selectedUser.id).update({
        accountType: 'barber',
      })
      .then(() => {
        setConfirmBoxToEmpty()
        setHasChanged(true)
      })
      .catch((error) => {
        cancelActionWithError(
          'Server Error',
          'An error occurred while adding the user to the barber list.',
          error
        )
      })
    } else if (action === 'remove') {
      //change account in db to guest
      dbCollection.doc(selectedUser.id).update({
        accountType: 'guest',
      })
      .then(() => {
        setConfirmBoxToEmpty()
        setHasChanged(true)
      })
      .catch((error) => {
        cancelActionWithError(
          'Server Error',
          'An error occurred while adding the user to the barber list.',
          error
        )
      })
    } else {
      cancelActionWithError(
        'Internal Error',
        'No valid action was set.',
      )
    }
  }

  const onUserPressed = (item) => {
    setIsVisible(true)
    setSelectedUser(item)
    if (item.accountType === 'barber') {
      setAccountOption('remove')
    } else if (item.accountType === 'guest') {
      setAccountOption('add')
    }
  }

  useEffect(() => {
    let mounted = true
    setIsLoading(true)
    const getUserList = async () => {
      let list = []
      await dbAccounts.get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            list.push({
              ...doc.data(),
              id: doc.id
            })
          })
        })
        .then(() => {
          if (mounted) {
            setIsLoading(false)
            setUsersList(list)
          }
        })
        .catch((error) => {
          cancelActionWithError(
            'Server Error',
            'An error occurred while fetching the list of users.',
            error
          )
        })
    }
    getUserList()
    return function cleanUp() {
      mounted = false
    }
  }, [hasChanged])

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Manage Barbers</Text>

        <ActivityIndicator
          animating={isLoading}
          color={'tomato'}
          hidesWhenStopped={true}
          size={'large'}
          style={styles.loadingCircle}
        />

        {usersList.map((item, id) => (
          <CustomInfoButton 
            key={id} 
            onPress={() => onUserPressed(item)} 
            title={item.name} 
            text={item.email} 
            date={item.createdAt.seconds} 
            text2={item.accountType}
          />
        ))}

        <ErrorMessage 
          visible={errorMessage != null} 
          title={errorTitle}
          message={errorMessage} 
          button={"Close"}
          onDismiss={setErrorMessage} 
        />

        <ConfirmActionDialog 
          visible={isVisible}
          title={'Account Type Change'}
          message={
            "Would you like to "+ accountOption + " " + selectedUser.name + 
            `${accountOption === 'add' ? ' to' : ' from'}` + " the barber list?"
          }
          button={"Cancel"}
          onDismiss={setConfirmBoxToEmpty}
          button2={'Yes'}
          onButton2Press={() => changeAccountType(accountOption)}
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
    padding: 20,
    width: '100%',
    maxHeight: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },
  loadingCircle: {},
})

export default ManageBarbers