/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme
} from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { VideoFeedContextProvider } from './contexts/VideoFeedContextProvider';
import RootNavigator from './navigation/RootNavigator';

const client = new QueryClient();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <QueryClientProvider client={client}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <VideoFeedContextProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </VideoFeedContextProvider>
      </SafeAreaView>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
