import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Frontend/Home';
import Icon from 'react-native-vector-icons/FontAwesome';
import Chatbot from '../screens/Frontend/AiChat';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import Home1 from '../screens/Auth/Home1';
import { useAuthContext } from '../contexts/AuthContext';

export default function AppNavigator() {

    const Stack = createNativeStackNavigator();  // Define the stack navigator
    const Tab = createBottomTabNavigator();  // Define the tab navigator

    const isAuthenticated = useAuthContext();
    console.log(isAuthenticated) // Example condition for authentication

    return (
        <NavigationContainer>
            {/* Stack navigator for handling authentication flow */}
            <Stack.Navigator>
                {!isAuthenticated ? (
                    <Stack.Group>
                        <Stack.Screen 
                            name='Home' 
                            component={Home}
                            options={{ headerShown: false }}
                        />
                    </Stack.Group>
                ) : (
                    <Stack.Group>
                        <Stack.Screen 
                            name='Home1' 
                            component={Home1}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen 
                            name='Register' 
                            component={Register}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen 
                            name='Login' 
                            component={Login}
                            options={{ headerShown: false }}
                        />
                    </Stack.Group>
                )}
            </Stack.Navigator>

            {/* Uncomment this part for tab navigation if needed */}
            {/* 
            <Tab.Navigator>
                <Tab.Screen 
                    name='Home' 
                    component={Home}
                    options={{
                        tabBarShowLabel: false,
                        tabBarIcon: ({ color, size }) => {
                            return <Icon name="home" size={size} color={color} />
                        }
                    }}
                />
                <Tab.Screen 
                    name='Chatbot' 
                    component={Chatbot}
                    options={{
                        tabBarShowLabel: false,
                        tabBarIcon: ({ color, size }) => {
                            return <Icon name="robot" size={size} color={color} />
                        }
                    }}
                />
            </Tab.Navigator>
            */}
        </NavigationContainer>
    );
}
