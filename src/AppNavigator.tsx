// src/navigation/AppNavigator.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          transitionSpec: {
            open: { animation: 'spring', config: { stiffness: 1000, damping: 0.5, mass: 3 } },
            close: { animation: 'spring', config: { stiffness: 1000, damping: 0.5, mass: 3 } },
          },
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [300, 0],
                  }),
                },
              ],
            },
          }),
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
