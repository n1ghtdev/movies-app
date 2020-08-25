import React from 'react';
import Routes from './routes';
import Header from './components/header';
import { Container } from '@material-ui/core';

function App() {
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
