import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, TextInput, Text, IconButton } from 'react-native-paper';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../../../contexts/AuthContext';

const initialState = { title: '', description: '', category:'',date:'', time:'' };

export default function AddTasks() {
  const [state, setState] = useState(initialState);
  const [focusedField, setFocusedField] = useState('');
  const navigation = useNavigation();
  const {user}=useAuthContext();

  const handleChange = (name, value) => {
    setState(s => ({ ...s, [name]: value }));
  }

    const handleAdd = () => {
let {title, description, category, date, time}= state;
title= title.trim();
description= description.trim();
 let taskData = {title, description, category, date, time}

 taskData.id = Math.random().toString(36).slice(2);
 taskData.dateCreated= firebase.firestore.FieldValue.serverTimestamp();
 taskData.status='Incomplete';
taskData.createdBy={
  emial:user.email,
  uid: user.uid
}
createDocument(taskData);
    };

    const createDocument=(taskData)=>{
      firestore()
  .collection('Tasks')
  .doc(taskData.id)
  .set(taskData)
  .then(() => {
    console.log('Task has been added successfully');
  }).catch(err=>{
console.log(err)
  });
    }

  return (
    <ScrollView style={styles.container}>


      <View style={styles.flexContainer}>
        <View style={{ width: '100%' }}>
          <View style={styles.TopView}>
            <Text style={styles.mainText} >Add Task</Text>
          </View>
          <TextInput
            mode="flat"
            label="Title"
            // placeholder="Enter Title"
            placeholderTextColor={focusedField === 'title' ? smokeColor : 'white'}
            style={[styles.inputField, { borderBottomColor: focusedField === 'title' ? smokeColor : 'white' }]}
            onChangeText={val => handleChange('title', val)}
            keyboardType="text"
            theme={{
              colors: {
                primary: smokeColor,
                placeholder: focusedField === 'title' ? smokeColor : 'white',
                text: 'white',
                background: 'transparent',
                underlineColor: 'transparent',
              },
            }}
            onFocus={() => setFocusedField('title')}
            onBlur={() => setFocusedField('')}
          />
          <TextInput
            mode="flat"
            label="description"
            placeholderTextColor={focusedField === 'description' ? smokeColor : 'white'}
            style={[styles.inputField, { borderBottomColor: focusedField === 'description' ? smokeColor : 'white' }]}
            onChangeText={val => handleChange('description', val)}
            theme={{
              colors: {
                primary: smokeColor,
                placeholder: focusedField === 'description' ? smokeColor : 'white',
                text: 'white',
                background: 'transparent',
                underlineColor: 'transparent',
              },
            }}
            onFocus={() => setFocusedField('description')}
            onBlur={() => setFocusedField('')}
          />
          <TextInput
            mode="flat"
            label="Date"
            // placeholder="Enter Date"
            placeholderTextColor={focusedField === 'Date' ? smokeColor : 'white'}
            style={[styles.inputField, { borderBottomColor: focusedField === 'Date' ? smokeColor : 'white' }]}
            onChangeText={val => handleChange('date', val)}
            keyboardType="Date"
            theme={{
              colors: {
                primary: smokeColor,
                placeholder: focusedField === 'Date' ? smokeColor : 'white',
                text: 'white',
                background: 'transparent',
                underlineColor: 'transparent',
              },
            }}
            onFocus={() => setFocusedField('Date')}
            onBlur={() => setFocusedField('')}
          />
          <TextInput
            mode="flat"
            label="Time"
            // placeholder="Enter Time"
            placeholderTextColor={focusedField === 'Time' ? smokeColor : 'white'}
            style={[styles.inputField, { borderBottomColor: focusedField === 'Time' ? smokeColor : 'white' }]}
            onChangeText={val => handleChange('time', val)}
            keyboardType='default'

            theme={{
              colors: {
                primary: smokeColor,
                placeholder: focusedField === 'Time' ? smokeColor : 'white',
                text: 'white',
                background: 'transparent',
                underlineColor: 'transparent',
              },
            }}
            onFocus={() => setFocusedField('Time')}
            onBlur={() => setFocusedField('')}
          />
          <TextInput
            mode="flat"
            label="Category"
            // placeholder="Enter Category"
            placeholderTextColor={focusedField === 'Category' ? smokeColor : 'white'}
            style={[styles.inputField, { borderBottomColor: focusedField === 'Category' ? smokeColor : 'white' }]}
            onChangeText={val => handleChange('category', val)}
            keyboardType="Category"
            theme={{
              colors: {
                primary: smokeColor,
                placeholder: focusedField === 'Category' ? smokeColor : 'white',
                text: 'white',
                background: 'transparent',
                underlineColor: 'transparent',
              },
            }}
            onFocus={() => setFocusedField('Category')}
            onBlur={() => setFocusedField('')}
          />



          <Button
            mode="contained"
            onPress={handleAdd}
            style={styles.button}
          >
            Add Task
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const primaryColor = '#000000';
const smokeColor = '#dd5201';

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    padding: 18,
  },
  container: {
    flex: 1,
    backgroundColor: primaryColor,
  },
  TopView: {
    marginVertical: 30
  },
  mainText: {
    color: smokeColor,
    fontSize: 28,
    fontWeight: 'larger'

  },




  button: {
    backgroundColor: smokeColor,
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  inputField: {
    backgroundColor: 'transparent',
    marginBottom: 30,
    borderBottomWidth: 1, // Only bottom border
  },
});
