import produce from 'immer';
import { AnyAction } from 'redux';
import { Types, State } from './types';

const initialState: State = {
  user: {
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    password: '',
  },
  isAuthorized: false,
  loading: false,
  error: null,
};

const reducer = (state: State = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case Types.SIGNUP_REQUEST:
      case Types.SIGNIN_REQUEST:
        draft.loading = true;
        draft.error = null;
        break;
      case Types.SIGNUP_SUCCESS:
      case Types.SIGNIN_SUCCESS:
        draft.user = action.payload.user;
        draft.isAuthorized = true;
        draft.loading = false;
        break;
      case Types.SIGNUP_FAILURE:
      case Types.SIGNIN_FAILURE:
        draft.loading = false;
        draft.error = action.payload.error;
        break;
      case Types.LOGOUT:
        draft.user = initialState.user;
        draft.isAuthorized = false;
        break;
      default:
        return state;
    }
  });

export default reducer;
