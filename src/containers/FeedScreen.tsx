import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useQuery } from 'react-query';
import { FeedResponse, Video } from 'src/types';
import FeedVideoItem from '../components/FeedVideoItem';
import XiteService from '../services/XiteService';

const FeedScreen = () => {
  const [videos, setVideos] = useState<Video[] | null>(null);
  const { data, isLoading, error, refetch } = useQuery<FeedResponse>(
    'feedInfo',
    XiteService.getFeed
  );

  useEffect(() => {
    if (data) {
      console.log('Got data', data);
      setVideos(data.videos);
    }
  }, [data]);

  const renderListItem = ({ item }: { item: Video }) => (
    <FeedVideoItem video={item} />
  );

  return (
    <View style={styles.container}>
      {error && (
        <TouchableWithoutFeedback style={styles.errorContent} onPress={refetch}>
          <Text>Error loading items. Tap to try again</Text>
        </TouchableWithoutFeedback>
      )}
      {data && (
        <FlatList
          data={videos}
          renderItem={renderListItem}
          keyExtractor={(item: Video) => `${item.id}`}
          maxToRenderPerBatch={5}
        />
      )}
      {isLoading && <ActivityIndicator style={styles.loader} size="large" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  loader: {
    marginTop: 20,
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
