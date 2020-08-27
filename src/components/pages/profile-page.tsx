import React from 'react';
import styled from 'styled-components';
import {
  Grid,
  Paper,
  InputLabel,
  Input,
  FormHelperText,
  NativeSelect,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import useAuth from 'src/hooks/use-auth';
import { signUpSchema } from 'src/utils/schemas';
import { RootState } from 'src/modules/reducers';
import { updateProfile } from 'src/modules/user/actions';

const genders = ['Female', 'Male'];

const Form = styled.form`
  width: 100%;
  margin: 0 auto;
  .MuiInputBase-root {
    display: block;
    margin-bottom: 20px;
  }
`;

const StyledButton = styled(Button)`
  margin: auto;
  display: block;
`;

function ProfilePage() {
  const { user } = useAuth();
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const dispatch = useDispatch();
  const { loading: authLoading, error: authError } = useSelector(
    (state: RootState) => state.user
  );

  const initialValues = { ...user, passwordConfirm: user.password };
  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    dirty,
  } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: submitForm,
  });

  function submitForm(values: any) {
    dispatch(
      updateProfile({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        gender: values.gender,
        password: values.password,
      })
    );
    setIsSubmitted(true);
  }

  return (
    <Paper style={{ padding: '15px' }}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <h2>Profile settings</h2>
          <Form onSubmit={handleSubmit}>
            <div>
              <InputLabel htmlFor="firstName">First name</InputLabel>
              <Input
                id="firstName"
                value={values.firstName}
                onChange={handleChange}
              />
              <FormHelperText error={true}>
                {touched.firstName && errors.firstName}
              </FormHelperText>
            </div>
            <div>
              <InputLabel htmlFor="lastName">Last name</InputLabel>
              <Input
                id="lastName"
                value={values.lastName}
                onChange={handleChange}
              />
              <FormHelperText error={true}>
                {touched.lastName && errors.lastName}
              </FormHelperText>
            </div>
            <div>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input id="email" value={values.email} onChange={handleChange} />
              <FormHelperText error={true}>
                {touched.email && errors.email}
              </FormHelperText>
            </div>
            <div>
              <InputLabel htmlFor="gender">Gender</InputLabel>
              <NativeSelect
                value={values.gender}
                onChange={handleChange}
                id="gender"
                inputProps={{ 'aria-label': 'gender' }}
              >
                <option value="none">None</option>
                {genders.map((gender: string) => (
                  <option value={gender}>{gender}</option>
                ))}
              </NativeSelect>
            </div>
            <div>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                type="password"
                id="password"
                value={values.password}
                onChange={handleChange}
              />
              <FormHelperText error={true}>
                {touched.password && errors.password}
              </FormHelperText>
            </div>
            <div>
              <InputLabel htmlFor="passwordConfirm">
                Confirm password
              </InputLabel>
              <Input
                type="password"
                id="passwordConfirm"
                value={values.passwordConfirm}
                onChange={handleChange}
              />
              <FormHelperText error={true}>
                {touched.passwordConfirm && errors.passwordConfirm}
              </FormHelperText>
            </div>
            <div>
              <StyledButton
                disabled={!dirty}
                type="submit"
                color="primary"
                variant="contained"
              >
                Save
              </StyledButton>
              {authLoading ? <CircularProgress /> : null}
            </div>
            <FormHelperText style={{ marginTop: '20px' }} error={true}>
              {isSubmitted ? authError?.message || '' : null}
            </FormHelperText>
          </Form>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ProfilePage;
