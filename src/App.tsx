import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  useColorScheme,
  StatusBar,
  Image,
} from 'react-native';
import { ThemeContext } from './contexts/ThemeContext';
import {darkTheme, lightTheme} from './const/themes';
import { PokemonList } from './screens/PokemonList';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';
import {PokemonTypeImage} from './const/typeImages';

const Stack = createStackNavigator();

declare var global: {HermesInternal: null | {}};

const App = () => {

  const colorScheme = useColorScheme();
  const theme = colorScheme === 'light' ? lightTheme : darkTheme;
  useEffect(() => {
    const uris = Object.values(PokemonTypeImage).map(image => ({
      uri: Image.resolveAssetSource(image).uri
    }));
    FastImage.preload(uris);
  }, [])


  return (
    <>
      <StatusBar barStyle={colorScheme === 'light' ? "dark-content" : "light-content"} />
      <ThemeContext.Provider 
        value={colorScheme === 'light' ? lightTheme : darkTheme}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerStyle:  { backgroundColor: theme.primaryColor}, headerTintColor: theme.textColor}}>
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
