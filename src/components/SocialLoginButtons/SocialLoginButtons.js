import React from 'react'
import CustomButton from '../CustomButton/CustomButton'

const SocialLoginButtons = () => {

  const onSignInApple = () => {
    console.warn('Sign In')
  }

  const onSignInGoogle = () => {
    console.warn('Sign In')
  }

  const onSignInFacebook = () => {
    console.warn('Sign In')
  }

  return (
    <>
    <CustomButton 
      onPress={onSignInApple} 
      text={"Sign In with Apple"} 
      bgColor='#e3e3e3'
      fgColor='#363636'
    />
    <CustomButton 
      onPress={onSignInGoogle} 
      text={"Sign In with Google"} 
      bgColor='#FAE9EA'
      fgColor='#DD4D44'
    />
    <CustomButton 
      onPress={onSignInFacebook} 
      text={"Sign In with Facebook"} 
      bgColor='#E7EAF4'
      fgColor='#4765A9'
    />
    </>
  )
}

export default SocialLoginButtons