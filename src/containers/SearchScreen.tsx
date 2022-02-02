import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useLayoutEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { RootStackParamsList } from 'src/navigation/RootNavigator';
import Cross from '../assets/cross.svg';
import { Colors } from '../styles/colors';

type Props = NativeStackScreenProps<RootStackParamsList, 'Search'>;

const SearchScreen = ({ navigation }: Props) => {
  const searchInputRef = useRef<TextInput | null>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.searchContainer}>
          <TextInput
            ref={searchInputRef}
            style={styles.searchField}
            placeholderTextColor={Colors.metaGrey}
            placeholder="Search by title or artist"
          />
          <TouchableOpacity style={styles.searchClearButton}>
            <Cross size={30} fill="#000" />
          </TouchableOpacity>
        </View>
      )
    });
  }, [navigation]);

  return (
    <View>
      <Text>{'Search Screen'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchField: {
    paddingLeft: 10,
    width: '100%',
    alignSelf: 'center'
  },
  searchClearButton: {
    alignSelf: 'center',
    height: 25,
    width: 25
  }
});

export default SearchScreen;
