import { NativeStackScreenProps } from '@react-navigation/native-stack';
import debounce from 'lodash.debounce';
import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import FeedVideoItem from '../components/FeedVideoItem';
import SearchField from '../components/SearchField';
import { useVideoFeedContext } from '../contexts/VideoFeedContextProvider';
import { RootStackParamsList } from '../navigation/RootNavigator';
import { Video } from '../types';

type Props = NativeStackScreenProps<RootStackParamsList, 'Search'>;

const SearchScreen = ({ navigation }: Props) => {
  const { videos } = useVideoFeedContext();
  const [searchString, setSearchString] = useState<string | null>('');

  const searchResults: Video[] | undefined = useMemo(() => {
    if (searchString == '' || !searchString) {
      console.log('Search string is empty. Returning empty array');
      return [];
    }
    return videos?.filter(video => {
      console.log('Should filter video with search string', searchString);
      return (
        `${video.title}`.toLowerCase().includes(searchString.toLowerCase()) ||
        `${video.artist}`.toLowerCase().includes(searchString.toLowerCase())
      );
    });
  }, [searchString]);

  const debouncedChangeTextHandler = useCallback(
    debounce((text: string) => setSearchString(text), 300),
    []
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <SearchField
          onClearText={() => {
            setSearchString('');
          }}
          onChangeText={debouncedChangeTextHandler}
        />
      )
    });
  }, [navigation]);

  console.log('Search results', searchResults);

  const renderListItem = ({ item }: { item: Video }) => (
    <FeedVideoItem video={item} />
  );

  return (
    <View>
      {searchResults && searchString !== null && searchString.length > 0 && (
        <FlatList
          data={searchResults}
          renderItem={renderListItem}
          keyExtractor={(item: Video) => `${item.id}`}
          maxToRenderPerBatch={5}
        />
      )}
    </View>
  );
};

export default SearchScreen;
