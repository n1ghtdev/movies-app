import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
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
import { signInSchema } from 'src/utils/schemas';

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

const StyledButton = styled(Button)`
  margin: 0 auto;
  display: block;
`;

function SignInForm() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const dispatch = useDispatch();
  const { loading: authLoading, error: authError } = useSelector(
    (state: RootState) => state.user
  );

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues,
    validationSchema: signInSchema,
    onSubmit: submitForm,
  });

  function submitForm(values: any) {
    dispatch(
      signInRequest({
        email: values.email,
        password: values.password,
      })
    );
    setIsSubmitted(true);
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
        <StyledButton type="submit" color="primary" variant="contained">
          Sign Up
        </StyledButton>
        {authLoading ? <CircularProgress /> : null}
      </div>
      <FormHelperText style={{ marginTop: '20px' }} error={true}>
        {isSubmitted ? authError?.message || '' : null}
      </FormHelperText>
    </Form>
  );
}

export default SignInForm;
