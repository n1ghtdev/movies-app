import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  InputLabel,
  Input,
  FormHelperText,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/modules/reducers';
import { signInRequest } from 'src/modules/user/actions';

const schema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter a valid email'),
  password: Yup.string().min(4).required('Please enter your password'),
});

const initialValues = {
  email: '',
  password: '',
};

const Form = styled.form`
  padding: 15px;
  .MuiInputBase-root {
    display: block;
    margin-bottom: 20px;
  }
`;
const FormTitle = styled.h2`
  margin: 0 0 20px 0;
`;

function SignInForm() {
  const dispatch = useDispatch();
  const { loading: authLoading, error: authError } = useSelector(
    (state: RootState) => state.user
  );

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: submitForm,
  });

  function submitForm(values: any) {
    dispatch(
      signInRequest({
        email: values.email,
        password: values.password,
      })
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormTitle>Sign In</FormTitle>
      <div>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input id="email" value={values.email} onChange={handleChange} />
        <FormHelperText error={true}>
          {touched.email && errors.email}
        </FormHelperText>
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
        <Button type="submit">Sign Up</Button>
        {authLoading ? <CircularProgress /> : null}
      </div>
      <FormHelperText style={{ marginTop: '20px' }} error={true}>
        {authError?.message || ''}
      </FormHelperText>
    </Form>
  );
}

export default SignInForm;
