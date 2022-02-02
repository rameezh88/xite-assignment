import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useLayoutEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native-gesture-handler';
import { RootStackParamsList } from 'src/navigation/RootNavigator';
import SearchIcon from '../assets/search.svg';
import FeedVideoItem from '../components/FeedVideoItem';
import { useVideoFeedContext } from '../contexts/VideoFeedContextProvider';
import { Video } from '../types';

type Props = NativeStackScreenProps<RootStackParamsList, 'Feed'>;

const FeedScreen = ({ navigation }: Props) => {
  const { videos, feedLoadingError, isFeedLoading, refetchFeedInfo } =
    useVideoFeedContext();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.feedHeaderRightButton}
          onPress={() => navigation.navigate('Search')}>
          <SearchIcon />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  const renderListItem = ({ item }: { item: Video }) => (
    <FeedVideoItem video={item} />
  );

  return (
    <View style={styles.container}>
      {feedLoadingError && (
        <TouchableWithoutFeedback
          style={styles.errorContent}
          onPress={refetchFeedInfo}>
          <Text>Error loading items. Tap to try again</Text>
        </TouchableWithoutFeedback>
      )}
      {videos && (
        <FlatList
          data={videos}
          renderItem={renderListItem}
          keyExtractor={(item: Video) => `${item.id}`}
          maxToRenderPerBatch={5}
        />
      )}
      {isFeedLoading && (
        <ActivityIndicator style={styles.loader} size="large" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  loader: {
    marginTop: 30,
    alignSelf: 'center'
  },
  errorContent: {
    color: 'grey',
    padding: 30,
    textAlign: 'center',
    alignSelf: 'center'
  },
  feedHeaderRightButton: {
    height: 45,
    width: 45,
    padding: 11,
    marginRight: 5
  }
});

export default FeedScreen;
