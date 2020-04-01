import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Image, FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

import { FullPokemonsAPI } from '../const/api';
import { PokemonTypeImage } from '../const/typeImages'
import {PokemonItem} from '../components/PokemonItem';

interface IPokemonListProps {

}

type State = {
  search: String,
  nextApi: String,
  pokemons: Array,
  isLoading: boolean,
  isLoadMore: boolean,
}

export const PokemonList: React.SFC<IPokemonListProps, IPokemonListStates> = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const [nextApi, setNextApi] = useState('');
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [search, setSearch] = useState('');
  const theme = useContext(ThemeContext);


  useEffect(() => {
    setIsLoadMore(true)
    fetchPokemons(FullPokemonsAPI)
  }, []);


  fetchPokemons = (api) => {
    fetch(api)
      .then((response) => response.json())
      .then((json) => { setPokemons(json); setNextApi(json.next); setIsLoadMore(false); setSearch('')} )
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  // loadMoreItem = () => {
  //   if (nextApi) {
  //     fetchPokemons(nextApi);
  //   }
  // }
  

  return (
    <View style={{backgroundColor: theme.primaryColor}}>
      {!isLoading ? (
        <FlatList
          data={pokemons}
          renderItem={({ item, index }) => <PokemonItem item={item} index={index} />}
          keyExtractor={item => item.nid}
          // onEndReached={loadMoreItem}
          // onEndReachedThreshold={0.5}
          // initialNumToRender={10}
          // ListFooterComponent={this._renderFooter}
        />
      ) : (
          <ActivityIndicator animating size="small" />
        )}
    </View>
  );
};

const styles = StyleSheet.create({

});
