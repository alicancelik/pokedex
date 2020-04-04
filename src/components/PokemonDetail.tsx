import React, {useContext} from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import { ThemeContext } from '../contexts/ThemeContext';
import * as Animatable from 'react-native-animatable';

import { PokemonTypeImage, Types } from '../const/typeImages';


interface IPokemonDetailProps {
  pokemon: Object,
}

export const PokemonDetail: React.SFC<IPokemonDetailProps> = ({pokemon}) => {
  const maxSTA = 300
  const maxATK = 300
  const maxDEF = 400
  const maxCP = 4000
  const pokemonTypes = pokemon.field_pokemon_type.split(', ');
  const theme = useContext(ThemeContext);

  const color = Types.filter(type => type.name === pokemonTypes?.[0].toLowerCase())?.[0]?.color || '#559EDF';
  const PokemonTypeElement = pokemonTypes.map((type, index) => {
    return (
      <View style={styles.pokemonType} key={index}>
        <Image source={PokemonTypeImage[type.toLowerCase()] || PokemonTypeImage['default']} />
        <Text style={{color: theme.textColor}}>{Types.filter(t => t.name === type.toLowerCase())?.[0]?.title}</Text>
      </View>
    )
  });
  return (
    <ScrollView>
    <View style={[styles.body, {backgroundColor: color}]}>
      <View style={[styles.content,{backgroundColor: theme.primaryColor}]}>
        <Animatable.View animation="slideInRight">
          <Image
            style={styles.avatar}
            placeholderStyle={{backgroundColor: 'transparent'}}
            PlaceholderContent={<ActivityIndicator />}
            source={{ uri: pokemon.uri }}
          />
        </Animatable.View>

        <Text style={styles.pokemonName}>{pokemon.title_1}</Text>

        <Animatable.View animation="zoomIn" style={{ flexDirection: 'row', justifyContent: 'center' }}>
          {PokemonTypeElement}
        </Animatable.View>

        <View>
          <Text style={styles.description}>
            {pokemon.title_1} {pokemon.field_pokemon_generation} pokemondur.{'\n'}.
            Yakalama Oranı: {pokemon.catch_rate}, Kaçma Oranı: {pokemon.field_flee_rate}
          </Text>
        </View>

        <View>
          <View style={styles.pokemonStatus}>
            <Text style={styles.pokemonStatusName}>STA</Text>
            <Text style={[styles.pokemonStatusPoint, {color: theme.textColor}]}>{pokemon.sta}</Text>
            <View style={styles.pokemonStatusBar}>
              <ProgressBar progress={+pokemon.sta / maxSTA} height={8} color='#559EDF' unfilledColor={theme.titleColor} borderWidth={0} animated={true} width={null} />
            </View>
          </View>
          <View style={styles.pokemonStatus}>
            <Text style={styles.pokemonStatusName}>ATK</Text>
            <Text style={[styles.pokemonStatusPoint, {color: theme.textColor}]}>{pokemon.atk}</Text>
            <View style={styles.pokemonStatusBar}>
              <ProgressBar progress={+pokemon.atk / maxATK} height={8} color='#559EDF' unfilledColor={theme.titleColor} borderWidth={0} animated={true} width={null} />
            </View>
          </View>
          <View style={styles.pokemonStatus}>
            <Text style={styles.pokemonStatusName}>DEF</Text>
            <Text style={[styles.pokemonStatusPoint, {color: theme.textColor}]}>{pokemon.def}</Text>
            <View style={styles.pokemonStatusBar}>
              <ProgressBar progress={+pokemon.def / maxDEF} height={8} color='#559EDF' unfilledColor={theme.titleColor} borderWidth={0} animated={true} width={null} />
            </View>
          </View>
          <View style={styles.pokemonStatus}>
            <Text style={styles.pokemonStatusName}>CP</Text>
            <Text style={[styles.pokemonStatusPoint, {color: theme.textColor}]}>{pokemon.cp}</Text>
            <View style={styles.pokemonStatusBar}>
              <ProgressBar progress={+pokemon.cp / maxCP} height={8} color='#559EDF' unfilledColor={theme.titleColor} borderWidth={0} animated={true} width={null} />
            </View>
          </View>
        </View>
      </View>
    </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    alignItems: 'flex-start',
    paddingTop: 40,
    marginBottom: -40
  },
  body: {
    position: 'relative',
    flex: 1,
  },
  content: {
    flex: 1,
    marginTop: 150,
    position: 'relative',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20,
  },
  avatar: {
    position: 'absolute',
    width: 200,
    height: 200,
    alignSelf: 'center',
    top: -130,
  },
  pokemonName: {
    marginTop: 90,
    alignSelf: 'center',
    fontSize: 30,
    fontFamily: 'Avenir',
    color: '#4f4f4f',
  },
  description: {
    color: '#4F4F4F',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 15,
    marginBottom: 35,
  },
  pokemonType: {
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  pokemonStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pokemonStatusName: {
    color: '#1a87d9',
    fontWeight: 'bold',
    flex: 1,
  },
  pokemonStatusPoint: {
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
  },
  pokemonStatusBar: {
    flex: 5,
  },
})