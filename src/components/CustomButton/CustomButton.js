import { Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

const CustomButton = ({ onPress, text, type='PRIMARY', bgColor, fgColor }) => {
  return (
    <Pressable 
      onPress={onPress} 
      style={[
        styles.container, 
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {},
      ]}>
      <Text 
        style={[
          styles.text, 
          styles[`text_${type}`],
          fgColor ? {color: fgColor} : {},
        ]}>
          {text}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  container_PRIMARY: {
    backgroundColor: 'black',
  },
  container_SECONDARY: {
    borderColor: 'black',
    borderWidth: 2,
  },
  container_TERTIARY: {},
  text: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 0.35,
  },
  text_SECONDARY: {
    color: 'black',
  },
  text_TERTIARY: {
    color: 'grey',
  },
})

export default CustomButton