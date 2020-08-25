import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Poster from './poster';

type Props = {
  id: number;
  title: string;
  poster: string | null;
};

const Wrapper = styled(Link)``;

const Title = styled.h3``;

function MovieCard({ id, title, poster }: Props) {
  return (
    <Wrapper to={`/movies/${id}`}>
      <Poster path={poster} alt={title} />
      <Title>{title}</Title>
    </Wrapper>
  );
}

export default MovieCard;
