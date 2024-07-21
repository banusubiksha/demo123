import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SplashScreen from './src/SplashScreen';  
import LoginScreen from './src/LoginScreen';    
import SignupScreen from './src/SignupScreen';  
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import MainScreen from './src/MainScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Main">
    <Drawer.Screen name="Main" component={MainScreen} />
    <Drawer.Screen name="Item1" component={() => <Text>Item 1 Screen</Text>} />
    <Drawer.Screen name="Item2" component={() => <Text>Item 2 Screen</Text>} />
    <Drawer.Screen name="Item3" component={() => <Text>Item 3 Screen</Text>} />
  </Drawer.Navigator>
);

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={DrawerNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  </GestureHandlerRootView>
);

export default App;
