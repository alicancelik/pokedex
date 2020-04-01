/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  useColorScheme,
  StatusBar,
} from 'react-native';

import { ThemeContext } from './contexts/ThemeContext';
import {darkTheme, lightTheme} from './const/themes';

import { PokemonList } from './screens/PokemonList';
import BottomTabNavigator from './navigation/BottomTabNavigator';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

declare var global: {HermesInternal: null | {}};

const App = () => {

  const colorScheme = useColorScheme();

  return (
    <>
      <StatusBar barStyle={colorScheme === 'light' ? "dark-content" : "light-content"} />
      <ThemeContext.Provider 
        value={colorScheme === 'light' ? lightTheme : darkTheme}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Amcalarinin Aslanlarina" component={BottomTabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
      </ThemeContext.Provider>
    </>
  );
};

const styles = StyleSheet.create({

});

export default App;
