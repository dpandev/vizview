import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../../components/Logo/Logo'
import CustomButton from '../../components/CustomButton/CustomButton'

const VisitorCheckinScreen = ({ navigation }) => {

  const onBtnPressed = () => {
    navigation.navigate('VisitorForm')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <Text style={styles.titleText}>
        Welcome to
      </Text>
      <Text style={styles.companyText}>
        {'ProForm Cut & Shave'}
      </Text>
      <CustomButton onPress={onBtnPressed} text='Tap to check in' />
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  companyText: {
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 75,
  },
  titleText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 30,
    marginBottom: 15,
  },
})

export default VisitorCheckinScreen