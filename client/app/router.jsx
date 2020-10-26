import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import authStorage from "./services/localStorage/authStorage";

// core components
import Auth from "./layouts/Auth.jsx";

import "./static/styles/zeepDashboardStyles.css?v=1.6.0";
import Admin from "./layouts/Admin";
import PrivateRoute from "./utils/customRoutes/PrivateRoute";
import LoginPage from "./containers/Login/LoginPage";

const App = () => {
    return (
        <Switch>
            <PrivateRoute path={"/dashboard"} component={Admin} />
            {/*<Route path="/auth" component={Auth}/>*/}
            <Route path={"/auth/login"} component={LoginPage} />
            {authStorage.getSession() ? (
                <Redirect from="/" to="/dashboard" />
            ) : (
                <Redirect from="/" to="/auth/login" />
            )}
        </Switch>
    );
};

export default App;
