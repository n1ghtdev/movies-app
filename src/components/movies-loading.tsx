import React from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

type Props = {};

const MovieCardPlaceholder = styled.div``;

const Poster = styled.img`
  max-width: 100%;
  width: auto;
  height: auto;
  display: block;
`;

function MoviesLoading() {
  const placeholder = Array(15);

  return (
    <Grid container spacing={5}>
      {placeholder.map((_: any, idx: number) => (
        <Grid item key={idx} xs={12} sm={6} md={4}>
          <MovieCardPlaceholder>
            <Poster
              src={'http://via.placeholder.com/400x640'}
              alt="Placeholder"
            />
          </MovieCardPlaceholder>
        </Grid>
      ))}
    </Grid>
  );
}

export default MoviesLoading;
