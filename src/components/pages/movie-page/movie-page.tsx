import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/modules/reducers';
import { Movie } from 'src/modules/movies/types';
import { useParams } from 'react-router-dom';
import { getMovieRequest } from 'src/modules/movies/actions';
import Poster from 'src/components/poster';

type Props = {};

function MoviePage() {
  const { id: movieId } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector((state: RootState) =>
    state.movies.data.results.find(
      (movie: Movie) => movie.id === Number(movieId)
    )
  );
  const { loading, error } = useSelector((state: RootState) => state.movies);

  console.log(movie);

  React.useEffect(() => {
    if (!movie) {
      dispatch(getMovieRequest(Number(movieId)));
    }
  }, [dispatch, movie, movieId]);

  if (loading) {
    return <span>'loading...'</span>;
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
          <button>add to fav</button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default MoviePage;
