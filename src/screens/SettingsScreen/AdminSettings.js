import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import ToggleSwitch from './ToggleSwitch';

export default function AdminSettings({ navigation }) {
  
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
      <ScrollView>
        <View style={styles.container}>
          <Text>AdminSettings</Text>
        </View>
        {Object.values(settings).map((setting, index) => ( 
          //need to pass setting active state to toggle and send state back to here from toggle,or just update here seperately
          <View style={styles.option} key={index}>
            <Text>{setting.name}</Text>
            <ToggleSwitch activeState={setting.active} />
            <Text>{setting.active.toString()}</Text>
          </View>
        ))}
      </ScrollView>
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
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});