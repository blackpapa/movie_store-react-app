import React from "react";
import { Route, Redirect } from "react-router";
import { getCurrentUser } from "./../../services/authService";

const ProtectedRoute = ({ path, component: Component, render }) => {
  return (
    <Route
      path={path}
      render={(props) => {
        if (!getCurrentUser())
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    ></Route>
  );
};

export default ProtectedRoute;
