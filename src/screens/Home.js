import {View, Text, SafeAreaView, StatusBar, Button} from 'react-native';
import React from 'react';

const HomeScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar animated={true} backgroundColor="#694fad" />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: '#000'}}>Welcome </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
