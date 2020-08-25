export enum Types {
  SIGNUP_REQUEST = '@@signup/request',
  SIGNUP_SUCCESS = '@@signup/success',
  SIGNUP_FAILURE = '@@signup/failure',

  SIGNIN_REQUEST = '@@signin/request',
  SIGNIN_SUCCESS = '@@signin/success',
  SIGNIN_FAILURE = '@@signin/failure',

  LOGOUT = '@@logout',
}

export type State = {
  user: User;
  isAuthorized: boolean;
  loading: boolean;
  error: Error | null;
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
};
