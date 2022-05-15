import React from 'react'
import { Image, StyleSheet, useWindowDimensions } from 'react-native'

const Logo = () => {
  const {height} = useWindowDimensions()

  return (
    <Image
      style={[styles.logo, {height: height * 0.3}]}
      source={require('../../../assets/images/ProFormBarberLogo.png')}
      resizeMode='contain'
    />
  )
}

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    maxWidth: 300,
    maxHeight: 300,
    marginBottom: 35,
  },
})

export default Logo