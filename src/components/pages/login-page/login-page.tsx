import React from 'react';
import { Paper, Grid } from '@material-ui/core';
import SignUpForm from './sign-up-form';
import SignInForm from './sign-in-form';
import { useSelector } from 'react-redux';
import { RootState } from 'src/modules/reducers';
import { useHistory } from 'react-router-dom';

type Props = {};

function LoginPage(props: Props) {
  const history = useHistory();
  const isAuthorized = useSelector(
    (state: RootState) => state.user.isAuthorized
  );

  React.useEffect(() => {
    if (isAuthorized) {
      history.push('/movies');
    }
  }, [history, isAuthorized]);

  return (
    <Grid container spacing={5}>
      <Grid item sm={12} md={6}>
        <Paper>
          <SignUpForm />
        </Paper>
      </Grid>
      <Grid item sm={12} md={6}>
        <Paper>
          <SignInForm />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
