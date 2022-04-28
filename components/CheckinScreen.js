import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Alert, Pressable, View } from 'react-native';
import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks';
import { Button, Text } from 'react-native-paper'

export default function CheckinScreen({ navigation }) {
  //const { landscape } = useDeviceOrientation(); //use later

  const btnExpand = () => {
    console.log("Button Pressed")
    navigation.navigate('VisitorForm')
  }

  return (  //need to make button padding area clickable, egdes currently not clickable
    <View style={styles.container}>
      <Text style={styles.titleText}>
        Welcome!
      </Text>
      <Button onPress={btnExpand} style={{ padding: 15 }} mode='contained'>
        Tap to check in
      </Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 32,
    marginBottom: 75,
  },
});