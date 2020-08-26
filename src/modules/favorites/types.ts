export type State = {
  ids: number[];
  loading: boolean;
  error: Error | null;
};

export enum Types {
  GET_FAVORITES_REQUEST = '@@get-favorites/request',
  GET_FAVORITES_SUCCESS = '@@get-favorites/success',
  GET_FAVORITES_FAILURE = '@@get-favorites/failure',

  ADD_FAVORITE_REQUEST = '@@add-favorite/request',
  ADD_FAVORITE_SUCCESS = '@@add-favorite/success',
  ADD_FAVORITE_FAILURE = '@@add-favorite/failure',

  DELETE_FAVORITE_REQUEST = '@@delete-favorite/request',
  DELETE_FAVORITE_SUCCESS = '@@delete-favorite/success',
  DELETE_FAVORITE_FAILURE = '@@delete-favorite/failure',
}
