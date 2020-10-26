import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import GridContainer from "../../atoms/Grid/GridContainer";
import GridItem from "../../atoms/Grid/GridItem";
import CustomInput from "../../atoms/CustomInput/CustomInput";
import Button from "@material-ui/core/Button";
import styles from "../../../styles/dashboard/components/organisms/formProductStyles";

class FormCustomers extends React.Component {
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

  createCustomer = e => {
    e.preventDefault();

    const fields = [
      "name",
      "apellido",
      "maritalStatus",
      "birthday",
      "cuil",
      "dni",
      "street",
      "addressNumber",
      "city",
      "state",
      "postalCode",
      "email",
      "phoneNumber",
      "country",
      "vatCondition",
      "taxationKey",
      "grossIncome"
    ];

    const formElements = e.target.elements;

    const dataCustomer = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    if (this.props.modalShow.createModal) {
      this.dispatch(this.props.createCustomer(dataCustomer));
    } else {
      dataCustomer.id = this.props.formData.id;
      this.dispatch(this.props.updateCustomer(dataCustomer));
    }
  };

  handleSelectorChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  updateValues() {
    this.setState({
      firstLoad: false
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
        onClose={this.toggleModal}
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
            <h4 className={classes.modalTitle}>{"Nuevo Cliente"}</h4>
          )}
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <form onSubmit={this.createCustomer}>
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
                    onChange: this.handleChange,
                    required: true,
                    defaultValue: this.props.formData.name,
                    name: "name"
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
                    onChange: this.handleChange,
                    required: true,
                    defaultValue: this.props.formData.surname,
                    name: "surname"
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="Estado Civil"
                  id="maritalStatus"
                  required={true}
                  error={this.props.formErrors.maritalStatus !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: this.handleChange,
                    required: true,
                    defaultValue: this.props.formData.maritalStatus,
                    name: "maritalStatus"
                  }}
                />
                <CustomInput
                  labelText=""
                  id="birthday"
                  required={true}
                  error={this.props.formErrors.birthday !== undefined}
                  formControlProps={{
                    fullWidth: false
                  }}
                  inputProps={{
                    onChange: this.handleChange,
                    type: "date",
                    required: true,
                    defaultValue: this.props.formData.birthday,
                    name: "birthday"
                  }}
                />
                <span className={classes.customLabelDate}>Cumpleaños</span>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="CUIL"
                  id="cuil"
                  required={true}
                  error={this.props.formErrors.cuil !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: this.handleChange,
                    required: true,
                    defaultValue: this.props.formData.cuil,
                    name: "cuil"
                  }}
                />
                <CustomInput
                  labelText="D.N.I"
                  id="dni"
                  required
                  error={this.props.formErrors.dni !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: this.handleChange,
                    required: true,
                    defaultValue: this.props.formData.country,
                    name: "dni"
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                  labelText="Calle"
                  id="street"
                  error={this.props.formErrors.street !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: this.handleChange,
                    required: false,
                    defaultValue: this.props.formData.street,
                    name: "street"
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={1}>
                <CustomInput
                  labelText="Número"
                  id="addressNumber"
                  error={this.props.formErrors.addressNumber !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: this.handleChange,
                    required: false,
                    defaultValue: this.props.formData.addressNumber,
                    name: "addressNumber"
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                  labelText="Ciudad"
                  id="city"
                  error={this.props.formErrors.city !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: this.handleChange,
                    defaultValue: this.props.formData.city,
                    name: "city"
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                  labelText="Provincia"
                  id="state"
                  error={this.props.formErrors.state !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: this.handleChange,
                    defaultValue: this.props.formData.state,
                    name: "state"
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={2}>
                <CustomInput
                  labelText="Código postal"
                  id="postalCode"
                  error={this.props.formErrors.postalCode !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: this.handleChange,
                    defaultValue: this.props.formData.postalCode,
                    name: "postalCode"
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                  labelText="E-Mail"
                  id="email"
                  error={this.props.formErrors.email !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: this.handleChange,
                    required: false,
                    defaultValue: this.props.formData.email,
                    name: "email"
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                  labelText="Número de telefono"
                  id="phoneNumber"
                  error={this.props.formErrors.phoneNumber !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: this.handleChange,
                    required: false,
                    defaultValue: this.props.formData.phoneNumber,
                    name: "phoneNumber"
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="País"
                  id="country"
                  required
                  error={this.props.formErrors.country !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: this.handleChange,
                    required: true,
                    defaultValue: this.props.formData.country,
                    name: "country"
                  }}
                />
              </GridItem>
              <GridItem md={4}>
                <CustomInput
                  labelText="Condición de IVA"
                  id="vatCondition"
                  required
                  error={this.props.formErrors.vatCondition !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: this.handleChange,
                    required: true,
                    defaultValue: this.props.formData.vatCondition,
                    name: "vatCondition"
                  }}
                />
              </GridItem>
              <GridItem md={4}>
                <CustomInput
                  labelText="Clave de impuestos"
                  id="taxationKey"
                  required
                  error={this.props.formErrors.taxationKey !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: this.handleChange,
                    required: true,
                    defaultValue: this.props.formData.taxationKey,
                    name: "taxationKey"
                  }}
                />
              </GridItem>
              <GridItem md={4}>
                <CustomInput
                  labelText="Ingresos brutos"
                  id="grossIncome"
                  required
                  error={this.props.formErrors.grossIncome !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: this.handleChange,
                    required: true,
                    defaultValue: this.props.formData.grossIncome,
                    name: "grossIncome"
                  }}
                />
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
  return state.customerReducer;
};

export default connect(mapStateToProps)(withStyles(styles)(FormCustomers));
