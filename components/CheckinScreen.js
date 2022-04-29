import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function CheckinScreen({ navigation }) {

  const btnExpand = () => {
    console.log("Button Pressed")
    navigation.navigate('VisitorForm')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        Welcome to
      </Text>
      <Text style={styles.companyText}>
        {'ProForm Cut & Shave'}
      </Text>
      <Button onPress={btnExpand} labelStyle={styles.btnContent} mode='contained'>
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
  companyText: {
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 75,
  },
  titleText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 30,
    marginBottom: 15,
  },
  btnContent: {
    fontSize: 18,
    padding: 10,
  }
});