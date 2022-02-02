import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useLayoutEffect } from 'react';
import { Text, View } from 'react-native';
import SearchField from '../components/SearchField';
import { RootStackParamsList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamsList, 'Search'>;

const SearchScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <SearchField onChangeText={(text: string) => {}} />
    });
  }, [navigation]);

  return (
    <View>
      <Text>{'Search Screen'}</Text>
    </View>
  );
};

export default SearchScreen;
