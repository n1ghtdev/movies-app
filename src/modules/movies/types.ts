export type State = {
  data: ResponseData;
  loading: boolean;
  error: Error | null;
};

export type ResponseData = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type Movie = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export enum Types {
  SEARCH_MOVIE_REQUEST = '@@search-movie/request',
  SEARCH_MOVIE_SUCCESS = '@@search-movie/success',
  SEARCH_MOVIE_FAILURE = '@@search-movie/failure',

  GET_MOVIE_REQUEST = '@@get-movie/request',
  GET_MOVIE_SUCCESS = '@@get-movie/success',
  GET_MOVIE_FAILURE = '@@get-movie/failure',
}
