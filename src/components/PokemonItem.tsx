import React, {useState, useEffect, useContext} from 'react';
import { Image, ActivityIndicator, StyleSheet , Text, View} from 'react-native';
import { PokemonTypeImage } from '../const/typeImages'
import { ThemeContext } from '../contexts/ThemeContext';

interface IPokemonItem {
  item: Object,
  index: any,
}

export const PokemonItem: React.SFC<IPokemonItem> = ({item}) => {
  const theme = useContext(ThemeContext);
  console.log('girdi', item.nid);
  const pokemonTypes = item.field_pokemon_type.split(', ');
  const PokemonTypeElement = pokemonTypes.map((type, index) => {
    return (
      <Image
        source={PokemonTypeImage[type.toLowerCase()] || PokemonTypeImage['default']}
        placeholderStyle={{ backgroundColor: 'transparent' }}
        PlaceholderContent={<ActivityIndicator />}
      />
    )
  });
  return (
    <View style={[styles.rowContainer, {backgroundColor: theme.primaryColor}]}>
      <View style={styles.flexRow}>
        <Image source={{uri: item.uri}} style={{width: 60, height: 60}}/>
        <Text style={[styles.name, {color: theme.textColor}]}> {item.title_1} </Text>
      </View>
      <View style={styles.flexRow}>
        {PokemonTypeElement}
      </View>
    </View>
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
  },
  flexRow: {
    flexDirection: 'row',
  }
});