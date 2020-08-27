import React from 'react';
import { Grid, Paper, Button, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState } from 'src/modules/reducers';
import { Movie } from 'src/modules/movies/types';
import { getMovieRequest } from 'src/modules/movies/actions';
import { addFavoriteRequest } from 'src/modules/favorites/actions';
import useAuth from 'src/hooks/use-auth';

import Poster from 'src/components/poster';

function MoviePage() {
  const { id: movieId } = useParams();
  const dispatch = useDispatch();

  const { isAuthorized } = useAuth();
  const movie = useSelector((state: RootState) =>
    state.movies.data.results.find(
      (movie: Movie) => movie.id === Number(movieId)
    )
  );
  const { loading, error } = useSelector((state: RootState) => state.movies);
  const isFavorite = useSelector(
    (state: RootState) =>
      state.favorites.ids.findIndex((id: number) => id === Number(movieId)) !==
      -1
  );

  React.useEffect(() => {
    if (!movie) {
      dispatch(getMovieRequest(Number(movieId)));
    }
  }, [dispatch, movie, movieId]);

  function addToFavorites() {
    dispatch(addFavoriteRequest(movieId));
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <span>{error.message}</span>;
  }

  if (!movie) {
    return <span>not found</span>;
  }

  return (
    <Paper style={{ padding: '15px' }}>
      <Grid container spacing={5}>
        <Grid item md={3}>
          <Poster path={movie.poster_path} alt={movie.title} />
        </Grid>
        <Grid item md={9}>
          <h2>{movie.title}</h2>
          <div>{new Date(movie.release_date).toLocaleDateString()}</div>
          <p>{movie.overview}</p>
          {isAuthorized ? (
            <Button
              disabled={isFavorite}
              onClick={() => addToFavorites()}
              color="primary"
              variant="contained"
            >
              {isFavorite ? 'In favorites' : 'Add to favorites'}
            </Button>
          ) : null}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default MoviePage;
