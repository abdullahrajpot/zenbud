import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const TimerSetting = ({ route, navigation }) => {
  const { workTime, breakTime, updateTimes } = route.params;
  const [newWorkTime, setNewWorkTime] = useState(workTime.toString());
  const [newBreakTime, setNewBreakTime] = useState(breakTime.toString());

  const handleSave = () => {
    const work = parseInt(newWorkTime);
    const breakT = parseInt(newBreakTime);

    if (work > 0 && breakT > 0) {
      updateTimes(work, breakT);
      navigation.goBack();
    } else {
      alert('Please enter valid times!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Set Timer</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={newWorkTime}
        onChangeText={setNewWorkTime}
        placeholder="Work time in minutes"
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={newBreakTime}
        onChangeText={setNewBreakTime}
        placeholder="Break time in minutes"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TimerSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 30,
    color: '#FF8C00',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#444',
    color: 'white',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    fontSize: 18,
  },
  saveButton: {
    backgroundColor: '#FF8C00',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveText: {
    fontSize: 20,
    color: 'white',
  },
});
