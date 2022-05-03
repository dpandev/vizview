import { useState } from 'react';
import { StyleSheet, View, ScrollView, StatusBar } from 'react-native';
import { Button, Text } from 'react-native-paper';
import ToggleSwitch from './ToggleSwitch';

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
    <ScrollView>
      <View style={styles.container}>
        <Text>SettingsScreen</Text>
      </View>
      {Object.values(settings).map((setting) => ( //need to pass setting ative state to toggle and send state back to here from toggle,or just update here seperately
        //pass st
        <View style={styles.option}>
          <Text>{setting.name}</Text>
          <ToggleSwitch activeState={setting.active} />
          <Text>{setting.active.toString()}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight + 30 : 0,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});