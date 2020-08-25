import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

import { RootState } from '../reducers';
import { Types, User } from './types';
import { signUp, signIn, reAuth, logout } from 'src/api/auth-mock';

export function signUpRequest(
  user: any
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async (dispatch) => {
    dispatch({ type: Types.SIGNUP_REQUEST });

    signUp<User>(user).then(
      (user: User) => {
        dispatch(signUpSuccess(user));
      },
      (error: Error) => {
        dispatch(signUpFailure(error));
      }
    );
  };
}

export function signUpSuccess(user: User) {
  return {
    type: Types.SIGNUP_SUCCESS,
    payload: {
      user,
    },
  };
}

export function signUpFailure(error: Error) {
  return {
    type: Types.SIGNUP_FAILURE,
    payload: {
      error,
    },
  };
}

export function signInRequest({
  email,
  password,
}: {
  email: string;
  password: string;
}): ThunkAction<void, RootState, unknown, Action<string>> {
  return async (dispatch) => {
    dispatch({ type: Types.SIGNIN_REQUEST });

    signIn<User>({ email, password }).then(
      (user: User) => {
        dispatch(signInSuccess(user));
      },
      (error: Error) => {
        dispatch(signInFailure(error));
      }
    );
  };
}

export function reAuthRequest(): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> {
  return async (dispatch) => {
    dispatch({ type: Types.SIGNIN_REQUEST });

    reAuth().then(
      (user: any) => {
        dispatch(signInSuccess(user as User));
      },
      (error: Error) => {
        dispatch(signInFailure(error));
      }
    );
  };
}

export function signInSuccess(user: User) {
  return {
    type: Types.SIGNIN_SUCCESS,
    payload: {
      user,
    },
  };
}

export function signInFailure(error: Error) {
  return {
    type: Types.SIGNIN_FAILURE,
    payload: {
      error,
    },
  };
}

export function logoutAction(): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> {
  return async (dispatch) => {
    logout().then(
      () => {
        dispatch(logoutSuccess());
      },
      (error: Error) => {
        console.error(error);
      }
    );
  };
}

export function logoutSuccess() {
  return {
    type: Types.LOGOUT,
  };
}
