import { StyleSheet, View, ScrollView, StatusBar } from 'react-native';
import { Text } from 'react-native-paper';

export default function NotificationScreen() {

  return (  //TODO: logic to dynamically display notifications and details
    <ScrollView>
      <View style={styles.container}>
        <Text>Hello</Text>
        <Text>{Platform.OS}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight + 30 : 0,
  },
});