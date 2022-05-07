import React from 'react'
import CustomButton from '../CustomButton/CustomButton'
import { auth } from '../../../firebase'
import firebase from 'firebase/app'

const SocialLoginButtons = () => {

  const onSignInApple = () => {
    console.warn('Sign In Apple')
  }

  const onSignInGoogle = () => {
    // console.warn('Sign In Google')

    const provider = new firebase.auth.GoogleAuthProvider()
    auth
      .signInWithPopup(provider).then((result) => {
        let token = result.credential.accessToken
        let user = result.user
      
        console.log(token)
        console.log(user)
      }).catch(error => alert(error.message))
  }

  const onSignInFacebook = () => {
    console.warn('Sign In Facebook')
  }

  const onSignInWithPhone = () => {
    console.warn('Sign In Phone')
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
    <CustomButton 
      onPress={onSignInWithPhone} 
      text={"Sign In with your Phone"} 
      bgColor='#CBF5CE'
      fgColor='#11BE1B'
    />
    </>
  )
}

export default SocialLoginButtons