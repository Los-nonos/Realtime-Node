import React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import GridContainer from "../../atoms/Grid/GridContainer";
import GridItem from "../../atoms/Grid/GridItem";
import CustomInput from "../../atoms/CustomInput/CustomInput";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";
import styles from "../../../styles/dashboard/components/organisms/formProductStyles";

class FormProvider extends React.Component {
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

  createProvider = e => {
    e.preventDefault();

    const fields = [
      "name",
      "businessName",
      "address",
      "zipCode",
      "phoneNumber",
      "observations"
    ];

    const formElements = e.target.elements;

    const dataProvider = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    if (this.props.modalShow.createModal) {
      this.dispatch(this.props.createProvider(dataProvider));
    } else {
      dataProvider.id = this.props.formData.id;
      this.dispatch(this.props.updateProvider(dataProvider));
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
            <h4 className={classes.modalTitle}>{"Nuevo Proveedor"}</h4>
          )}
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <form onSubmit={this.createProvider}>
            <GridContainer justify={"center"}>
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
                  labelText="Nombre Legal"
                  id="businessName"
                  required
                  error={this.props.formErrors.businessName !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    required: true,
                    name: "businessName",
                    defaultValue: this.props.formData.businessName
                  }}
                />
                <CustomInput
                  labelText="Direccion"
                  id="direction"
                  error={this.props.formErrors.direction !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: "address",
                    defaultValue: this.props.formData.direction
                  }}
                />
              </GridItem>
              <GridItem xs={12} md={4} sm={12}>
                <CustomInput
                  labelText="Código postal"
                  id="zipCode"
                  error={this.props.formErrors.zipCode !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: "zipCode",
                    defaultValue: this.props.formData.zipCode
                  }}
                />
                <CustomInput
                  labelText="Número de telefono"
                  id="phoneNumber"
                  error={this.props.formErrors.phoneNumber !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: "phoneNumber",
                    defaultValue: this.props.formData.phoneNumber
                  }}
                />
                <CustomInput
                  labelText="Observaciones"
                  id="observations"
                  error={this.props.formErrors.observations !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: "observations",
                    defaultValue: this.props.formData.observations
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
  return state.providersReducer;
};

export default connect(mapStateToProps)(withStyles(styles)(FormProvider));
