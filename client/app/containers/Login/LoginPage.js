import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import GridContainer from "../../components/atoms/Grid/GridContainer.jsx";
import GridItem from "../../components/atoms/Grid/GridItem.jsx";
import CustomInput from "../../components/atoms/CustomInput/CustomInput.jsx";
import LoadingButton from "../../components/atoms/CustomButtons/LoadingButton";
import Card from "../../components/molecules/Card/Card.jsx";
import CardBody from "../../components/molecules/Card/CardBody.jsx";
import CardHeader from "../../components/molecules/Card/CardHeader.jsx";
import CardFooter from "../../components/molecules/Card/CardFooter.jsx";

import loginPageStyle from "../../styles/dashboard/containers/loginPageStyles";
import * as actions from "../../actions/LoginActions";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            errors: {}
        };
        this.dispatch = props.dispatch;
    }

    login = e => {
        e.preventDefault();

        const username = e.target.elements.username.value;
        const password = e.target.elements.password.value;
        this.dispatch(actions.login(username, password));
    };

    renderError() {
        const { classes } = this.props;
        return (
            <div className={classes.error}>
                <p>Incorrect credentials! Try again</p>
            </div>
        );
    }

    render() {
        const { classes } = this.props;
        this.dispatch(actions.deleteSession());
        return (
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={8}>
                        <h4 className={classes.textCenter} style={{ marginTop: 0 }}>
                            Zeep Dashboard
                        </h4>
                    </GridItem>
                </GridContainer>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={6} md={3}>
                        <form onSubmit={this.login}>
                            <Card>
                                <CardHeader
                                    className={`${classes.cardHeader} ${classes.textCenter}`}
                                    color={"primary"}
                                >
                                    <h4 className={classes.cardTitle}>Log in</h4>
                                </CardHeader>
                                <CardBody>
                                    {this.props.error.code ? this.renderError() : <></>}
                                    <CustomInput
                                        labelText="Username..."
                                        id="username"
                                        formControlProps={{
                                            fullWidth: true,
                                            className: classes.formControlClassName
                                        }}
                                        inputProps={{
                                            required: true,
                                            name: "username",
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Email className={classes.inputAdornmentIcon} />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Password"
                                        id="password"
                                        formControlProps={{
                                            fullWidth: true,
                                            className: classes.formControlClassName
                                        }}
                                        inputProps={{
                                            type: "password",
                                            required: true,
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Icon className={classes.inputAdornmentIcon}>
                                                        lock_outline
                                                    </Icon>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </CardBody>
                                <CardFooter className={classes.justifyContentCenter}>
                                    <LoadingButton type="submit" color={"primary"}>
                                        Let's Go
                                    </LoadingButton>
                                </CardFooter>
                            </Card>
                        </form>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
    error: PropTypes.object,
    dispatch: PropTypes.func,
    token: PropTypes.string
};

const mapStateToProps = state => {
    return state.login;
};

export default connect(mapStateToProps)(withStyles(loginPageStyle)(LoginPage));
