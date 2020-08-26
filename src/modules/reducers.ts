import { combineReducers } from 'redux';
import moviesReducer from './movies/reducer';
import userReducer from './user/reducer';
import favoritesReducer from './favorites/reducer';

const reducers = combineReducers({
  movies: moviesReducer,
  user: userReducer,
  favorites: favoritesReducer,
});

export type RootState = ReturnType<typeof reducers>;
export default reducers;
