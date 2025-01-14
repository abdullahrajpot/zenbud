import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddTasks from './AddTasks';


const Stack = createNativeStackNavigator();

export default function Tasks() {
  return (
    
      <Stack.Navigator initialRouteName="AddTasks">
        <Stack.Screen
        options={{
          headerShown:false
        }}
        name="AddTasks" component={AddTasks} />
        
      </Stack.Navigator>
    
  );
}
