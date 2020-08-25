import { ResponseData, Movie } from 'src/modules/movies/types';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_URL = 'https://api.themoviedb.org/3';

const headers = {
  'content-type': 'application/json',
};

async function get<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers,
  });

  const json = await response.json();

  if (response.ok) {
    return json;
  } else {
    throw new Error(json.message);
  }
}

export async function searchMoviesByQuery(query: string) {
  const url = `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`;
  const movies = await get<ResponseData>(url);
  return movies;
}

export async function fetchMore(query: string, page: number) {
  const url = `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;
  const movies = await get<ResponseData>(url);
  return movies;
}

export async function getMovieById(id: number) {
  const url = `${API_URL}/movie/${id}?api_key=${API_KEY}`;
  const movie = await get<Movie>(url);

  return movie;
}
