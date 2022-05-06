import {  
  Text, 
  StyleSheet, 
  ScrollView
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import CustomRadioGroup from '../../components/CustomRadioGroup'
import { useNavigation } from '@react-navigation/native'

const VisitorForm = () => {
  const barbers = {
    barber1: {
      value: 'Mike',
      label: 'Mike',
    },
    barber2: {
      value: 'Kelly',
      label: 'Kelly',
    },
    barber3: {
      value: 'Eric',
      label: 'Eric',
    },
    barber4: {
      value: 'Alycia',
      label: 'Alycia',
    },
    barber5: {
      value: 'Sean',
      label: 'Sean',
    },
    // key: function(n) {
    //   return this[Object.keys(this)[n]]
    // },
  }

  const navigation = useNavigation()

  const [name, setName] = useState('')
  const [barber, setBarber] = useState('')
  const [comment, setComment] = useState('')

  const onCheckinPressed = () => {
    console.warn('Checkin Pressed')
  }

  const onBackToHomePressed = () => {
    navigation.navigate('VisitorCheckin')
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.root}>
        <Text style={styles.title}>Please fill out the form below</Text>
        <CustomInput 
          placeholder='Enter your name' 
          value={name} 
          setValue={setName} 
        />

        <Text style={styles.text}>{"Which barber do you have an appointment with?"}</Text>

        <CustomRadioGroup 
          value={barber} 
          setValue={setBarber} 
          options={barbers}
        />

        <CustomInput 
          placeholder='Additional Comments' 
          value={comment} 
          setValue={setComment} 
        />

        <CustomButton onPress={onCheckinPressed} text={"Check in"} />

        <CustomButton
          onPress={onBackToHomePressed} 
          text={"Back to Home"} 
          type="TERTIARY"
        />
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
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
  },
})

export default VisitorForm