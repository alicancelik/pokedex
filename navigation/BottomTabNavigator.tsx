import React from 'react';
import { Image } from 'react-native';
import AnimatedTabBar, { TabsConfigsType } from '@gorhom/animated-tabbar';
import {PokemonList} from '../src/screens/PokemonList';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import pokeball from '../pokeball.png';
import {Types} from '../src/screens/Types';
import HomeSVG from '../src/svg/HomeSVG';

const TypesComponent = () => <Image source={pokeball} style={{width: 30, height: 30}}/>

const tabs: TabsConfigsType = {
  PokemonList: {
    labelStyle: {
      color: '#5B37B7',
    },
    icon: {
      component: HomeSVG,
      activeColor: 'rgba(91,55,183,1)',
      inactiveColor: 'rgba(0,0,0,1)',
    },
    background: {
      activeColor: 'rgba(223,215,243,1)',
      inactiveColor: 'rgba(223,215,243,0)',
    },
  },
  Types: {
    labelStyle: {
      color: '#E6A919',
    },
    icon: {
      component: TypesComponent,
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
        tabBar={props => (
          <AnimatedTabBar duration={500} tabs={tabs} {...props} />
        )}>
        <Tab.Screen
          name="PokemonList"
          component={PokemonList}
        />
        <Tab.Screen
          name="Types"
          component={Types}
        />
      </Tab.Navigator>
  );
}