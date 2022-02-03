import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import XiteService from '../services/XiteService';
import { FeedResponse, Genre, Video } from '../types';

type VideoFeedContextType = {
  videos: Video[] | null;
  genres: Genre[] | null;
  isFeedLoading: boolean;
  feedLoadingError: unknown;
  refetchFeedInfo: () => void;
};

const VideoFeedContext = createContext({} as VideoFeedContextType);

export const useVideoFeedContext = () => useContext(VideoFeedContext);

export const VideoFeedContextProvider = (props: any) => {
  const [videos, setVideos] = useState<Video[] | null>(null);
  const [genres, setGenres] = useState<Genre[] | null>(null);

  const { data, isLoading, error, refetch } = useQuery<FeedResponse>(
    'feedInfo',
    XiteService.getFeed
  );

  useEffect(() => {
    if (data) {
      setGenres(data.genres);
      const videosWithGenre = data.videos.map(video => {
        const videoGenre = data.genres.find(
          genre => genre.id === video.genre_id
        );
        video.genre_name = videoGenre?.name;
        return video;
      });
      setVideos(videosWithGenre);
    }
  }, [data]);

  return (
    <VideoFeedContext.Provider
      value={{
        videos,
        genres,
        isFeedLoading: isLoading,
        feedLoadingError: error,
        refetchFeedInfo: refetch
      }}>
      {props.children}
    </VideoFeedContext.Provider>
  );
};
