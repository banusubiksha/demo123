// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from './src/SplashScreen';
import LoginScreen from './src/LoginScreen';
import SignupScreen from './src/SignupScreen';
import Profile from './src/Profile';
import { ProfileProvider } from './src/ProfileContext'; // Import ProfileProvider
import CustomDrawerContent from './src/CustomDrawerContent';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text } from 'react-native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent photoUri={null} {...props} />}
  >
    <Drawer.Screen name="BNS" component={() => <Text>Item 1 Screen</Text>} />
    <Drawer.Screen name="BNSS" component={() => <Text>Item 2 Screen</Text>} />
    <Drawer.Screen name="BSB" component={() => <Text>Item 3 Screen</Text>} />
    <Drawer.Screen name="Counselling" component={() => <Text>Counselling Screen</Text>} />
    <Drawer.Screen name="Online Consultation" component={() => <Text>Online Consultation Screen</Text>} />
    <Drawer.Screen name="In Person Consultation" component={() => <Text>In Person Consultation Screen</Text>} />
    <Drawer.Screen name="Profile" component={Profile}  />
  </Drawer.Navigator>
);

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <ProfileProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name="Profile"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ProfileProvider>
  </GestureHandlerRootView>
);

export default App;
