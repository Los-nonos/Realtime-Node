import React from "react";
import { Route, Redirect } from "react-router-dom";
// eslint-disable-next-line import/no-cycle
import authStorage from "../../services/localStorage/authStorage";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            authStorage.getSession() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/auth/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default PrivateRoute;
