import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../../components/Logo'

const HomeScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
      <Logo />
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
})

export default HomeScreen