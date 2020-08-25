// api key bb3a59e3fff5bbf88c96bf7d3614416d (v3 auth)
// v4 eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjNhNTllM2ZmZjViYmY4OGM5NmJmN2QzNjE0NDE2ZCIsInN1YiI6IjVmNDUwMmFiOTlkNWMzMDAzM2MyYWUxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.skH4k-SjkKATAg-RA_LiI1pLkDcXDSDeD9N4K7IRuWs
// https://api.themoviedb.org/3/movie/550?api_key=bb3a59e3fff5bbf88c96bf7d3614416d

import { ResponseData } from 'src/modules/movies/types';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_URL = 'https://api.themoviedb.org/3';

const buildAPIUrl = (url: string) => `${API_URL}${url}?api_key=${API_KEY}`;

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
