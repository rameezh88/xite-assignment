import { NativeStackScreenProps } from '@react-navigation/native-stack';
import debounce from 'lodash.debounce';
import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import FeedVideoItem from '../components/FeedVideoItem';
import FilterSearchResultsBar from '../components/FilterSearchResultsBar';
import SearchField from '../components/SearchField';
import { useVideoFeedContext } from '../contexts/VideoFeedContextProvider';
import { RootStackParamsList } from '../navigation/RootNavigator';
import { Video } from '../types';

type Props = NativeStackScreenProps<RootStackParamsList, 'Search'>;

const SearchScreen = ({ navigation }: Props) => {
  const { videos, filterCount } = useVideoFeedContext();
  const [searchString, setSearchString] = useState<string | null>('');

  const searchResults: Video[] | undefined = useMemo(() => {
    if (searchString == '' || !searchString) {
      return [];
    }
    return videos?.filter(video => {
      const searchStrRegex = new RegExp(
        '\\b' + searchString.toLowerCase(),
        'gi'
      );
      return (
        `${video.title}`.toLowerCase().match(searchStrRegex) ||
        `${video.artist}`.toLowerCase().match(searchStrRegex)
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

  const renderListItem = ({ item }: { item: Video }) => (
    <FeedVideoItem video={item} />
  );

  return (
    <View>
      <FilterSearchResultsBar
        searchResultsCount={searchResults?.length || 0}
        onFilterPressed={() => navigation.navigate('Filter')}
        filterCount={filterCount}
      />
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
