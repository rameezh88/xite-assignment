import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useQuery } from 'react-query';
import XiteService from '../services/XiteService';

const FeedScreen = () => {
  const { data, isLoading, error, refetch } = useQuery<FeedResponse>(
    'feedInfo',
    XiteService.getFeed
  );

  useEffect(() => {
    if (data) {
      console.log('Got data', data);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      {error && (
        <TouchableWithoutFeedback style={styles.errorContent} onPress={refetch}>
          <Text>Error loading items. Tap to try again</Text>
        </TouchableWithoutFeedback>
      )}
      {data && <Text>{'Items loaded'}</Text>}
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
