import React from 'react'
import { StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AdminSettings from './AdminSettings';

export default function SettingsScreen({ navigation }) {
  
  const settings = {
    test1: {
      name: 'testOne',
      active: true,
    },
    test2: {
      name: 'testTwo',
      active: false,
    },
    test3: {
      name: 'testThree',
      active: false,
    },
  }

  return (
    <SafeAreaView>
      <AdminSettings />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight + 30 : 0,
  },
});