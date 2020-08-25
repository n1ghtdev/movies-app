import React from 'react';
import Routes from './routes';
import Header from './components/header';
import { Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { reAuthRequest } from './modules/user/actions';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(reAuthRequest());
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
