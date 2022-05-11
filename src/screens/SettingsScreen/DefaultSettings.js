import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native-paper'
import ToggleSwitch from '../../components/ToggleSwitch'
import CustomButton from '../../components/CustomButton'
import { auth, db } from '../../../firebase'

const DefaultSettings = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState([])
  
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

  useEffect(() => {
    const unsubscribe = getUserData()
    return unsubscribe
  }, [])

  const getUserData = () => {
    let data = []
    const task = db.collection('barbers').where('email', '==', auth.currentUser.email).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        data.push({
          ...doc.data(),
      })
        setUserInfo(data[0])
      })
    }).catch((error) => {
      console.log('Error: ', error)
    })
    return task
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
        <Text style={styles.title}>Settings</Text>
        <View style={styles.accountInfo}>
          <Text>
            <Text style={styles.textLeft}>{'Logged in as:'}</Text>{' '}
            <Text style={styles.textRight}>{auth.currentUser?.email}</Text>
          </Text>
        </View>
        <View style={styles.accountInfo}>
          <Text>
            <Text style={styles.textLeft}>{'Username:'}</Text>{' '}
            <Text style={styles.textRight}>{userInfo.name}</Text>
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