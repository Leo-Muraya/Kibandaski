import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = JSON.parse(localStorage.getItem("user")); // Get user from localStorage

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" /> // Redirect to login if not logged in
        )
      }
    />
  );
};

<<<<<<< HEAD
export default PrivateRoute;
=======
export default PrivateRoute;
>>>>>>> 67661aeac307493fff0d92957db9ff58fee7f17c
