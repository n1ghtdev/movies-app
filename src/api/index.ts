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
  let url = `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`;

  if (!query) {
    url = `${API_URL}/movie/popular?api_key=${API_KEY}`;
  }

  const movies = await get<ResponseData>(url);
  return movies;
}

export async function fetchMore(query: string, page: number) {
  let url = `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;

  if (!query) {
    url = `${API_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
  }

  const movies = await get<ResponseData>(url);
  return movies;
}

export async function getMovieById(id: number) {
  const url = `${API_URL}/movie/${id}?api_key=${API_KEY}`;
  const movie = await get<Movie>(url);

  return movie;
}

export async function getMovies(ids: number[]) {
  return await Promise.all(
    ids.map(async (id: number) => {
      const response = await getMovieById(id);
      return response;
    })
  );
}
