import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Footer from "../components/molecules/Footer/AuthFooter.jsx";

// eslint-disable-next-line import/no-cycle
import routes from "../utils/routes.js";

import pagesStyle from "../styles/dashboard/layouts/authStyle.jsx";

import backgroundImage from "../static/img/bg2.jpg";
import LoadingOverlay from "react-loading-overlay";

const switchRoutes = (
    <Switch>
        {routes.map((prop, key) => {
            if (prop.layout === "/auth") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={props => {
                            const Component = prop.component;
                            return <Component {...props} />;
                        }}
                        key={key}
                    />
                );
            }
            return null;
        })}
    </Switch>
);

class Pages extends React.Component {
    componentDidMount() {
        document.body.style.overflow = "unset";
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <LoadingOverlay
                    spinner
                    active={this.props.loading}
                    text="Loading..."
                    styles={{
                        wrapper: base => ({
                            ...base,
                            position: "inherit",
                            zIndex: 1050
                        })
                    }}
                />
                <div className={classes.wrapper}>
                    <div
                        className={classes.fullPage}
                        style={{ backgroundImage: "url(" + backgroundImage + ")" }}
                    >
                        {switchRoutes}
                        <Footer white />
                    </div>
                </div>
            </div>
        );
    }
}

Pages.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return state.generalReducer;
};

export default connect(mapStateToProps)(withStyles(pagesStyle)(Pages));
