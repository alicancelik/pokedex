import React, {useState, useEffect, useContext, useCallback} from 'react';
import {View, Text, Image, FlatList, ActivityIndicator,TextInput, Keyboard, StyleSheet, TouchableOpacity} from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

import { FullPokemonsAPI } from '../const/api';
import * as Animatable from 'react-native-animatable';
import { PokemonTypeImage } from '../const/typeImages';
import ActionSheet, {addHasReachedTopListener, removeHasReachedTopListener} from 'react-native-actions-sheet';
import {PokemonItem, PokemonDetail} from '../components';

interface IPokemonListProps {

}

type State = {
  search: String,
  nextApi: String,
  pokemons: Array,
  listPokemons: Array,
  isLoading: Boolean,
  activePokemon: Object,
  isLoadMore: Boolean,
  inputHeight: String,
}

export const PokemonList: React.SFC<IPokemonListProps, IPokemonListStates> = (props) => {
  let actionSheet;
  const [isLoading, setLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const [nextApi, setNextApi] = useState('');
  const [inputHeight, setInputHeight] = useState('');
  const [animatedSearchVisible, setAnimatedSearchVisible] = useState(true)
  const [listPokemons, setListPokemons] = useState([]);
  const [activePokemon, setActivePokemon] = useState({});
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [search, setSearch] = useState('');
  const [nestedScrollEnabled, setNestedScrollEnabled] = useState(false);
  const theme = useContext(ThemeContext);

  const renderItemCall = useCallback(({ item, index }) => <PokemonItem item={item} index={index} setActivePokemon={(pokemon) => { setActivePokemon(pokemon); actionSheet.setModalVisible()}}/>);

  useEffect(() => {
    setIsLoadMore(true)
    fetchPokemons(FullPokemonsAPI)
    addHasReachedTopListener(onHasReachedTop)
    return () => {
        removeHasReachedTopListener(onHasReachedTop)
    }
  }, []);

  onHasReachedTop = () => {
    setNestedScrollEnabled(true);
  }

  onClose = () => {
    setNestedScrollEnabled(false);
  }


  fetchPokemons = (api) => {
    fetch(api)
      .then((response) => response.json())
      .then((json) => { setPokemons(json); setNextApi(json.next); setIsLoadMore(false); setSearch(''); setListPokemons(json);} )
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  updateSearch = search => {
    if (search == '') {
      setSearch(search);
      setPokemons(listPokemons);
    } else {
      let found = listPokemons.filter(x => {
        return x.title_1.toLowerCase().includes(search.toLowerCase())
      })
      setSearch(search)
      setPokemons(found)
    }
  };

   showSearchBar = (nativeEvent) => {
    if (isCloseToTop(nativeEvent) && !animatedSearchVisible) {
      setAnimatedSearchVisible(true)
    } else if(!isCloseToTop(nativeEvent)) {
      setAnimatedSearchVisible(false)
    }
  }

  isCloseToTop = (nativeEvent) => {
    return nativeEvent.layoutMeasurement.height - nativeEvent.contentOffset.y >= nativeEvent.layoutMeasurement.height - 10;
  }

  return (
    <View style={{backgroundColor: theme.primaryColor, flex: 1,}}>
      {!isLoading ? (
        <>
          <Animatable.View
            animation={animatedSearchVisible ? "bounceInUp" : "bounceOutDown"}
            onLayout={(event) => setInputHeight(event.nativeEvent.layout.height)}
          >
            <TextInput
              placeholder='Pokemon Ara ...'
              style={[styles.searchInput]}
              placeholderTextColor={theme.textColor}
              onChangeText={updateSearch}
              value={search}
            />
          </Animatable.View>
          <Animatable.View animation={{
              from: {
                top: animatedSearchVisible ? 0 : -(inputHeight - 25),
              },
              to: {
                top: animatedSearchVisible ? 5 : -( inputHeight - 5 ),
              },
          }}>
            <FlatList
              data={pokemons}
              renderItem={renderItemCall}
              keyboardShouldPersistTaps="always"
              keyExtractor={item => item.nid}
              onScroll={({ nativeEvent }) => { Keyboard.dismiss(); pokemons?.length > 5 && showSearchBar(nativeEvent)}}
              
            />
          </Animatable.View>
        </>
      ) : (
        <View style={{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
          <ActivityIndicator animating size="large"/>
        </View>
        )}
        <ActionSheet 
          initialOffsetFromBottom={0.6}
          ref={ref => (actionSheet = ref)}
          bounceOnOpen={true}
          bounciness={8}
          gestureEnabled={true}
          onClose={onClose}
          containerStyle={{backgroundColor: theme.primaryColor}}
          defaultOverlayOpacity={0.3}>
            <PokemonDetail pokemon={activePokemon}/>
        </ActionSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: '#e9e9e9', 
    paddingVertical: 15, 
    paddingHorizontal: 20, 
    borderRadius: 10, 
    width: '80%', 
    alignSelf: 'center', 
    marginTop: 10
  }
});
