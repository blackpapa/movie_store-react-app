import React from "react";
import { Route, Redirect } from "react-router";
import { getCurrentUser } from "./../../services/authService";

const ProtectedRoute = ({ path, component: Component }) => {
  return (
    <Route
      path={path}
      render={(props) => {
        if (!getCurrentUser()) return <Redirect to="/login" />;
        return <Component {...props} />;
      }}
    ></Route>
  );
};

export default ProtectedRoute;
