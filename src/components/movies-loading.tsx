import React from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

type Props = {};

const MovieCardPlaceholder = styled.div``;

const Poster = styled.div`
  max-width: 400px;
  max-height: 640px;
  width: 100%;
  height: 100%;
  background-color: grey;
`;

function MoviesLoading() {
  const placeholder = Array(15);

  return (
    <Grid container spacing={5}>
      {placeholder.map((_: any, idx: number) => (
        <Grid item key={idx} xs={12} sm={6} md={4}>
          <MovieCardPlaceholder>
            <Poster />
          </MovieCardPlaceholder>
        </Grid>
      ))}
    </Grid>
  );
}

export default MoviesLoading;
