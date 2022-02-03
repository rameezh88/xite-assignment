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
  clearFilters: () => void;
  filterCount: number;
};

const VideoFeedContext = createContext({} as VideoFeedContextType);

export const useVideoFeedContext = () => useContext(VideoFeedContext);

const emptyCriteria: FilterCriteria = {
  genres: [],
  year: 0
};

export const VideoFeedContextProvider = (props: any) => {
  const [videos, setVideos] = useState<Video[] | null>(null);
  const [genres, setGenres] = useState<Genre[] | null>(null);
  const [filterCount, setFilterCount] = useState<number>(0);
  const [filterCriteria, setFilterCriteria] =
    useState<FilterCriteria>(emptyCriteria);

  const { data, isLoading, error, refetch } = useQuery<FeedResponse>(
    'feedInfo',
    XiteService.getFeed
  );

  useEffect(() => {
    if (data) {
      setGenres(
        data.genres?.map(genre => ({
          ...genre,
          selected: false
        }))
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

  const updateGenreFilterCriterion = (criterion: Genre, selected: boolean) => {
    console.log('Should update genre filter criteria', filterCriteria.genres);
    const newGenres = filterCriteria?.genres;
    if (selected) {
      newGenres?.push(criterion);
    } else {
      if (newGenres?.length === 1) {
        newGenres.pop();
        console.log('Should empty array', newGenres);
      } else {
        const indexOfGenre = newGenres?.findIndex(g => g.id === criterion.id);
        console.log(
          'Should remove genre item from filter criteria',
          indexOfGenre,
          newGenres
        );
        newGenres?.splice(indexOfGenre, 1);
        console.log('Removed genre item', newGenres);
      }
    }

    setFilterCriteria({
      genres: Array.from(newGenres || []),
      year: filterCriteria?.year || 0
    });

    let count = newGenres.length;

    if (filterCriteria?.year && filterCriteria.year > 0) {
      console.log('Incrementing filter count');
      count++;
    }
    setFilterCount(count);
  };

  const addYearFilterCriterion = (criterion: number) => {
    setFilterCriteria({
      genres: filterCriteria?.genres || [],
      year: criterion
    });

    setFilterCount(oldFilterCount => oldFilterCount++);
  };

  const clearFilters = () => {
    const refreshedGenreList = genres?.map(genre => {
      genre.selected = false;
      return genre;
    });
    setGenres([...(refreshedGenreList || [])]);
    setFilterCount(0);
    setFilterCriteria({ ...emptyCriteria });
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
        clearFilters,
        filterCount
      }}>
      {props.children}
    </VideoFeedContext.Provider>
  );
};
