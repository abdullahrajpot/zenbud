import React from 'react'
import { Text, View } from 'react-native'
import Auth from './src/screens/Auth'
import { NavigationContainer } from '@react-navigation/native'

export default function App() {

    return (
   <NavigationContainer>
    <Auth/>
   </NavigationContainer>
    )
  }

