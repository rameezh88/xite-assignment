import CheckBox from '@react-native-community/checkbox';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useLayoutEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useVideoFeedContext } from '../contexts/VideoFeedContextProvider';
import { RootStackParamsList } from '../navigation/RootNavigator';
import { Colors } from '../styles/colors';
import { Genre } from '../types';

type Props = NativeStackScreenProps<RootStackParamsList, 'Search'>;

interface HeaderProps {
  text: string;
}

const Header = ({ text }: HeaderProps) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>{text}</Text>
  </View>
);

const FilterScreen = ({ navigation }: Props) => {
  const { genres, setGenres, updateGenreFilterCriterion, clearFilters } =
    useVideoFeedContext();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
          <Text>{'Clear'}</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  const handleGenreItemSelected = (item: Genre, selected: boolean) => {
    item.selected = selected;
    const indexOfItem = genres?.findIndex((g: Genre) => g.id === item.id);
    const newGenreItems = Array.from(genres || []);
    if (indexOfItem !== undefined && indexOfItem >= 0) {
      newGenreItems[indexOfItem] = item;
      setGenres(newGenreItems);
      updateGenreFilterCriterion(item, selected);
    }
  };

  const renderGenreItem = (genre: Genre) => (
    <Pressable
      style={styles.genreItemContainer}
      key={genre.id}
      onPress={() => handleGenreItemSelected(genre, !genre.selected)}>
      <CheckBox
        value={genre.selected}
        onValueChange={value => handleGenreItemSelected(genre, value)}
      />
      <Text style={styles.genreItemName}>{genre.name}</Text>
    </Pressable>
  );

  return (
    <View>
      <ScrollView>
        <Header text={'Genre'} />
        {genres?.map(renderGenreItem)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  genreItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  genreItemName: {
    marginLeft: 5
  },
  header: {
    backgroundColor: Colors.lightGrey,
    padding: 5
  },
  headerText: {
    marginLeft: 5
  },
  clearButton: {
    marginRight: 10
  }
});

export default FilterScreen;
