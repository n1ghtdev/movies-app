import React from 'react';
import { Paper, FormControl, InputLabel, Input } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';

type Props = {};

const schema = Yup.object({
  login: Yup.string().min(4).required('Login cannot be empty'),
  password: Yup.string().min(4).required('Please enter your password'),
  passwordConfirm: Yup.string()
    .min(4)
    .required('Please enter your password once again'),
});

function SignUpPage(props: Props) {
  return <Paper></Paper>;
}

export default SignUpPage;
