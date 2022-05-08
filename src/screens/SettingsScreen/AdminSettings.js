import React, { useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native-paper'
import ToggleSwitch from './ToggleSwitch'
import CustomButton from '../../components/CustomButton/CustomButton'
import { auth, db } from '../../../firebase'

export default function AdminSettings({ navigation }) {
  
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
      name: 'Dark Mode',
      active: false,
    },
  }

  const onSignOutPressed = () => {
    auth.signOut()
  }

  const onDeleteAccount = () => {
    console.warn('Delete Account')
  }

  const onEditUsername = () => {
    console.warn('Edit Username')
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>Settings</Text>
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
        <CustomButton onPress={onDeleteAccount} text='Delete Account' type='SECONDARY' />
        <CustomButton onPress={onSignOutPressed} text='Sign out' />
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
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
})