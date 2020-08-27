import React from 'react';
import styled from 'styled-components';
import {
  AppBar,
  Toolbar,
  InputLabel,
  Input,
  Button,
  Container,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { searchMovieRequest } from 'src/modules/movies/actions';
import useAuth from 'src/hooks/use-auth';
import { logoutAction } from 'src/modules/user/actions';
import ButtonLink from './button-link';

const schema = Yup.object({
  query: Yup.string().min(2).required('Enter a movie title'),
});

const initialValues = {
  query: '',
};

const StyledButton = styled(Button)`
  color: #fff;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  input,
  button {
    color: #fff;
  }
  button {
    font-weight: bold;
  }
`;

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, isAuthorized } = useAuth();

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values: any) => submitQuerySearch(values),
  });

  function submitQuerySearch(values: any) {
    dispatch(searchMovieRequest(values.query));
    history.push('/movies');
  }

  function handleLogout() {
    if (isAuthorized) {
      dispatch(logoutAction());
    }
  }

  const userName = isAuthorized ? user.firstName : 'Guest';

  return (
    <AppBar position="fixed">
      <Container>
        <Toolbar
          variant="dense"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Form style={{ display: 'flex' }} onSubmit={handleSubmit}>
            <InputLabel htmlFor="query">
              <Input
                color="primary"
                value={values.query}
                onChange={handleChange}
                id="query"
                placeholder="Inception"
                required={true}
              />
            </InputLabel>
            <Button type="submit">Search</Button>
          </Form>
          <div>Welcome, {userName}</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ButtonLink to="/movies">movies</ButtonLink>
            {isAuthorized ? (
              <>
                <ButtonLink to="/profile">Profile</ButtonLink>
                <ButtonLink to="/favorites">Favorites</ButtonLink>
                <StyledButton onClick={() => handleLogout()}>
                  Logout
                </StyledButton>
              </>
            ) : (
              <ButtonLink to="/login">login</ButtonLink>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
