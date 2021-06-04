import { StatusBar } from 'expo-status-bar';
import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from 'react-native';
import Login from './Screens/Login';
import Register from './Screens/Register';
import Home from './Screens/Home';
import ChatScreen from './Screens/ChatScreen';
import Chat from "./Screens/Chat";

export default function App() {
  const Stack = createStackNavigator();
  const globalScreenOptions = {
    headerStyle: {backgroundColor: '#2C6BED'},
    headerTitleStyle: {color: 'white'},
    headerTintColor: 'white'
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen
          options={{ title: "Hii" }}
          name="login"
          component={Login}
        />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="chatScreen" component={ChatScreen} />
        <Stack.Screen name="chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 