import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import FeedVideoItem from '../components/FeedVideoItem';
import { useVideoFeedContext } from '../contexts/VideoFeedContextProvider';
import { Video } from '../types';

const FeedScreen = () => {
  const { videos, feedLoadingError, isFeedLoading, refetchFeedInfo } =
    useVideoFeedContext();

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
  }
});

export default FeedScreen;
