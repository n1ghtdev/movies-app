import * as Yup from 'yup';

export const signInSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter a valid email'),
  password: Yup.string().min(4).required('Please enter your password'),
});

export const signUpSchema = Yup.object({
  firstName: Yup.string().min(4).required('Please enter your first name'),
  lastName: Yup.string().min(4).required('Please enter your last name'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter a valid email'),
  gender: Yup.string().required(''),
  password: Yup.string().min(4).required('Please enter your password'),
  passwordConfirm: Yup.string().when('password', {
    is: (val: string) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref('password')],
      'Both passwords need to be the same'
    ),
  }),
});
