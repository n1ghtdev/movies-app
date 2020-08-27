import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'src/modules/reducers';
import { Movie } from 'src/modules/movies/types';
import {
  searchMovieRequest,
  fetchMoreRequest,
} from 'src/modules/movies/actions';

import MovieCard from '../movie-card';
import MoviesLoading from '../movies-loading';

function MoviesPage() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = React.useState(0);
  const { data, loading, error, query } = useSelector(
    (state: RootState) => state.movies
  );

  React.useEffect(() => {
    dispatch(searchMovieRequest(''));
  }, [dispatch]);

  React.useEffect(() => {
    if (
      data.total_results > currentPage * 15 &&
      data.results.length < currentPage * 21
    ) {
      dispatch(fetchMoreRequest(query, data.page + 1));
    }
  }, [
    dispatch,
    currentPage,
    data.results,
    data.page,
    data.total_results,
    query,
  ]);

  function prevPage() {
    setCurrentPage(currentPage - 1);
  }

  function nextPage() {
    setCurrentPage(currentPage + 1);
  }

  if (loading) {
    return <MoviesLoading />;
  }
  if (error) {
    return <span>{error.message}</span>;
  }

  const movies = data.results.slice(15 * currentPage, 15 * (currentPage + 1));

  return (
    <Grid container spacing={5}>
      {movies.map((movie: Movie) => (
        <Grid item key={movie.id} xs={12} sm={6} md={4}>
          <MovieCard
            id={movie.id}
            title={movie.title}
            poster={movie.poster_path}
          />
        </Grid>
      ))}
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ margin: '20px 0 40px 0' }}
      >
        <Button disabled={currentPage === 0} onClick={() => prevPage()}>
          prev page
        </Button>
        <span style={{ padding: '0 20px' }}>{currentPage + 1}</span>
        <Button
          disabled={(currentPage + 1) * 15 >= data.total_results}
          onClick={() => nextPage()}
        >
          next page
        </Button>
      </Grid>
    </Grid>
  );
}

export default MoviesPage;
