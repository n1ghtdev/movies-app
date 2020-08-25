import produce from 'immer';
import { AnyAction } from 'redux';
import { Types, State, Movie } from './types';

const initialState: State = {
  data: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  loading: false,
  error: null,
  query: '',
};

const reducer = (state: State = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case Types.SEARCH_MOVIE_REQUEST:
        draft.loading = true;
        draft.error = null;
        draft.query = action.payload.query;
        break;
      case Types.GET_MOVIE_REQUEST:
      case Types.FETCH_MORE_REQUEST:
        draft.loading = true;
        draft.error = null;
        break;
      case Types.SEARCH_MOVIE_SUCCESS:
        draft.loading = false;
        draft.data = action.payload.data;
        break;
      case Types.FETCH_MORE_SUCCESS:
        const { data } = action.payload;
        draft.loading = false;
        draft.data = {
          page: data.page,
          total_pages: data.total_pages,
          total_results: data.total_results,
          results: [...state.data.results, ...data.results],
        };
        break;
      case Types.GET_MOVIE_SUCCESS:
        const { movie } = action.payload;

        if (
          state.data.results.findIndex(
            (stateMovie: Movie) => stateMovie.id === movie.id
          ) === -1
        ) {
          draft.data.results.push(movie);
        }

        draft.loading = false;
        break;
      case Types.SEARCH_MOVIE_FAILURE:
      case Types.GET_MOVIE_FAILURE:
        draft.loading = false;
        draft.error = action.payload.error;
        break;
      default:
        return state;
    }
  });

export default reducer;
