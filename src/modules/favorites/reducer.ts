import produce from 'immer';
import { AnyAction } from 'redux';
import { Types, State } from './types';
import { Movie } from '../movies/types';

const initialState: State = {
  ids: [],
  loading: false,
  error: null,
};

const reducer = (state: State = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case Types.GET_FAVORITES_REQUEST:
      case Types.ADD_FAVORITE_REQUEST:
      case Types.DELETE_FAVORITE_REQUEST:
        draft.loading = true;
        draft.error = null;
        break;
      case Types.GET_FAVORITES_SUCCESS:
        draft.loading = false;
        draft.ids = action.payload.data.map((id: any) => Number(id));
        break;
      case Types.ADD_FAVORITE_SUCCESS:
        draft.loading = false;
        draft.ids = [...state.ids, Number(action.payload.id)];
        break;
      case Types.DELETE_FAVORITE_SUCCESS:
        draft.loading = false;
        const filtered = state.ids.filter(
          (id: number) => id !== action.payload.id
        );
        draft.ids = filtered;
        break;
      case Types.GET_FAVORITES_FAILURE:
      case Types.ADD_FAVORITE_FAILURE:
      case Types.DELETE_FAVORITE_FAILURE:
        draft.loading = false;
        draft.error = action.payload.error;
        break;
      default:
        return state;
    }
  });

export default reducer;
