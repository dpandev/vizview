import React from 'react'
import { Image, StyleSheet, useWindowDimensions } from 'react-native'

const Logo = () => {
  const {height} = useWindowDimensions()

  return (
    <Image
      style={[styles.logo, {height: height * 0.3}]}
      source={require('../../assets/images/ProFormBarberLogo.png')}//temp placeholder
      resizeMode='contain'
    />
  )
}

const styles = StyleSheet.create({
  logo: {
    width: '70%',
    maxWidth: 200,
    maxHeight: 200,
    marginBottom: 35,
  },
})

export default Logo