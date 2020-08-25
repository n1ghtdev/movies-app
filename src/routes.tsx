import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignUpPage from './components/pages/sign-up-page';
import MoviesPage from './components/pages/movies-page';

function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={SignUpPage} />
      <Route exact path="/movies" component={MoviesPage} />
      {/* <Route exact path="/movies/:id" component={<div>movie</div>} />
      <Route exact path="/admin" component={<div>admin</div>} /> */}
    </Switch>
  );
}

export default Routes;