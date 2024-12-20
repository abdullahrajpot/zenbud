import React from 'react'
import { Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';

const stack= createNativeStackNavigator();

export default function index(){
  
    return (
      <stack.Navigator>
        <stack.Screen name='home' component={Home}/>
      </stack.Navigator>
    )
  }

