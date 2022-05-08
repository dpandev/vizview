import React from 'react'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppRoutes from './src/Navigation'
import { LogBox } from 'react-native'
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

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <AppRoutes />
      </PaperProvider>
    </SafeAreaProvider>
  )
}
