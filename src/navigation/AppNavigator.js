import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Frontend/Home';
import Icon from 'react-native-vector-icons/FontAwesome';
import Chatbot from '../screens/Frontend/AiChat';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import AuthHome from '../screens/Auth/AuthHome';
import { useAuthContext } from '../contexts/AuthContext'; // Import the context
import Tasks from '../screens/Frontend/Tasks';
import Pomodoro from '../screens/Frontend/Pomodoro';

export default function AppNavigator() {

    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    const { isAuthenticated } = useAuthContext(); // Get the authentication state

    return (
        <NavigationContainer>
            {/* If user is not authenticated, show authentication flow */}
            {!isAuthenticated ? (
                <Stack.Navigator>
                    <Stack.Screen 
                        name='AuthHome' 
                        component={AuthHome}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen 
                        name='Login' 
                        component={Login}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen 
                        name='Register' 
                        component={Register}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            ) : (
                // Authenticated flow, show Tab.Navigator
                <Tab.Navigator>
                    <Tab.Screen 
                        name='Home' 
                        component={Home}
                        options={{
                            tabBarShowLabel: false,
                            tabBarIcon: ({ color, size }) => (
                                <Icon name="home" size={size} color={color} />
                            ),
                        }}
                    />
                    <Tab.Screen 
                        name='Chatbot' 
                        component={Chatbot}
                        options={{
                            tabBarShowLabel: false,
                            tabBarIcon: ({ color, size }) => (
                                <Icon name="wechat" size={size} color={color} />
                            ),
                        }}
                    />
                    <Tab.Screen 
                        name='Tasks' 
                        component={Tasks}
                        options={{
                            tabBarShowLabel: false,
                            headerShown:false,
                            tabBarIcon: ({ color, size }) => (
                                <Icon name="tasks" size={size} color={color} />
                            ),
                        }}
                    />
                    <Tab.Screen 
                        name='Pomodoro' 
                        component={Pomodoro}
                        options={{
                            tabBarShowLabel: false,
                            headerShown:false,
                            tabBarIcon: ({ color, size }) => (
                                <Icon name="clock-o" size={size} color={color} />
                            ),
                        }}
                    />
                </Tab.Navigator>
            )}
        </NavigationContainer>
    );
}
