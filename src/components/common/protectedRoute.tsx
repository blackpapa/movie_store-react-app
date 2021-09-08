import React from "react";
import { Route, Redirect } from "react-router";
import { getCurrentUser } from "../../services/authService";

type Props = {
  path: string,
  component: any,
}

const ProtectedRoute: React.FC<Props> = ({ path, component: Component }) => {
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
        return Component ? <Component {...props} /> : null;
      }}
    ></Route>
  );
};

export default ProtectedRoute;
