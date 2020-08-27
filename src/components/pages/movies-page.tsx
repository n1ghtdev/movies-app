import React from 'react';
import { Grid, Button } from '@material-ui/core';
import MovieCard from '../movie-card';
import MoviesLoading from '../movies-loading';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/modules/reducers';
import { Movie } from 'src/modules/movies/types';
import {
  searchMovieRequest,
  fetchMoreRequest,
} from 'src/modules/movies/actions';

type Props = {};

function MoviesPage() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = React.useState(0);
  const { data, loading, error, query } = useSelector(
    (state: RootState) => state.movies
  );

  React.useEffect(() => {
    console.log('only once');

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
      <Grid item xs={12}>
        <Button disabled={currentPage === 0} onClick={() => prevPage()}>
          prev page
        </Button>
        {currentPage + 1}
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
