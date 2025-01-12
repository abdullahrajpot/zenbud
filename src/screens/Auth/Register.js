import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'; // Correct import


const initialState = { email: '', password: '', number:'', name:'' };

export default function Register() {
  const [state, setState] = useState(initialState);

  const handleChange = (name , value) =>{
    setState (s => ({...s , [name]:value}))
  }

  // const handleRegister = () => {
  //   let { email, password, name, number } = state;

  //   if (!email) {
  //     return alert('Enter your correct email');
  //   }
  //   if (password.length < 6) {
  //     return alert('Password must be at least 6 characters');
  //   }
  //   console.log("state =>",state)

  //   auth()
  // .createUserWithEmailAndPassword(email, password)
  // .then(() => {
  //   console.log('User account created !');
  // })
  // .catch(error => {
  //   if (error.code === 'auth/email-already-in-use') {
  //     console.log('That email address is already in use!');
  //   }

  //   if (error.code === 'auth/invalid-email') {
  //     console.log('That email address is invalid!');
  //   }

  //   console.error(error);
  // });
  // };






  const handleRegister = () => {
    let { email, password, name, number } = state;

    if (!email) {
      return Alert.alert('Error', 'Enter your correct email');
    }
    if (password.length < 6) {
      return Alert.alert('Error', 'Password must be at least 6 characters');
    }

    // Firebase create user logic
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log('User account created !', user);

        // Create the user profile in Firebase Firestore (Optional step)
        createUserProfile(user, name, number);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          alert('Error', 'That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          alert('Error', 'That email address is invalid!');
        }

        console.error(error);
      });
  };

  const createUserProfile = (user, name, number) => {
    // const firestore = require('@react-native-firebase/firestore');
    const userRef = firestore().collection('users').doc(user.uid);

    userRef.set({
      name,
      email: user.email,
      phoneNumber: number,
      dateCreated: new Date(),
    })
    .then(() => {
      console.log('User profile created!');
    })
    .catch(error => {
      console.log('Error creating user profile', error);
    });
  };



  

  return (
    <ScrollView style={styles.container}>

    <View style={styles.header}>
        <Text style={styles.headerText}>Create Account</Text>
      </View>
    <View style={styles.flexContainer}>



      <View style={{ width: '100%' }}>
        <TextInput
          mode=""
          label="Name"
          placeholder="Enter Name"
          placeholderTextColor="gray"
          style={{ backgroundColor: 'transparent', marginBottom:'30' }}
          onChangeText={val => handleChange('name', val)}
          keyboardType="text"
          />
        <TextInput
          mode=""
          label="Phone"
          placeholder="Phone Number"
          placeholderTextColor="white"
          style={{ backgroundColor: 'transparent', marginBottom:'30' }}
          onChangeText={val => handleChange('number', val)}
          keyboardType="number"
          />
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
          onPress={handleRegister}
          style={styles.button} // Applying custom button style
          >
          Sign Up
        </Button>
      </View>
    </View>
          </ScrollView>
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
  container:{
    flex:1,
    backgroundColor: primaryColor,

  },

  header: {
    backgroundColor: smokeColor,
    height: 200, 
    justifyContent: 'center',
    width:'100%',
    borderBottomLeftRadius: 50, 
    marginBottom: 20,
    paddingLeft:25
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  button: {
    backgroundColor: smokeColor, 
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius:10,
  },
});
