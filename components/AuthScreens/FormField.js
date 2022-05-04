import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

const FormField = (props) => {
  return (
    <View style={styles.formFieldWrapper}>
      <Text style={styles.labelText}>{props.label}</Text>
      <TextInput
        placeholder={props.placeholder}
        mode='outlined'
        onChange={(event) => props.handleFormValueChange(props.formKey, event.nativeEvent.text)}
        {...props.textInputProps}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  formFieldWrapper: {
  },
  labelText: {
    fontSize: 18,
    marginBottom: 6,
    paddingLeft: 10,
    paddingTop: 12,
  }
})

export default FormField;