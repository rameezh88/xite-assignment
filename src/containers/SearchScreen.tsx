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
  const [searchText, setSearchText] = useState<string | null>('');

  useEffect(() => {
    let videosFromGenreFilter: Video[] | null | undefined = [];

    if (filterCriteria?.genres.length == 0 && searchText?.length == 0) {
      setSearchResults([]);
      return;
    }

    if (filterCriteria && filterCriteria?.genres.length > 0) {
      filterCriteria?.genres.forEach(genre => {
        const videosForGenre = videos?.filter(video => {
          if (genre.id === video.genre_id) {
            return video;
          }
        });

        videosFromGenreFilter = videosFromGenreFilter?.concat(
          videosForGenre || []
        );
      });
    } else {
      videosFromGenreFilter = videos;
    }

    let results: Video[] | undefined | null = [];
    if (searchText && searchText.length > 0) {
      results = videosFromGenreFilter?.filter(video => {
        const searchStrRegex = new RegExp(
          '\\b' + searchText?.toLowerCase(),
          'gi'
        );
        return (
          `${video.title}`.toLowerCase().match(searchStrRegex) ||
          `${video.artist}`.toLowerCase().match(searchStrRegex)
        );
      });
    } else {
      results = videosFromGenreFilter;
    }

    setSearchResults(results || []);
  }, [filterCriteria, searchText]);

  const debouncedChangeTextHandler = useCallback(
    debounce((text: string) => setSearchText(text), 300),
    [searchResults]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <SearchField
          onClearText={() => {
            setSearchText('');
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
      {searchResults && (
        <FlatList
          style={{ paddingBottom: 40 }}
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
