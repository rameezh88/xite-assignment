import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import FeedScreen from '../containers/FeedScreen';
import SearchScreen from '../containers/SearchScreen';

const Stack = createStackNavigator();

const headerTintColor = '#000';

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        options={{ headerTitle: 'Feed', headerTintColor }}
        component={FeedScreen}
      />
      <Stack.Screen
        name="Search"
        options={{ headerTitle: '', headerTintColor }}
        component={SearchScreen}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
