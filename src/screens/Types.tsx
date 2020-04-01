import * as React from 'react';
import {View, Text} from 'react-native';
import {ThemeContext} from '../contexts/ThemeContext';

interface ITypesProps {}

export const Types: React.SFC<ITypesProps> = (props) => {
  const theme = React.useContext(ThemeContext);
  console.log(theme);
  return (
    <View style={{backgroundColor: theme.primaryColor}}>
      <Text>Types</Text>
    </View>
  );
};
