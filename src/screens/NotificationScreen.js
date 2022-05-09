import React, { useState, useCallback } from 'react'
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native'
import { Text } from 'react-native-paper'
import { auth, db } from '../../firebase'

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

export default function NotificationScreen() {
  const [refreshing, setRefreshing] = useState(false)
  const [guestList, setGuestList] = useState([])

  const onRefresh = useCallback(() => {
    console.log('hi')
    setRefreshing(true)
    // wait(2000).then(() => setRefreshing(false))
    console.log(auth.currentUser.email)
    console.log(db.collection('barbers')
    .where('email', '==', 'dpanesiu@yahoo.com')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data())
      })
    })
    .catch((error) => {
        console.log("Error getting documents: ", error)
    })
    )
    let mounted = true
    const getNotifications = async () => {
      let list = []
      await db.collection('barbers')
        .where('email', '==', auth.currentUser.email)
        .collection('checkins').get()
        .catch((error) => console.log(error))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            list.push({
              ...doc.data(),
              name: doc.name,
              comments: doc.comment,
              time: doc.createdAt,
            })
          })
        })
        .then(() => {
          if (mounted) {
            setGuestList(list)
            setRefreshing(false)
          }
        })
    }
    getNotifications().catch(error => setRefreshing(false))
    return () => {
      mounted = false
      // setRefreshing(false)
    }
  }, [])

  const notifications = {
    not1: {
      name: 'Bob',
      barber: 'barber1',
      comments: 'new style',
      time: '10:34pm',
    },
    not2: {
      name: 'James',
      barber: 'barber2',
      comments: null,
      time: '12:45pm',
    },
    not3: {
      name: 'Alan',
      barber: 'barber1',
      comments: null,
      time: '9:00am',
    },
    not4: {
      name: 'James',
      barber: 'barber2',
      comments: null,
      time: '12:45pm',
    },
    not5: {
      name: 'Alan',
      barber: 'barber1',
      comments: 'new style',
      time: '9:00am',
    },
    not6: {
      name: 'James',
      barber: 'barber2',
      comments: 'new style',
      time: '12:45pm',
    },
    not7: {
      name: 'Alan',
      barber: 'barber1',
      comments: null,
      time: '9:00am',
    },
    not8: {
      name: 'James',
      barber: 'barber2',
      comments: 'new style',
      time: '12:45pm',
    },
    not9: {
      name: 'Alan',
      barber: 'barber1',
      comments: 'new style',
      time: '9:00am',
    },
    not10: {
      name: 'James',
      barber: 'barber2',
      comments: null,
      time: '12:45pm',
    },
    not11: {
      name: 'Alan',
      barber: 'barber1',
      comments: 'new style',
      time: '9:00am',
    },
    not7: {
      name: 'Alan',
      barber: 'barber1',
      comments: null,
      time: '9:00am',
    },
    not8: {
      name: 'James',
      barber: 'barber2',
      comments: null,
      time: '12:45pm',
    },
    not9: {
      name: 'Alan',
      barber: 'barber1',
      comments: 'new style',
      time: '9:00am',
    },
    not10: {
      name: 'James',
      barber: 'barber2',
      comments: null,
      time: '12:45pm',
    },
    not11: {
      name: 'Alan',
      barber: 'barber1',
      comments: 'new style',
      time: '9:00am',
    },
  }

  const handleClick = () => {
    console.log("notification clicked")
  }

  return (  //TODO: logic to dynamically display notifications and details, add react-native refreshcontrol for pulldown action
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={styles.container}>
        {Object.values(notifications).map((item, id) => (
          <Text key={id} style={styles.button} onPress={handleClick}>
            <Text style={styles.text}>{item.name} has checked in at {item.time}</Text>
            <Text style={item.comments != null ? styles.comments : styles.noDisplay}>
              {item.comments != null ? "\nComments: " + item.comments : ""}
            </Text>
          </Text>
        ))}
      </View>
    </ScrollView>
  );
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
});