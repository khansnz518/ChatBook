import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import GoogleSignins from '../components/GoogleSignin'

const AuthStack = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar
      animated={true}
      backgroundColor="#fff"
      />
      <View style={{alignItems:'center',marginTop:30}}>
      <GoogleSignins />
      </View>
    </SafeAreaView>
  )
}

export default AuthStack