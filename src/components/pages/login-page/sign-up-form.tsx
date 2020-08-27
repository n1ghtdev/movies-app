import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import {
  InputLabel,
  Input,
  NativeSelect,
  Button,
  FormHelperText,
  CircularProgress,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { signUpRequest } from 'src/modules/user/actions';
import { RootState } from 'src/modules/reducers';
import { signUpSchema } from 'src/utils/schemas';

const genders = ['Female', 'Male'];

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  gender: '',
  password: '',
  passwordConfirm: '',
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

function SignUpForm() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const dispatch = useDispatch();
  const { loading: authLoading, error: authError } = useSelector(
    (state: RootState) => state.user
  );

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: submitForm,
  });

  function submitForm(values: any) {
    dispatch(
      signUpRequest({
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
    <Form onSubmit={handleSubmit}>
      <FormTitle>Sign Up</FormTitle>
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
        <Input id="lastName" value={values.lastName} onChange={handleChange} />
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
        <InputLabel htmlFor="passwordConfirm">Confirm password</InputLabel>
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

export default SignUpForm;
