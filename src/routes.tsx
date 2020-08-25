import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './components/pages/login-page';
import MoviesPage from './components/pages/movies-page';
import MoviePage from './components/pages/movie-page';

function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/movies" component={MoviesPage} />
      <Route exact path="/movies/:id" component={MoviePage} />
      {/* <Route exact path="/admin" component={<div>admin</div>} /> */}
    </Switch>
  );
}

export default Routes;
