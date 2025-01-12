import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const initialState = { email: '', password: '' };

export default function Login() {
  const [state, setState] = useState(initialState);

  const handleChange = (name , value) =>{
    setState (s => ({...s , [name]:value}))
  }

  const handleLogin = () => {
    let { email, password } = state;

    if (!email) {
      return alert('Enter your correct email');
    }
    if (password.length < 6) {
      return alert('Password must be at least 6 characters');
    }
    console.log("state =>",state)

    auth()
  .signInWithEmailAndPassword(email, password)
  .then(() => {
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
  };

  return (
    <View style={styles.flexContainer}>
      <View style={{ width: '100%' }}>
        <TextInput
          mode=""
          label="Email"
          placeholder="Enter Email"
          placeholderTextColor="white"
          style={{ backgroundColor: 'transparent', marginBottom:'30' }}
          onChangeText={val => handleChange('email', val)}
          keyboardType="email-address"
          />

        <TextInput
          mode=""
          label="Password"
          secureTextEntry
          style={{ backgroundColor: 'transparent', marginBottom:'40' }}
          right={<TextInput.Icon icon="eye" />}
          onChangeText={val => handleChange('password', val)}
          keyboardType="default"
        />

        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button} // Applying custom button style
        >
          Sign In
        </Button>
      </View>
    </View>
  );
}

const primaryColor = '#000000';
const smokeColor = '#dd5201'; // Light gray (smoke color)

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    padding: 18,
  },
  button: {
    backgroundColor: smokeColor, // Set the background color to smoke (light gray)
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius:10,
  },
});
