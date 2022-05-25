import React, { useState, useEffect } from 'react'
import { Switch } from 'react-native'
import { StyleSheet, View, Text } from 'react-native'

const ToggleSwitch = (activeState, onToggleChange, settingTitle) => {

  return (
    <View style={styles.option}>
      <Text style={styles.optionTextValue}>{settingTitle}</Text>
      <Text style={styles.activeIdentifier}>{activeState ? 'Enabled' : 'Disabled'}</Text> 
      <Switch 
        value={activeState} 
        onValueChange={() => onToggleChange} 
        style={styles.switch} 
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={"black"}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  optionTextValue: {
    marginRight: 5,
    fontWeight: 'bold',
    color: 'black',
  },
  activeIdentifier: {
    marginRight: 10,
  },
  switch: {},
})

export default ToggleSwitch