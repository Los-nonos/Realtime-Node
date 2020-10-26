/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "../components/molecules/Navbars/Navbar.jsx";
import Footer from "../components/molecules/Footer/Footer.jsx";
import Sidebar from "../components/organisms/Sidebar/Sidebar.jsx";
import authStorageService from "../services/localStorage/authStorage";
import routes from "../utils/routes.js";

import dashboardStyle from "../styles/dashboard/layouts/dashboardStyle.jsx";

import logo from "../static/img/logos/favicon.png";
import { pages, redirectTo } from "../utils/helpers/redirectTo";
import Loader from "../components/organisms/Loader/Loader";
import { renewToken } from "../actions/LoginActions";
import { actionNames } from "../utils/constants/actionConstants";

let userInfo = {};

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "",
            color: "zeepOrange",
            hasImage: true,
            fixedClasses: "dropdown show",
            mobileOpen: false,
            userRoles: this.checkRoles()
        };
        this.dispatch = props.dispatch;
    }

    componentDidMount() {
        const { location, renewTokenDispatcher } = this.props;
        if (location.state) {
            if (location.state.previousPath !== "login") {
                renewTokenDispatcher();
            }
        } else {
            renewTokenDispatcher();
        }
    }

    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    resizeFunction = () => {
        if (window.innerWidth >= 960) {
            this.setState({ mobileOpen: false });
        }
    };

    checkRoles() {
        const roles = authStorageService.getRoles();
        if (!roles) {
            redirectTo(pages.error);
            return [];
        } else {
            return roles.split(",");
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeFunction);
    }

    render() {
        const { classes, ...rest } = this.props;
        return (
            <>
                <Loader />
                <div className={classes.wrapper}>
                    <Sidebar
                        routes={routes}
                        logo={logo}
                        handleDrawerToggle={this.handleDrawerToggle}
                        open={this.state.mobileOpen}
                        color={this.state.color}
                        userRoles={this.state.userRoles}
                        {...rest}
                    />
                    <div className={classes.mainPanel} ref="mainPanel">
                        <Header
                            routes={routes}
                            handleDrawerToggle={this.handleDrawerToggle}
                            color={"primary"}
                            {...rest}
                        />
                        <div className={classes.content}>
                            <div className={classes.container}>
                                <Switch>
                                    {routes.map((prop, key) => {
                                        if (prop.layout === "/dashboard") {
                                            return (
                                                <Route
                                                    path={prop.layout + prop.path}
                                                    component={props => {
                                                        const Component = prop.component;
                                                        return <Component {...props} {...userInfo} />;
                                                    }}
                                                    key={key}
                                                />
                                            );
                                        }
                                    })}
                                </Switch>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </>
        );
    }
}

Admin.propTypes = {
    classes: PropTypes.object.isRequired,
    userData: PropTypes.object
};

const mapDispatchToProps = dispatch => {
    return {
        renewTokenDispatcher: () => dispatch({ type: actionNames.renewToken })
    };
};

export default connect(
    null,
    mapDispatchToProps
)(withStyles(dashboardStyle)(Admin));
