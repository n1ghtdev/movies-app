import React from 'react';
import { Grid } from '@material-ui/core';
import MovieCard from '../movie-card';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/modules/reducers';
import { Movie } from 'src/modules/movies/types';
import { searchMovieRequest } from 'src/modules/movies/actions';

type Props = {};

function MoviesPage() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  React.useEffect(() => {
    dispatch(searchMovieRequest('inception'));
  }, [dispatch]);

  if (loading) {
    return <span>'loading...'</span>;
  }
  if (error) {
    return <span>{error.message}</span>;
  }

  return (
    <Grid container spacing={5}>
      {data.results.map((movie: Movie) => (
        <Grid item key={movie.id} xs={12} sm={6} md={4}>
          <MovieCard
            id={movie.id}
            title={movie.title}
            poster={movie.poster_path}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default MoviesPage;
