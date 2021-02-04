import * as React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { firebaseStore } from '../stores';

export function PrivateRoute(props: RouteProps): JSX.Element {
  const isLoggedIn = firebaseStore.isLoggedIn;

  if (!isLoggedIn) return <Redirect to="/" />;

  return <Route {...props}>{props.children}</Route>;
}
