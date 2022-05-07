import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const VisitorCheckinScreen = ({ navigation }) => {

  const btnExpand = () => {
    console.log("Button Pressed")
    navigation.navigate('VisitorForm')
  }

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
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

export default VisitorCheckinScreen