import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useVideoFeedContext } from '../contexts/VideoFeedContextProvider';
import { RootStackParamsList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamsList, 'Search'>;

const FilterScreen = ({ navigation }: Props) => {
  const { genres } = useVideoFeedContext();
  const [year, setYear] = useState<string | null>(null);

  return (
    <View>
      <Text>{'Filter Screen'}</Text>
    </View>
  );
};

export default FilterScreen;
