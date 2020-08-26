import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

import { RootState } from '../reducers';
import { Types } from './types';
import {
  addFavoriteMovie,
  getFavoriteMovies,
  deleteFavoriteMovie,
} from 'src/api/favorites-mock';

export function getFavoritesRequest(): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> {
  return async (dispatch) => {
    dispatch({ type: Types.GET_FAVORITES_REQUEST });

    getFavoriteMovies().then(
      (data: number[]) => {
        dispatch(getFavoritesSuccess(data));
      },
      (error: Error) => {
        dispatch(getFavoritesFailure(error));
      }
    );
  };
}

export function getFavoritesSuccess(data: number[]) {
  return {
    type: Types.GET_FAVORITES_SUCCESS,
    payload: {
      data,
    },
  };
}

export function getFavoritesFailure(error: Error) {
  return {
    type: Types.GET_FAVORITES_FAILURE,
    payload: {
      error,
    },
  };
}

export function addFavoriteRequest(
  id: number
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async (dispatch) => {
    dispatch({ type: Types.ADD_FAVORITE_REQUEST });

    addFavoriteMovie(id).then(
      (movieId: number) => {
        dispatch(addFavoriteSuccess(movieId));
      },
      (error: Error) => {
        dispatch(addFavoriteFailure(error));
      }
    );
  };
}

export function addFavoriteSuccess(id: number) {
  return {
    type: Types.ADD_FAVORITE_SUCCESS,
    payload: {
      id,
    },
  };
}

export function addFavoriteFailure(error: Error) {
  return {
    type: Types.ADD_FAVORITE_FAILURE,
    payload: {
      error,
    },
  };
}

export function deleteFavoriteRequest(
  id: number
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async (dispatch) => {
    dispatch({ type: Types.DELETE_FAVORITE_REQUEST });

    deleteFavoriteMovie(id).then(
      (movieId: number) => {
        dispatch(deleteFavoriteSuccess(movieId));
      },
      (error: Error) => {
        dispatch(deleteFavoriteFailure(error));
      }
    );
  };
}

export function deleteFavoriteSuccess(id: number) {
  return {
    type: Types.DELETE_FAVORITE_SUCCESS,
    payload: {
      id,
    },
  };
}

export function deleteFavoriteFailure(error: Error) {
  return {
    type: Types.DELETE_FAVORITE_FAILURE,
    payload: {
      error,
    },
  };
}
