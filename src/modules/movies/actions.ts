import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

import { RootState } from '../reducers';
import { Types, ResponseData, Movie } from './types';
import {
  searchMoviesByQuery,
  getMovieById,
  fetchMore,
  getMovies,
} from 'src/api';

export function searchMovieRequest(
  query: string
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async (dispatch) => {
    dispatch({ type: Types.SEARCH_MOVIE_REQUEST, payload: { query } });

    searchMoviesByQuery(query).then(
      (data: ResponseData) => {
        dispatch(searchMovieSuccess(data));
      },
      (error: Error) => {
        dispatch(searchMovieFailure(error));
      }
    );
  };
}

export function searchMovieSuccess(data: ResponseData) {
  return {
    type: Types.SEARCH_MOVIE_SUCCESS,
    payload: {
      data,
    },
  };
}

export function searchMovieFailure(error: Error) {
  return {
    type: Types.SEARCH_MOVIE_FAILURE,
    payload: {
      error,
    },
  };
}

export function getMovieRequest(
  id: number
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async (dispatch) => {
    dispatch({ type: Types.GET_MOVIE_REQUEST });

    getMovieById(id).then(
      (movie: Movie) => {
        dispatch(getMovieSuccess(movie));
      },
      (error: Error) => {
        dispatch(getMovieFailure(error));
      }
    );
  };
}

export function getMovieSuccess(movie: Movie) {
  return {
    type: Types.GET_MOVIE_SUCCESS,
    payload: {
      movie,
    },
  };
}

export function getMovieFailure(error: Error) {
  return {
    type: Types.GET_MOVIE_FAILURE,
    payload: {
      error,
    },
  };
}

export function fetchMoreRequest(
  query: string,
  page: number
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async (dispatch) => {
    dispatch({ type: Types.FETCH_MORE_REQUEST });

    fetchMore(query, page).then(
      (data: ResponseData) => {
        dispatch(fetchMoreSuccess(data));
      },
      (error: Error) => {
        dispatch(searchMovieFailure(error));
      }
    );
  };
}

export function fetchMoreSuccess(data: ResponseData) {
  return {
    type: Types.FETCH_MORE_SUCCESS,
    payload: {
      data,
    },
  };
}

export function getMoviesRequest(
  ids: number[]
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async (dispatch) => {
    dispatch({ type: Types.GET_MOVIES_REQUEST });

    getMovies(ids).then(
      (data: Movie[]) => {
        dispatch(getMoviesSuccess(data));
      },
      (error: Error) => {
        dispatch(getMoviesFailure(error));
      }
    );
  };
}

export function getMoviesSuccess(data: Movie[]) {
  return {
    type: Types.GET_MOVIES_SUCCESS,
    payload: {
      data,
    },
  };
}

export function getMoviesFailure(error: Error) {
  return {
    type: Types.GET_MOVIES_FAILURE,
    payload: {
      error,
    },
  };
}
