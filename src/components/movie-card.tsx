import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

type Props = {
  id: number;
  title: string;
  poster: string | null;
};

const Wrapper = styled(Link)``;
const Poster = styled.img`
  max-width: 100%;
  width: auto;
  height: auto;
  display: block;
`;
const Title = styled.h3``;

function MovieCard({ id, title, poster }: Props) {
  const [posterUrl, setPosterUrl] = React.useState(
    'https://via.placeholder.com/500'
  );
  React.useEffect(() => {
    // TODO:
    (async () => {
      if (poster !== null) {
        const response = await fetch(
          `https://image.tmdb.org/t/p/w500/${poster}`
        );

        if (response.ok && response.url) {
          setPosterUrl(response.url);
        }
      }
    })();
  }, [poster]);
  return (
    <Wrapper to={`/movies/${id}`}>
      <Poster src={posterUrl} alt={title} />
      <Title>{title}</Title>
    </Wrapper>
  );
}

export default MovieCard;
