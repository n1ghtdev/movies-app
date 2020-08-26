import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './components/pages/login-page';
import MoviesPage from './components/pages/movies-page';
import MoviePage from './components/pages/movie-page';
import PrivateRoute from './components/private-route';
import ProfilePage from './components/pages/profile-page';
import FavoritesPage from './components/pages/favorites-page';

function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/movies" component={MoviesPage} />
      <Route exact path="/movies/:id" component={MoviePage} />
      <PrivateRoute exact path="/profile" component={ProfilePage} />
      <PrivateRoute exact path="/favorites" component={FavoritesPage} />
    </Switch>
  );
}

export default Routes;
