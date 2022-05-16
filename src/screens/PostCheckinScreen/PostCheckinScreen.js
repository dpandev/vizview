import { Text, StyleSheet, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/CustomButton/CustomButton'

const PostCheckinScreen = ({ navigation }) => {

  const onBackToCheckin = () => {
    navigation.navigate('VisitorCheckin')
  }

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.heading}>{"You're checked in!"}</Text>
      <Text style={styles.subheading}>{"Your barber will be with you in a moment."}</Text>

      <CustomButton onPress={onBackToCheckin} text='Back to check in' />
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },
  subheading: {
    color: 'black',
    marginTop: 25,
    marginBottom: 25,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default PostCheckinScreen