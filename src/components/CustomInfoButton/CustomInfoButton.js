import { Text, StyleSheet, Pressable, View } from 'react-native'
import React from 'react'
import moment from 'moment'

const CustomInfoButton = ({ disabled, onPress, title, text, date, text2 }) => {
  const formattedDate = moment(moment.unix(date)).format('MM-DD-YYYY')

  return (
    <Pressable 
      disabled={disabled}
      onPress={onPress} 
      style={styles.container}>
        <View style={styles.row}>
          <View style={[styles.column, styles.left]}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.text}>{text}</Text>
          </View>
          <View style={[styles.column, styles.right]}>
            <Text style={styles.date}>{formattedDate}</Text>
            <Text style={styles.text}>{text2}</Text>
          </View>
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 400,
    padding: 17,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#363636',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  left: {
    flex: 2,
    alignItems: 'flex-start',
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    color: 'tomato',
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 0.35,
  },
  date: {
    color: '#e3e3e3',
  },
})

export default CustomInfoButton