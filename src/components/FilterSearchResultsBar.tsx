import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../styles/colors';

export interface FilterSearchResultsBarProps {
  searchResultsCount: number;
  onFilterPressed: () => void;
}

const FilterSearchResultsBar = ({
  searchResultsCount,
  onFilterPressed
}: FilterSearchResultsBarProps) => {
  return (
    <View style={styles.container}>
      <Text
        style={
          styles.searchResultsText
        }>{`Search Results: ${searchResultsCount}`}</Text>
      <TouchableOpacity style={styles.filterButton} onPress={onFilterPressed}>
        <Text style={styles.filterText}>{'Filter'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const fontStyle = {
  color: 'white',
  fontSize: 13
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundGrey,
    alignItems: 'center',
    padding: 8
  },
  searchResultsText: {
    ...fontStyle,
    flex: 1
  },
  filterButton: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 2,
    paddingHorizontal: 4
  },
  filterText: {
    ...fontStyle
  }
});

export default FilterSearchResultsBar;
