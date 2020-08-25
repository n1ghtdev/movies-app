import React from 'react';
import {
  Grid,
  Container,
  InputLabel,
  Input,
  Button,
  FormHelperText,
} from '@material-ui/core';
import MovieCard from '../movie-card';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/modules/reducers';
import { Movie } from 'src/modules/movies/types';
import { searchMovieRequest } from 'src/modules/movies/actions';
import { useFormik } from 'formik';
import * as Yup from 'yup';

type Props = {};

const schema = Yup.object({
  query: Yup.string().min(2).required('Enter a movie title'),
});

const initialValues = {
  query: '',
};

function MoviesPage() {
  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values: any) => submitQuerySearch(values),
  });
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  React.useEffect(() => {
    dispatch(searchMovieRequest('inception'));
  }, [dispatch]);

  function submitQuerySearch(values: any) {
    dispatch(searchMovieRequest(values.query));
  }

  if (loading) {
    return <span>'loading...'</span>;
  }
  if (error) {
    return <span>{error.message}</span>;
  }

  return (
    <Container>
      <Grid container>
        <Grid item>
          <form onSubmit={handleSubmit}>
            <InputLabel htmlFor="query">
              <Input
                value={values.query}
                onChange={handleChange}
                id="query"
                placeholder="Inception"
              />
            </InputLabel>
            <FormHelperText>{errors ? errors.query : null}</FormHelperText>
            <Button type="submit">Search</Button>
          </form>
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        {data.results.map((movie: Movie) => (
          <Grid item key={movie.id} md={4}>
            <MovieCard
              id={movie.id}
              title={movie.title}
              poster={movie.poster_path}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default MoviesPage;
