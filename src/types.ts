interface Genre {
  id: number;
  name: string;
}

interface Video {
  id: number;
  artist: string;
  title: string;
  release_year: number;
  image_url: string;
  genre_id: number;
}

interface FeedResponse {
  genres: Genre[];
  videos: Video[];
}
