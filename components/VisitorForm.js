import * as React from 'react'
//import { StatusBar } from 'expo-status-bar';  //use to determine height from top for android
import { StyleSheet, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks';
import { Text, TextInput, Button, RadioButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VisitorForm() {

  //const { landscape } = useDeviceOrientation(); //test later
  const [text, setText] = React.useState("");
  const [barber, setBarber] = React.useState('barber1')
  const [comment, setComment] = React.useState("")

  const handleSubmit = () => {
    console.log("Submit pressed")

  }

  return (
    <SafeAreaView>
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
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
            <TextInput
              label='Additional Comments'
              value={comment}
              onChangeText={comment => setComment(comment)}
              mode='outlined'
              right={<TextInput.Affix text="/150" />}
              style={{marginTop: 25}}
            />
            <Button 
              style={styles.button}
              labelStyle={styles.btnContent} 
              mode='contained'
              onPress={handleSubmit}>
                Submit
            </Button>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: '5%',
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
    marginBottom: '15%',
  },
  button: {
    marginTop: 40,
  },
  btnContent: {
    fontSize: 18,
    padding: 10,
  }
});
