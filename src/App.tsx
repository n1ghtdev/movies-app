import React from 'react';
import Routes from './routes';
import Header from './components/header';
import { Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { reAuthRequest } from './modules/user/actions';
import { getFavoritesRequest } from './modules/favorites/actions';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(reAuthRequest());
    dispatch(getFavoritesRequest());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container style={{ marginTop: '100px' }}>
        <Routes />
      </Container>
    </>
  );
}

export default App;
