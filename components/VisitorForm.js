import * as React from 'react'
//import { StatusBar } from 'expo-status-bar';  //use to determine height from top for android
import { StyleSheet, View } from 'react-native';
import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks';
import { Text, TextInput, Button, RadioButton } from 'react-native-paper';

export default function VisitorForm() {

  //const { landscape } = useDeviceOrientation(); //test later
  const [text, setText] = React.useState("");
  const [barber, setBarber] = React.useState('barber1')

  const handleSubmit = () => {
    console.log("Submit pressed")

  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Please fill out the form below</Text>
      <View>
        <TextInput
          label='Your Name'
          value={text}
          onChangeText={text => setText(text)}
          mode='outlined'
        />
        <RadioButton.Group  //will need to list radio items dynamically
          onValueChange={chosenBarber => setBarber(chosenBarber)}
          value={barber}>
            <Text style={styles.labelText}>Which barber do you have an appointment with?</Text>
            <View>
              <RadioButton.Item label='barber1' value='barber1' />
            </View>
            <View>
              <RadioButton.Item label='barber2' value='barber2' />
            </View>
        </RadioButton.Group>
        <Button 
        style={styles.button}
          labelStyle={styles.btnContent} 
          mode='contained'
          onPress={handleSubmit}>
            Submit
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: '10%',
  },
  labelText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 50,
    marginBottom: 25,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: '20%',
  },
  button: {
    marginTop: 40,
  },
  btnContent: {
    fontSize: 18,
    padding: 10,
  }
});
