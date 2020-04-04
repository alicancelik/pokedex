import React, {useState, useEffect, useContext} from 'react';
import { Image, ActivityIndicator, TouchableOpacity, StyleSheet , Text, View} from 'react-native';
import { PokemonTypeImage } from '../const/typeImages'
import { ThemeContext } from '../contexts/ThemeContext';
import FastImage from 'react-native-fast-image';
import * as Animatable from 'react-native-animatable';

interface IPokemonItemProps {
  item: Object,
  index: Any,
  setActivePokemon: Function,
}

export const PokemonItem: React.SFC<IPokemonItemProps> = (props) => {
  const theme = useContext(ThemeContext);
  const pokemonTypes = props.item.field_pokemon_type.split(', ');
  const PokemonTypeElement = pokemonTypes.map((type, index) => {
    return (
      <Animatable.View animation="zoomIn" style={{alignSelf: 'center'}}>
        <FastImage
          key={type}
          style={{ width: 50, height: 50}}
          source={PokemonTypeImage[type.toLowerCase()] || PokemonTypeImage['default']}
          placeholderStyle={{ backgroundColor: 'transparent' }}
          PlaceholderContent={<ActivityIndicator />}
        />
      </Animatable.View>
    )
  });
  return (
    
    <TouchableOpacity onPress={() => props.setActivePokemon(props.item)} style={[styles.rowContainer, {backgroundColor: theme.primaryColor}]}>
      <View style={styles.flexRow}>
      <Animatable.View animation="zoomIn"> 
        <Image source={{uri: props.item.uri}} style={{width: 70, height: 70}}/> 
      </Animatable.View>
        <Text style={[styles.name, {color: theme.textColor}]}> {props.item.title_1} </Text>
      </View>
      <View style={styles.flexRow}>
        {PokemonTypeElement}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingVertical: 10, 
    paddingHorizontal: 20,
  },
  name: {
    alignSelf: 'center', 
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  flexRow: {
    flexDirection: 'row',
  }
});