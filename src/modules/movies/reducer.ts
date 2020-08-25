import produce from 'immer';
import { AnyAction } from 'redux';
import { Types, State } from './types';

const initialState: State = {
  data: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  loading: false,
  error: null,
};

const reducer = (state: State = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case Types.SEARCH_MOVIE_REQUEST:
        draft.loading = true;
        draft.error = null;
        break;
      case Types.SEARCH_MOVIE_SUCCESS:
        draft.loading = false;
        draft.data = action.payload.data;
        break;
      case Types.SEARCH_MOVIE_FAILURE:
        draft.loading = false;
        draft.error = action.payload.error;
        break;
      default:
        return state;
    }
  });

export default reducer;
