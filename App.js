import React from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './src/navigation/AppNavigator'
import AuthContextProvider from './src/contexts/AuthContext'

export default function App() {

    return (
   <>
    <AuthContextProvider>

    <AppNavigator />
    </AuthContextProvider>
   </>
    )
  }

