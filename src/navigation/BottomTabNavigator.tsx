import React from 'react';
import { Image, View } from 'react-native';
import AnimatedTabBar, { TabsConfigsType } from '@gorhom/animated-tabbar';
import {PokemonList} from '../screens/PokemonList';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import pokeball from '../assets/images/pokeball.png';
import {Types} from '../screens/Types';
import HomeSVG from '../svg/HomeSVG';
import FastImage from 'react-native-fast-image';

const TypesComponent = () => <FastImage source={require('../assets/images/pokeball.png')} style={{width: 30, height: 30}}/>

const tabs: TabsConfigsType = {
  Pokemonlar: {
    labelStyle: {
      color: '#5B37B7',
    },
    icon: {
      component: TypesComponent,
      activeColor: 'rgba(91,55,183,1)',
      inactiveColor: 'rgba(0,0,0,1)',
    },
    background: {
      activeColor: 'rgba(223,215,243,1)',
      inactiveColor: 'rgba(223,215,243,0)',
    },
  },
  Türler: {
    labelStyle: {
      color: '#E6A919',
    },
    icon: {
      component: HomeSVG,
      activeColor: 'rgba(230,169,25,1)',
      inactiveColor: 'rgba(0,0,0,1)',
    },
    background: {
      activeColor: 'rgba(251,239,211,1)',
      inactiveColor: 'rgba(251,239,211,0)',
    },
  },
};

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator({ navigation, route }) {

  return (
      <Tab.Navigator
        tabBarOptions={{ style: {backgroundColor: '#082754' }}}
        tabBar={props => (
          <AnimatedTabBar duration={500} tabs={tabs} {...props} />
        )}>
          <Tab.Screen
            name="Pokemonlar"
            component={PokemonList}
          />
          <Tab.Screen
            name="Türler"
            component={Types}
          />
      </Tab.Navigator>
  );
}