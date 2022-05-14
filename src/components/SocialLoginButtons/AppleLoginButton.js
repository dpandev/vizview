import { View, Text, Platform, Alert } from 'react-native'
import React from 'react'
import { 
  AppleAuthenticationButton, 
  AppleAuthenticationButtonStyle,
  AppleAuthenticationButtonType
} from 'expo-apple-authentication'
import useAppleAuthentication from './useAppleAuthentication'

const AppleLoginButton = () => {
  const [appleAuthAvailable, authWithApple] = useAppleAuthentication()

  const loginWithApple = async () => {
    // const csrf = Math.random().toString(36).substring(2, 15)
    // const nonce = Math.random().toString(36).substring(2, 10)
    // const hashedNonce = await digestStringAsync(
    //   CryptoDigestAlgorithm.SHA256, nonce)
    // const appleCredential = await signInAsync({
    //   requestedScopes: [
    //     AppleAuthenticationScope.FULL_NAME,
    //     AppleAuthenticationScope.EMAIL
    //   ],
    //   state: csrf,
    //   nonce: hashedNonce
    // })
    // const { identityToken, email, state } = appleCredential
    // setLoginAvailable(await isAvailableAsync())

    // if (identityToken) {
    //   const provider = new appleProvider
    //   const credential = provider.credential({
    //     idToken: identityToken,
    //     rawNonce: nonce // nonce value from above
    //   })
    //   await auth.signInWithCredential(credential)
    // }
    try {
      const [credential, data] = await authWithApple()
      await login(credential, data)
    } catch (error) {
      console.error(error)
      Alert.alert('Error', 'Something went wrong. Please try again later.')
    }
  }


  return (
    console.log(appleAuthAvailable),
    <>
      {appleAuthAvailable === true ? (
        <AppleAuthenticationButton
          buttonType={AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthenticationButtonStyle.WHITE}
          cornerRadius={5}
          style={{ width: '100%', height: 44, maxWidth: 400, }}
          onPress={loginWithApple}
        />
      ) : null}
    </>
  )
}

export default AppleLoginButton