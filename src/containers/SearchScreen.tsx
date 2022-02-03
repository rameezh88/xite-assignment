import { NativeStackScreenProps } from '@react-navigation/native-stack';
import debounce from 'lodash.debounce';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState
} from 'react';
import { FlatList, View } from 'react-native';
import FeedVideoItem from '../components/FeedVideoItem';
import FilterSearchResultsBar from '../components/FilterSearchResultsBar';
import SearchField from '../components/SearchField';
import { useVideoFeedContext } from '../contexts/VideoFeedContextProvider';
import { RootStackParamsList } from '../navigation/RootNavigator';
import { Video } from '../types';

type Props = NativeStackScreenProps<RootStackParamsList, 'Search'>;

const SearchScreen = ({ navigation }: Props) => {
  const { videos, filterCount, filterCriteria } = useVideoFeedContext();
  const [searchResults, setSearchResults] = useState<Video[] | null>([]);

  useEffect(() => {
    const videoList =
      searchResults && searchResults?.length > 0 ? searchResults : videos;
    const videosFromGenreFilter = videoList?.filter(video => {
      if (filterCriteria?.genres.some(genre => genre.id === video.genre_id)) {
        return video;
      }
    });
    console.log('Got videos from Genre filter', videosFromGenreFilter);
    setSearchResults(videosFromGenreFilter || []);
  }, [filterCriteria]);

  const debouncedChangeTextHandler = useCallback(
    debounce((text: string) => {
      let results: Video[] | undefined | null = [];
      const videoList =
        searchResults && searchResults?.length > 0 ? searchResults : videos;
      if (text.length > 0) {
        results = videoList?.filter(video => {
          const searchStrRegex = new RegExp('\\b' + text?.toLowerCase(), 'gi');
          return (
            `${video.title}`.toLowerCase().match(searchStrRegex) ||
            `${video.artist}`.toLowerCase().match(searchStrRegex)
          );
        });
        console.log('Search text results', results);
      } else {
        results = videoList;
      }

      setSearchResults(results || []);
    }, 300),
    [searchResults]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <SearchField
          onClearText={() => {
            setSearchResults([]);
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
      <FlatList
        style={{ paddingBottom: 40 }}
        data={searchResults}
        renderItem={renderListItem}
        keyExtractor={(item: Video) => `${item.id}`}
        maxToRenderPerBatch={5}
      />
    </View>
  );
};

export default SearchScreen;
