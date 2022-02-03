import CheckBox from '@react-native-community/checkbox';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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
  const { genres, setGenres } = useVideoFeedContext();
  // const [year, setYear] = useState<string | null>(null);

  const handleGenreItemSelected = (item: Genre, selected: boolean) => {
    item.selected = selected;
    const indexOfItem = genres?.findIndex((g: Genre) => g.id === item.id);
    const newGenreItems = Array.from(genres || []);
    if (indexOfItem && indexOfItem > 0) {
      newGenreItems[indexOfItem] = item;
      setGenres(newGenreItems);
    }
  };

  const renderGenreItem = (genre: Genre) => {
    return (
      <Pressable
        style={styles.genreItemContainer}
        onPress={() => handleGenreItemSelected(genre, !genre.selected)}>
        <CheckBox
          value={genre.selected}
          onValueChange={value => handleGenreItemSelected(genre, value)}
        />
        <Text style={styles.genreItemName}>{genre.name}</Text>
      </Pressable>
    );
  };

  return (
    <View>
      <ScrollView>
        <Header text={'Genre'} />
        {genres?.map(renderGenreItem)}
        <Header text={'Year'} />
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
  }
});

export default FilterScreen;
