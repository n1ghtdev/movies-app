import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

import { RootState } from '../reducers';
import { Types, ResponseData } from './types';
import { searchMoviesByQuery } from 'src/api';

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
