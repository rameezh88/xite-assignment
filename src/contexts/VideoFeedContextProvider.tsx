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
  filterCount: number;
};

const VideoFeedContext = createContext({} as VideoFeedContextType);

export const useVideoFeedContext = () => useContext(VideoFeedContext);

export const VideoFeedContextProvider = (props: any) => {
  const [videos, setVideos] = useState<Video[] | null>(null);
  const [genres, setGenres] = useState<Genre[] | null>(null);
  const [filterCount, setFilterCount] = useState<number>(0);
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
    genres: [],
    year: 0
  });

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
    let count = 0;
    if (filterCriteria?.genres) {
      count = filterCriteria.genres.length;
    }

    if (filterCriteria?.year && filterCriteria.year > 0) {
      count++;
    }
    console.log('Updated filter criteria', filterCriteria);
    console.log('Filter count', count);
    setFilterCount(count);
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
        addYearFilterCriterion,
        filterCount
      }}>
      {props.children}
    </VideoFeedContext.Provider>
  );
};
