export interface Genre {
  id: number;
  name: string;
  selected: boolean;
}

export interface Video {
  id: number;
  artist: string;
  title: string;
  release_year: number;
  image_url: string;
  genre_id: number;
  genre_name?: string;
}

export interface FeedResponse {
  genres: Genre[];
  videos: Video[];
}

export interface FilterCriteria {
  genres: Genre[];
  year: number;
}
