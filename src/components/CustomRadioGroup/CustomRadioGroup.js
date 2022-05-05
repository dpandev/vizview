import { StyleSheet } from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-paper'

const CustomRadioButton = ({ value, label }) => {
  return (
    <RadioButton.Item 
      value={value}
      label={label} 
    />
  )
}

const CustomRadioGroup = ({ value, setValue, options }) => {
  //delete options.key

  return (
    <RadioButton.Group 
      value={value}
      onValueChange={setValue}
    >
      {Object.values(options).map((item, id) => (
        <CustomRadioButton 
          key={id}
          value={item.value} 
          label={item.label} 
        />
      ))}
    </RadioButton.Group>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default CustomRadioGroup