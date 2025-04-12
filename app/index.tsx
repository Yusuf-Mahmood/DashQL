import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

export default function HomeScreen() {
  
  return (
    <View style={tw`flex-1 justify-center items-center bg-black`}>
    <Text style={tw`text-white text-lg`}>Hello from twrnc!</Text>
  </View>
  );
}