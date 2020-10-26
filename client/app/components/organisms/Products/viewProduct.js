import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import LoadingButton from "../../atoms/CustomButtons/LoadingButton";
import Button from "@material-ui/core/Button";
import GridContainer from "../../atoms/Grid/GridContainer";
import GridItem from "../../atoms/Grid/GridItem";
import CustomInput from "../../atoms/CustomInput/CustomInput";
import CardAvatar from "../../molecules/Card/CardAvatar";
import CompleteProduct from "./CompleteProduct";
import { withStyles } from "@material-ui/core";
import styles from "../../../styles/dashboard/components/organisms/formProductStyles";
import productUploadImage from "../../../services/api/uploadImage";

class ViewProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAvailable: false,
      firstLoad: true,
      selectedImage: null,
      product: this.props.productWithDetails
    };
    this.dispatch = props.dispatch;
  }

  toggleModal = async () => {
    await this.dispatch(this.props.closeModal());
  };

  render() {
    const { classes, Transition } = this.props;
    // const isImage = this.checkIfUrlIsImage(this.props.formData.productImage);
    // this.props.formData.productImage = isImage
    //   ? this.props.formData.productImage
    //   : ""; // TODO: change from image product default

    //TODO: change this grap
    if (this.props.modalShow.updateModal && this.state.firstLoad) {
      this.updateValues();
    }
    return (
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal
        }}
        open={this.props.modalShow.viewModal}
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
          {this.props.formData.title !== "" ? (
            <h4 className={classes.modalTitle}>{this.props.formData.title}</h4>
          ) : (
            <h4>{this.props.formData.title}</h4>
          )}
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <form>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="Name"
                  id="name"
                  disabled
                  error={this.props.formErrors.title !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    required: true,
                    name: "title",
                    defaultValue: this.props.formData.title,
                    disabled: true
                  }}
                />
                <CustomInput
                  labelText="Description"
                  id="description"
                  disabled
                  error={this.props.formErrors.description !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    required: true,
                    name: "description",
                    multiline: true,
                    rows: "5",
                    value: this.state.product.description,
                    disabled: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText={"Price"}
                  id={"price"}
                  required
                  error={this.props.formErrors.price !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    required: true,
                    name: "price",
                    type: "number",
                    value: this.state.product.price,
                    disabled: true
                  }}
                />
                <CustomInput
                  labelText={"Taxes"}
                  id={"taxes"}
                  required
                  error={this.props.formErrors.price !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    required: true,
                    name: "taxes",
                    type: "number",
                    value: this.state.product.taxes,
                    disabled: true
                  }}
                />
                <CustomInput
                  labelText={"Category"}
                  id={"category"}
                  disabled
                  inputProps={{
                    value: this.state.product.category,
                    disabled: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <CardAvatar product>
                  <img
                    id="productImageShow"
                    alt={"productImageShow"}
                    src={this.props.formData.productImage}
                    className={`${classes.customAvatarPlaceholder}`}
                  />
                </CardAvatar>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <CompleteProduct
                productsUpdated={this.props.productsUpdated}
                changeTabSelected={this.props.changeTabSelected}
                showNotification={this.props.showNotification}
                assignCharacteristicToProduct={
                  this.props.assignCharacteristicToProduct
                }
              />
            </GridContainer>
            <div className={classes.customSubmitButton}>
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

ViewProduct.propTypes = {
  classes: PropTypes.object.isRequired,

  name: PropTypes.string,
  description: PropTypes.string,
  productImage: PropTypes.string,
  price: PropTypes.string,

  modalShow: PropTypes.object,
  dispatch: PropTypes.func,
  closeModal: PropTypes.func,
  showProfileModal: PropTypes.func,
  createProduct: PropTypes.func,
  updateProduct: PropTypes.func,
  imageUpload: PropTypes.func,
  error: PropTypes.object,
  formData: PropTypes.object,
  formErrors: PropTypes.object,
  loadingToggle: PropTypes.func,
  assignCharacteristicToProduct: PropTypes.func,
  selectedCategory: PropTypes.func,

  productProfileUpdated: PropTypes.func,
  showNotification: PropTypes.func
};

const mapStateToProps = state => {
  return state.productsReducer;
};

export default connect(mapStateToProps)(withStyles(styles)(ViewProduct));
