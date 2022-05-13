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
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core'])

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

async function setDeviceToken(email) {
  let token

  if (Device.isDevice) {
    const {status: existingStatus} = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const {status} = await Notifications.requestPermissionsAsync();
      finalStatus = status
    }

    if (finalStatus !== 'granted') {
      console.error('Failed ot get push token for push notification.')
    }

    token = (await Notifications.getExpoPushTokenAsync()).data
  }

  db.collection('barbers').doc(email).update({
    tokens: firebase.firestore.FieldValue.arrayUnion(token)
  })

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
}

export default function App() {
  useEffect(() => {
    (async () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setDeviceToken(user.email)
        }
      })
    })
  })


  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <AppRoutes />
      </PaperProvider>
    </SafeAreaProvider>
  )
}
