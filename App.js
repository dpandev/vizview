import React, { useEffect } from 'react'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppRoutes from './src/Navigation'
import { LogBox } from 'react-native'
import { auth, db, firebase } from './firebase'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native-web'

LogBox.ignoreLogs(['Setting a timer'])

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',
    accent: 'black',
    //text: 'black',
    //background: '#F9FBFC',
    //surface: 'blue',
  },
  // dark: true,
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  })
})

async function setDeviceToken(userUID) {
  let token

  if (Device.isDevice) {
    const {status: existingStatus} = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const {status} = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }

    if (finalStatus !== 'granted') {
      console.error('Failed to get push token for push notification.')
      return
    }

    token = (await Notifications.getExpoPushTokenAsync()).data

  } else {
    console.log('needs to be physical device')
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  return token
}

export default function App() {

  const registerDevicePushTokenAsync = async () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        let userToken
        setDeviceToken(user.uid)
          .then((res) => {
            userToken = res
          })
          .then(() => {
            db.collection('users').doc(user.uid).update({
              tokens: firebase.firestore.FieldValue.arrayUnion(userToken)
            })
          })
      }
    })
  }

  useEffect(() => {
    const subscription = Notifications.addPushTokenListener(registerDevicePushTokenAsync)
    return () => subscription.remove()
  }, [])

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <AppRoutes />
      </PaperProvider>
    </SafeAreaProvider>
  )
}
