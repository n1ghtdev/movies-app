import React from 'react';
import {
  Grid,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'src/modules/reducers';
import { Movie } from 'src/modules/movies/types';
import { getMoviesRequest } from 'src/modules/movies/actions';
import { deleteFavoriteRequest } from 'src/modules/favorites/actions';

import Poster from '../poster';

function FavoritesPage() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = React.useState(0);

  const { ids } = useSelector((state: RootState) => state.favorites);
  const { movies, loading, error } = useSelector((state: RootState) => ({
    movies: state.movies.data.results.filter((movie: Movie) => {
      return Array.isArray(ids) && ids.includes(movie.id);
    }),
    loading: state.movies.loading,
    error: state.movies.error,
  }));

  React.useEffect(() => {
    const hasMovies = ids.every(
      (id: number) => !!movies.find((movie: Movie) => movie.id === id)
    );

    if (ids.length > 0 && !hasMovies && !loading) {
      dispatch(getMoviesRequest(ids));
    }
  }, [dispatch, ids, movies, loading]);

  function prevPage() {
    setCurrentPage(currentPage - 1);
  }

  function nextPage() {
    setCurrentPage(currentPage + 1);
  }

  function deleteFavorite(id: number) {
    dispatch(deleteFavoriteRequest(id));
  }

  if (loading) {
    return <span>loading...</span>;
  }
  if (error) {
    return <span>{error.message}</span>;
  }

  const visibleMovies = movies.slice(currentPage * 10, (currentPage + 1) * 10);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Poster</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Release date</TableCell>
              <TableCell>Overview</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleMovies.map((movie: Movie) => (
              <TableRow>
                <TableCell>
                  <Poster path={movie.poster_path} alt={movie.title} />
                </TableCell>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.release_date}</TableCell>
                <TableCell>{movie.overview}</TableCell>
                <TableCell>
                  <Button onClick={() => deleteFavorite(movie.id)}>
                    DELETE
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
      <Grid item xs={12}>
        <Button disabled={currentPage === 0} onClick={() => prevPage()}>
          prev page
        </Button>
        {currentPage + 1}
        <Button
          disabled={(currentPage + 1) * 10 >= movies.length}
          onClick={() => nextPage()}
        >
          next page
        </Button>
      </Grid>
    </Grid>
  );
}

export default FavoritesPage;
