import React, { useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CrossIcon from '../assets/cross.svg';
import { Colors } from '../styles/colors';

export interface SearchFieldProps {
  onChangeText: (text: string) => void;
  onClearText?: () => void;
}

const SearchField = (props: SearchFieldProps) => {
  const { onClearText } = props;
  const searchInputRef = useRef<TextInput | null>(null);
  return (
    <View style={styles.searchContainer}>
      <TextInput
        {...props}
        ref={searchInputRef}
        style={styles.searchField}
        placeholderTextColor={Colors.metaGrey}
        placeholder="Search by title or artist"
      />
      <TouchableOpacity
        style={styles.searchClearButton}
        onPress={() => {
          searchInputRef.current?.clear();
          if (onClearText) {
            onClearText();
          }
        }}>
        <CrossIcon size={30} fill="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchField: {
    paddingLeft: 10,
    width: '100%',
    alignSelf: 'center'
  },
  searchClearButton: {
    alignSelf: 'center',
    height: 25,
    width: 25
  }
});

export default SearchField;
