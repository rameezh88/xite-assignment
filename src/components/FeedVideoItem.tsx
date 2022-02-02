import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Video } from 'src/types';
import { Colors } from '../styles/colors';

export interface FeedListItemProps {
  video: Video;
}

const FeedVideoItem = (props: FeedListItemProps) => {
  const { video } = props;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: video.image_url
        }}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{video.title}</Text>
        <Text style={styles.artist}>{video.artist}</Text>
        <View style={styles.metaInfoContainer}>
          <Text style={styles.metaInfoText}>{video.release_year}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 15,
    width: '100%'
  },
  image: {
    height: 180,
    backgroundColor: Colors.lightGrey
  },
  contentContainer: {
    flex: 1
  },
  title: {
    fontSize: 18,
    paddingVertical: 8,
    fontWeight: 'bold',
    flex: 1
  },
  artist: {
    fontSize: 14,
    paddingBottom: 8,
    flex: 1
  },
  metaInfoContainer: {
    flexDirection: 'row'
  },
  metaInfoText: {
    fontSize: 11,
    marginTop: 6,
    paddingHorizontal: 5,
    color: Colors.metaGrey,
    borderColor: Colors.metaGrey,
    borderRadius: 3,
    borderWidth: 1
  }
});

export default FeedVideoItem;
