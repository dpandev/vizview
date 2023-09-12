import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { getReactNativePersistence, initializeAuth } from 'firebase/auth/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${process.env.EXPO_PUBLIC_API_KEY}`,
  authDomain: `${process.env.EXPO_PUBLIC_AUTH_DOMAIN}`,
  projectId: `${process.env.EXPO_PUBLIC_PROJECT_ID}`,
  storageBucket: `${process.env.EXPO_PUBLIC_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.EXPO_PUBLIC_MSG_SENDER_ID}`,
  appId: `${process.env.EXPO_PUBLIC_APP_ID}`
}

// Initialize Firebase
let app
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
  initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  })
} else {
  app = firebase.app()
}

const auth = firebase.auth()
const db = firebase.firestore()
const emailProvider = firebase.auth.EmailAuthProvider

export { auth, db, emailProvider, firebase }

