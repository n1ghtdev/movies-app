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
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { searchMovieRequest } from 'src/modules/movies/actions';
import useAuth from 'src/hooks/use-auth';
import { logoutAction } from 'src/modules/user/actions';

const schema = Yup.object({
  query: Yup.string().min(2).required('Enter a movie title'),
});

const initialValues = {
  query: '',
};

const StyledLink = styled(Link)`
  color: #fff;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: bold;
  margin-left: 20px;
`;

const StyledButton = styled(Button)`
  color: #fff;
  font-weight: bold;
  margin-left: 20px;
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

  return (
    <AppBar position="fixed">
      <Container>
        <Toolbar
          variant="dense"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <form style={{ display: 'flex' }} onSubmit={handleSubmit}>
            <InputLabel htmlFor="query">
              <Input
                value={values.query}
                onChange={handleChange}
                id="query"
                placeholder="Inception"
              />
            </InputLabel>
            <Button type="submit">Search</Button>
          </form>
          <span>Welcome, {isAuthorized ? user.firstName : 'Guest'}</span>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {isAuthorized ? (
              <>
                <StyledLink to="/profile">Profile</StyledLink>
                <StyledButton onClick={() => handleLogout()}>
                  Logout
                </StyledButton>
              </>
            ) : (
              <StyledLink to="/login">login</StyledLink>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
