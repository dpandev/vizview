import {  
  Text, 
  StyleSheet, 
  ScrollView
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import CustomRadioGroup from '../../components/CustomRadioGroup'
import { db } from '../../../firebase'
import ErrorMessage from '../../components/ErrorMessage'

const VisitorForm = ({ navigation }) => {
  const [barbersList, setBarbersList] = useState([])
  const [name, setName] = useState('')
  const [barber, setBarber] = useState('')
  const [comment, setComment] = useState('')
  const [errorTitle, setErrorTitle] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const barberCollection = db.collection('users').where('accountType', 'in', ['barber', 'admin'])
  const dbAccounts = db.collection('users')

  useFocusEffect(
    useCallback(() => {
      let mounted = true
      const getBarbers = async () => {
        let list = []
        await barberCollection.get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              list.push({
                ...doc.data(),
                uid: doc.id
              })
            })
          })
          .catch((error) => {
            setErrorTitle('Server Error')
            setErrorMessage('An error occurred while fetching list of barbers.')
          })
          .then(() => {
            if (mounted) {
              setBarbersList(list)
            }
          })
      }
      getBarbers()
      return function cleanUp() {
        mounted = false
      }
    }, [])
  )

  const validate = () => {
    let valid = true
    if (name === '') {
      valid = false
    }
    if (barber === '') {
      valid = false
    }
    return valid
  }

  const onCheckinPressed = () => {
    if (!validate()) {
      setErrorTitle('Incomplete Form')
      setErrorMessage('Please make sure you enter your name and select a barber from the list.')
    } else {
      dbAccounts.doc(barber)
        .collection('checkins')
        .add({
          name: name,
          comment: comment,
          createdAt: new Date()
        })
        .then(sendNotification())
        .then(navigation.navigate('PostCheckin'))
        .catch((error) => {
          setErrorTitle('Server Error')
          setErrorMessage("An error occurred while checking in.")
        })
    }
  }

  const onBackToHomePressed = () => {
    navigation.navigate('VisitorCheckin')
  }

  const sendNotification = async () => {
    let tokens = await dbAccounts
      .doc(barber)
      .get()
      .then(doc => doc.get('tokens'))

    tokens.forEach(token => {
      fetch ('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: `{ 
          "to": "${token}", 
          "title": "${name} has checked in!", 
          "body": "${comment}" 
        }`
      })
      .catch((error) => {
        setErrorTitle("Notification Error")
        setErrorMessage("An error occurred while attempting to send a checkin notification.")
      })
    })
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}} style={styles.container}>
      <SafeAreaView style={styles.root}>
        <Text style={styles.title}>Please fill out the form below</Text>
        <CustomInput 
          placeholder='Enter your name' 
          value={name} 
          setValue={setName} 
        />

        <Text style={styles.text}>{"Which barber do you have an appointment with? (Select one)"}</Text>

        <CustomRadioGroup 
          value={barber} 
          setValue={setBarber} 
          options={barbersList}
        />

        <CustomInput 
          placeholder='Additional Comments (optional)' 
          value={comment} 
          setValue={setComment} 
        />

        <CustomButton onPress={onCheckinPressed} text={"Check in"} />

        <CustomButton
          onPress={onBackToHomePressed} 
          text={"Back to Home"} 
          type="TERTIARY"
        />
  
        <ErrorMessage 
          visible={errorMessage != null} 
          title={errorTitle}
          message={errorMessage} 
          button={"Close"}
          onDismiss={setErrorMessage} 
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
  },
  root: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },
  text: {
    color: 'black',
    marginTop: 25,
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    maxWidth: 400,
  },
})

export default VisitorForm