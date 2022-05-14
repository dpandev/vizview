import {  
  Text, 
  StyleSheet, 
  ScrollView
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
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
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    let mounted = true
    const getBarbers = async () => {
      let list = []
      await db.collection('barbers')
        .get()
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
            setBarbersList(list)
          }
        })
    }
    getBarbers()
    return function cleanUp() {
      mounted = false
    }
  }, [])

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
      setErrorMessage('Please make sure you enter your name and select a barber from the list.')
    } else {
      db.collection('barbers').doc(barber)
        .collection('checkins')
        .add({
          name: name,
          comment: comment,
          createdAt: new Date()
        })
        .catch((error) => console.log(error))
        .then(navigation.navigate('PostCheckin'))
    }
  }

  const onBackToHomePressed = () => {
    navigation.navigate('VisitorCheckin')
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
          title={"Incomplete Form"}
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