import React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import GridContainer from "../../atoms/Grid/GridContainer";
import GridItem from "../../atoms/Grid/GridItem";
import CustomInput from "../../atoms/CustomInput/CustomInput";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import LoadingButton from "../../atoms/CustomButtons/LoadingButton";
import { withStyles } from "@material-ui/core";
import styles from "../../../styles/dashboard/components/molecules/productsTableStyles";

class FormEmployee extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAvailable: false,
      firstLoad: true
    };
    this.dispatch = props.dispatch;
  }

  toggleModal = async () => {
    await this.dispatch(this.props.closeModal());
  };

  createEmployee = e => {
    e.preventDefault();

    const fields = ["name", "surname", "username", "password", "email"];

    const formElements = e.target.elements;

    const dataEmployee = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    dataEmployee["role"] = [formElements.namedItem("role").value];

    if (this.props.modalShow.createModal) {
      this.dispatch(this.props.createEmployee(dataEmployee));
    } else {
      dataEmployee.id = this.props.formData.id;
      this.dispatch(this.props.updateEmployee(dataEmployee));
    }
  };

  handleSelectorChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  updateValues() {
    this.setState({
      firstLoad: false,
      selectedImage: null
    });
  }

  render() {
    const { classes, Transition } = this.props;

    if (this.props.modalShow.updateModal && this.state.firstLoad) {
      this.updateValues();
    }

    return (
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal
        }}
        open={
          this.props.modalShow.createModal || this.props.modalShow.updateModal
        }
        className={{
          backgroundColor: "#090809"
        }}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          {this.props.formData.name ? (
            <h4 className={classes.modalTitle}>{this.props.formData.name}</h4>
          ) : (
            <h4 className={classes.modalTitle}>{"Nuevo Empleado"}</h4>
          )}
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <form onSubmit={this.createEmployee}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="Nombre"
                  id="name"
                  required
                  error={this.props.formErrors.name !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    required: true,
                    name: "name",
                    defaultValue: this.props.formData.name
                  }}
                />
                <CustomInput
                  labelText="Apellido"
                  id="surname"
                  required
                  error={this.props.formErrors.surname !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    required: true,
                    name: "surname",
                    defaultValue: this.props.formData.surname
                  }}
                />
                <CustomInput
                  labelText="Email"
                  id="email"
                  required
                  error={this.props.formErrors.email !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    required: true,
                    name: "email",
                    type: "email",
                    defaultValue: this.props.formData.email
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText={"Username"}
                  id={"username"}
                  required
                  error={this.props.formErrors.username !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    required: true,
                    name: "username",
                    type: "text",
                    defaultValue: this.props.formData.username
                  }}
                />
                <CustomInput
                  labelText={"Password"}
                  id={"password"}
                  required
                  error={this.props.formErrors.password !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    required: true,
                    name: "password",
                    type: "password",
                    defaultValue: this.props.formData.password
                  }}
                />
                <FormControl
                  fullWidth={true}
                  className={{
                    color: "#fff"
                  }}
                >
                  <InputLabel htmlFor="role" className={classes.selectLabel}>
                    Roles
                  </InputLabel>
                  <Select
                    MenuProps={{
                      className: classes.selectMenu
                    }}
                    classes={{
                      select: classes.select
                    }}
                    required={true}
                    //multiple={true}
                    error={this.props.formErrors.rol !== undefined}
                    value={this.state.category}
                    onChange={this.handleSelectorChange}
                    inputProps={{
                      name: "role",
                      id: "role",
                      defaultValue: this.props.formData.rol
                    }}
                  >
                    <MenuItem
                      disabled
                      classes={{
                        root: classes.selectMenuItem
                      }}
                    >
                      Roles
                    </MenuItem>
                    {this.props.roles.map((role, key) => {
                      return (
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          className={{
                            color: "#fff"
                          }}
                          key={key}
                          value={role}
                        >
                          {role}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </GridItem>
            </GridContainer>
            <div className={classes.customSubmitButton}>
              <Button
                type="submit"
                color="primary"
                loading={this.props.loading}
              >
                Ok
              </Button>
              <Button color="secondary" onClick={this.toggleModal}>
                Close
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return state.employeeReducer;
};

export default connect(mapStateToProps)(withStyles(styles)(FormEmployee));
