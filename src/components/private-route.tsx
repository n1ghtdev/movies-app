import React from 'react';
import {
  Route,
  Redirect,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom';

import useAuth from 'src/hooks/use-auth';

type Props = {
  component: React.ComponentType<RouteComponentProps>;
} & RouteProps;

export default function PrivateRoute(props: Props) {
  const { isAuthorized } = useAuth();

  const { component: Component, ...rest } = props;

  if (!isAuthorized) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={(componentProps) =>
        isAuthorized ? (
          <Component {...componentProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}
