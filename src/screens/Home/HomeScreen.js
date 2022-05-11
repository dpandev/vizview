import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../../components/Logo'
import { auth } from '../../../firebase'
import CustomButton from '../../components/CustomButton'

const HomeScreen = ({ navigation }) => {

  const onSignOut = () => {
    auth.signOut()
  }

  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <Text style={styles.brandText}>
        {'VizView'}
      </Text>
      <Text>Email: {auth.currentUser?.email}</Text>
      <CustomButton onPress={onSignOut} text='Sign out' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  brandText: {
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 75,
  },
})

export default HomeScreen