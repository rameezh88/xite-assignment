import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import XiteService from '../services/XiteService';
import { FeedResponse, FilterCriteria, Genre, Video } from '../types';

type VideoFeedContextType = {
  videos: Video[] | null;
  genres: Genre[] | null;
  isFeedLoading: boolean;
  feedLoadingError: unknown;
  refetchFeedInfo: () => void;
  setGenres: (genres: Genre[]) => void;
  filterCriteria: FilterCriteria | null;
  updateGenreFilterCriterion: (criterion: Genre, selected: boolean) => void;
  addYearFilterCriterion: (criterion: number) => void;
};

const VideoFeedContext = createContext({} as VideoFeedContextType);

export const useVideoFeedContext = () => useContext(VideoFeedContext);

export const VideoFeedContextProvider = (props: any) => {
  const [videos, setVideos] = useState<Video[] | null>(null);
  const [genres, setGenres] = useState<Genre[] | null>(null);
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria | null>(
    null
  );

  const { data, isLoading, error, refetch } = useQuery<FeedResponse>(
    'feedInfo',
    XiteService.getFeed
  );

  useEffect(() => {
    if (data) {
      setGenres(
        data.genres?.map(genre => {
          return {
            ...genre,
            key: `${genre.id}`,
            selected: false
          };
        })
      );

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

  useEffect(() => {
    console.log('Updated filter criteria', filterCriteria);
  }, [filterCriteria]);

  const updateGenreFilterCriterion = (criterion: Genre, selected: boolean) => {
    const newGenres = filterCriteria?.genres;
    if (selected) {
      newGenres?.push(criterion);
    } else {
      const indexOfGenre = newGenres?.findIndex(g => g.id === criterion.id);
      if (indexOfGenre) {
        newGenres?.splice(indexOfGenre, 1);
      }
    }
    setFilterCriteria({
      genres: Array.from(newGenres || []),
      year: filterCriteria?.year || 0
    });
  };

  const addYearFilterCriterion = (criterion: number) => {
    setFilterCriteria({
      genres: filterCriteria?.genres || [],
      year: criterion
    });
  };

  return (
    <VideoFeedContext.Provider
      value={{
        videos,
        genres,
        setGenres,
        isFeedLoading: isLoading,
        feedLoadingError: error,
        refetchFeedInfo: refetch,
        filterCriteria,
        updateGenreFilterCriterion,
        addYearFilterCriterion
      }}>
      {props.children}
    </VideoFeedContext.Provider>
  );
};
