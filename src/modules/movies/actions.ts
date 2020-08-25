import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

import { RootState } from '../reducers';
import { Types, ResponseData, Movie } from './types';
import { searchMoviesByQuery, getMovieById } from 'src/api';

export function searchMovieRequest(
  query: string
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async (dispatch) => {
    dispatch({ type: Types.SEARCH_MOVIE_REQUEST });

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
