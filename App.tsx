import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import GameModeScreen from './screens/GameModeScreen';
import PlayerSetup from './components/PlayerSetup';
import { ThemeProvider } from './utils/ThemeContext';
import LeaderboardScreen from './screens/LeaderboardScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignInScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="GameScreen" component={GameScreen} />
          <Stack.Screen name="GameModeScreen" component={GameModeScreen} />
          <Stack.Screen name="LeaderboardScreen" component={LeaderboardScreen} />
          <Stack.Screen
  name="PlayerSetup"
  component={({ navigation, route }: { navigation: any; route: any }) => {
    return (
      <PlayerSetup
        onStart={(names, difficulty) => {
          navigation.navigate('GameModeScreen', {
            ...names,
            difficulty,
            mode: route.params?.mode || 'multiplayer',
          });
        }}
      />
    );
  }}
/>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
