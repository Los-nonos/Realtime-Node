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

class FormCategories extends React.Component {
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

  createCategory = e => {
    e.preventDefault();

    const fields = ["name"];

    const formElements = e.target.elements;

    const dataCategory = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    if (this.props.modalShow.createModal) {
      this.dispatch(this.props.createCategory(dataCategory));
    } else {
      dataCategory.id = this.props.formData.id;
      this.dispatch(this.props.updateCategory(dataCategory));
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
          {this.props.formData.name ? (
            <h4 className={classes.modalTitle}>{this.props.formData.name}</h4>
          ) : (
            <h4 className={classes.modalTitle}>{"Nueva Categoria"}</h4>
          )}
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <form onSubmit={this.createCategory}>
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
  return state.categoriesReducer;
};

export default connect(mapStateToProps)(withStyles(styles)(FormCategories));
