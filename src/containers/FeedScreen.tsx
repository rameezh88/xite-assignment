import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useQuery } from 'react-query';
import XiteService from '../services/XiteService';

const FeedScreen = () => {
  const { data, isLoading, error, refetch } = useQuery(
    'feedInfo',
    XiteService.getFeed
  );

  useEffect(() => {
    if (data) {
      console.log('Got data', data);
    }
  }, [data]);

  return (
    <View>
      <Text>{'Feed Screen'}</Text>
    </View>
  );
};

export default FeedScreen;
