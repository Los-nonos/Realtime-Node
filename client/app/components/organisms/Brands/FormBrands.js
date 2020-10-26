import React from "react";
import { connect } from "react-redux";
import GridContainer from "../../atoms/Grid/GridContainer";
import { withStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import GridItem from "../../atoms/Grid/GridItem";
import CustomInput from "../../atoms/CustomInput/CustomInput";
import Button from "@material-ui/core/Button";
import LoadingButton from "../../atoms/CustomButtons/LoadingButton";
import styles from "../../../styles/dashboard/components/organisms/formProductStyles";

class FormBrands extends React.Component {
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

  createBrand = e => {
    e.preventDefault();

    const fields = ["name", "description"];

    const formElements = e.target.elements;
    const dataBrands = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    if (this.props.modalShow.createModal) {
      this.dispatch(this.props.createBrands(dataBrands));
    } else {
      dataBrands.id = this.props.formData.id;
      this.dispatch(this.props.updateBrands(dataBrands));
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
          {this.props.formData.name !== "" ? (
            <h4 className={classes.modalTitle}>{this.props.formData.name}</h4>
          ) : (
            <h4 className={classes.modalTitle}>{"Nuevo Marca"}</h4>
          )}
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <form onSubmit={this.createBrand}>
            <GridContainer justify={"center"}>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Name"
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
                  labelText="Description"
                  id="description"
                  error={this.props.formErrors.description !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: "description",
                    multiline: true,
                    rows: "5",
                    defaultValue: this.props.formData.description
                  }}
                />
              </GridItem>
            </GridContainer>
            <div className={classes.customSubmitButton}>
              <LoadingButton
                type="submit"
                color="primary"
                loading={this.props.loading}
              >
                Ok
              </LoadingButton>
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
  return state.brandsReducer;
};

export default connect(mapStateToProps)(withStyles(styles)(FormBrands));
