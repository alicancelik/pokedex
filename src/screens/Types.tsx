import React, {useMemo, useCallback} from 'react';
import { View, FlatList, StyleSheet,Image, Text, } from 'react-native';
import {ThemeContext} from '../contexts/ThemeContext';
import { PokemonTypeImage, Types as Data } from '../const/typeImages';
import FastImage from 'react-native-fast-image';
import * as Animatable from 'react-native-animatable';

interface ITypesProps {}

function Item({ item }, theme) {
  return (
    <View style={[styles.rowContainer, {backgroundColor: theme.primaryColor}]}>
      <Text style={[styles.name, {color: theme.textColor}]}> {item.title} </Text>
      <Animatable.View animation="zoomIn"> 
        <FastImage source={item.image} style={{width: 50, height: 50}}/>
      </Animatable.View>
    </View>
  );
}

export const Types: React.SFC<ITypesProps> = (props) => {
  const theme = React.useContext(ThemeContext);
  const renderItemCall = useCallback(({ item }) =>Item({ item }, theme));

  return (
    <>
      <FlatList
        data={Data}
        renderItem={renderItemCall}
        keyExtractor={item => item.id}
      />
    </>
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
