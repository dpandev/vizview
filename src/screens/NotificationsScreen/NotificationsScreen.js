import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native'
import CustomButton from '../../components/CustomButton/CustomButton'
import { Text } from 'react-native-paper'
import { db, auth } from '../../../firebase'

function delay(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadNotifications()
  }, [])

  const debugGetNotifications = () => {
    console.log(notifications)
  }

  const getNotifications = async () => {
    const uid = auth.currentUser.email
    return await db.collection('barbers').doc(uid).collection('checkins').get()
  }

  const loadNotifications = async () => {
    await getNotifications().then((querySnapshot) => {
      const tempNotifications = querySnapshot.docs.map((doc) => {
        return doc.data()
      })

      tempNotifications.forEach(tn => {
        const dateTime = new Date(tn.createdAt.seconds * 1000)
        tn.time =  dateTime.toLocaleString('en-US', { timeStyle: 'short', hour12: true })
      })

      const sorted = tempNotifications.sort((a, b) => {
        const aDate = new Date(a.createdAt.seconds * 1000)
        const bDate = new Date(b.createdAt.seconds * 1000)
        return bDate - aDate
      })

      setNotifications(sorted)
    })
  }
  
  const refresh = useCallback(async () => {
    setLoading(true)
    loadNotifications().then(() => setLoading(false))
  }, [loading])

  return (
    <ScrollView refreshControl={
      <RefreshControl
        progressBackgroundColor={"black"}
        tintColor="black"
        refreshing={loading}
        onRefresh={refresh}
      />
    }>
      <View style={styles.container}>
        {Object.values(notifications).map((item, id) => (
          <Text key={id} style={styles.button}>
            <Text style={styles.text}>{item.name} has checked in at {item.time}</Text>
            <Text style={item.comment != null ? styles.comments : styles.noDisplay}>
              {item.comment !== "" ? "\nComments: " + item.comment : ""}
            </Text>
          </Text>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    width: '90%',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    borderRadius: 0,
    paddingTop: 25,
    paddingBottom: 25,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  comments: {
    color: 'tomato',
    fontWeight: 'bold',
    fontSize: 14,
  },
  noDisplay: {
    display: 'none',
  },
  scrollView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default NotificationsScreen