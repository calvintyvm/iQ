import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import HomePage from "../ui/containers/HomePage";

const privateHome = (props, { component: Component, ...rest }) => {
  const currentUser = props.user;
  const currentUserId = props.userId;
  return (
    <Route
      {...rest}
      render={props =>
        currentUser && currentUserId ? (
          <HomePage {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
