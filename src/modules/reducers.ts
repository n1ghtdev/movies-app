import { combineReducers } from 'redux';
import moviesReducer from './movies/reducer';
import userReducer from './user/reducer';

const reducers = combineReducers({
  movies: moviesReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof reducers>;
export default reducers;
