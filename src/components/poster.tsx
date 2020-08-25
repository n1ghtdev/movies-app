import React from 'react';
import styled from 'styled-components';

type Props = {
  path: string | null;
  alt: string;
};

const Wrapper = styled.img`
  max-width: 100%;
  width: auto;
  height: auto;
  display: block;
`;

function Poster({ path, alt }: Props) {
  const [posterUrl, setPosterUrl] = React.useState(
    'https://via.placeholder.com/500'
  );
  React.useEffect(() => {
    // TODO:
    (async () => {
      if (path !== null) {
        const response = await fetch(`https://image.tmdb.org/t/p/w500/${path}`);

        if (response.ok && response.url) {
          setPosterUrl(response.url);
        }
      }
    })();
  }, [path]);
  return <Wrapper src={posterUrl} alt={alt} />;
}

export default Poster;
