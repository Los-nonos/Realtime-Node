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
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import ImageUploader from "../../molecules/Images/ImageUploader";

class FormProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAvailable: false,
      firstLoad: true,
      selectedImage: null,
      categoryFilters: null,
      characteristics: [],
      provider: "",
      category: "",
      brand: "",
      formData: props.formData
    };
    this.dispatch = props.dispatch;
  }

  toggleModal = async () => {
    await this.dispatch(this.props.closeModal());
  };

  createProduct = e => {
    e.preventDefault();

    const fields = [
      "name",
      "description",
      "price",
      "taxes",
      "stock",
      "purchaseOrderNumber"
    ];

    const formElements = e.target.elements;
    let dataProducts = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    const brands = [];
    brands.push(this.state.formData.brand.id);
    const categories = [];
    categories.push(this.state.formData.category.id);

    dataProducts = {
      ...dataProducts,
      providerId: this.state.formData.provider.id,
      brands,
      categories,
      characteristics: this.state.characteristics,
      images: this.props.formData.images
    };

    if (this.props.modalShow.createModal) {
      this.dispatch(this.props.createProduct(dataProducts));
    } else {
      dataProducts.id = this.props.formData.id;
      this.dispatch(this.props.updateProduct(dataProducts));
    }
  };

  handleSelectorChange = event => {
    const formData = this.state.formData;
    this.setState({
      formData: { ...formData, [event.target.name]: event.target.value }
    });
  };

  resolveImage = image_url => {
    this.dispatch(this.props.resolveImage(image_url));
  };

  assignCharacteristicToProduct = (name, value) => {
    const characteristics = this.state.characteristics;
    characteristics.push({ name, value });
    this.setState({ characteristics });
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
          {this.props.formData.name !== "" ? (
            <h4 className={classes.modalTitle}>{this.props.formData.name}</h4>
          ) : (
            <h4 className={classes.modalTitle}>{"Nuevo producto"}</h4>
          )}
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <form onSubmit={this.createProduct}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={3}>
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
                    onChange: this.handleSelectorChange,
                    name: "name",
                    defaultValue: this.state.formData.name
                  }}
                />
                <CustomInput
                  labelText="Description"
                  id="description"
                  required
                  error={this.props.formErrors.description !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    required: true,
                    name: "description",
                    onChange: this.handleSelectorChange,
                    multiline: true,
                    rows: "5",
                    defaultValue: this.state.formData.description
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
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
                    onChange: this.handleSelectorChange,
                    defaultValue: this.state.formData.price
                      ? this.state.formData.price.amount
                      : null
                  }}
                />
                <CustomInput
                  labelText={"Impuestos"}
                  id={"taxes"}
                  required
                  error={this.props.formErrors.taxes !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    required: true,
                    name: "taxes",
                    type: "number",
                    onChange: this.handleSelectorChange,
                    defaultValue: this.state.formData.taxes
                      ? this.state.formData.taxes.amount
                      : null
                  }}
                />
                <CustomInput
                  labelText={"Stock"}
                  id={"stock"}
                  required
                  error={this.props.formErrors.stock !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    required: true,
                    name: "stock",
                    type: "number",
                    onChange: this.handleSelectorChange,
                    defaultValue: this.state.formData.stock
                  }}
                />
                <CustomInput
                  labelText={"Numero de orden de compra"}
                  id={"purchaseOrderNumber"}
                  required
                  error={
                    this.props.formErrors.purchaseOrderNumber !== undefined
                  }
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    required: true,
                    name: "purchaseOrderNumber",
                    type: "text",
                    onChange: this.handleSelectorChange,
                    defaultValue: this.state.formData.purchaseOrderNumber
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <FormControl
                  fullWidth={true}
                  className={{
                    color: "#fff"
                  }}
                >
                  <InputLabel
                    htmlFor="category"
                    className={classes.selectLabel}
                  >
                    Categoria
                  </InputLabel>
                  <Select
                    MenuProps={{
                      className: classes.selectMenu
                    }}
                    classes={{
                      select: classes.select
                    }}
                    required
                    error={this.props.formErrors.category !== undefined}
                    value={
                      this.state.formData.category
                        ? this.state.formData.category
                        : null
                    }
                    onChange={this.handleSelectorChange}
                    inputProps={{
                      name: "category",
                      id: "category",
                      defaultValue: this.state.formData.category
                        ? this.state.formData.category.id
                        : null
                    }}
                  >
                    <MenuItem
                      disabled
                      classes={{
                        root: classes.selectMenuItem
                      }}
                    >
                      Categoria
                    </MenuItem>
                    {this.props.filters.categoryName.map(category => {
                      return (
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          className={{
                            color: "#fff"
                          }}
                          value={category}
                        >
                          {category.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl
                  fullWidth={true}
                  className={{
                    color: "#fff"
                  }}
                >
                  <InputLabel htmlFor="brand" className={classes.selectLabel}>
                    Marca
                  </InputLabel>
                  <Select
                    MenuProps={{
                      className: classes.selectMenu
                    }}
                    classes={{
                      select: classes.select
                    }}
                    required
                    error={this.props.formErrors.brand !== undefined}
                    value={
                      this.state.formData.brand
                        ? this.state.formData.brand
                        : null
                    }
                    onChange={this.handleSelectorChange}
                    inputProps={{
                      name: "brand",
                      id: "brand"
                    }}
                  >
                    <MenuItem
                      disabled
                      classes={{
                        root: classes.selectMenuItem
                      }}
                    >
                      Marca
                    </MenuItem>
                    {this.props.filters.brandName.map(brand => {
                      return (
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          className={{
                            color: "#fff"
                          }}
                          value={brand}
                        >
                          {brand.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl
                  fullWidth={true}
                  className={{
                    color: "#fff"
                  }}
                >
                  <InputLabel
                    htmlFor="provider"
                    className={classes.selectLabel}
                  >
                    Proveedor
                  </InputLabel>
                  <Select
                    MenuProps={{
                      className: classes.selectMenu
                    }}
                    classes={{
                      select: classes.select
                    }}
                    required
                    error={this.props.formErrors.provider !== undefined}
                    value={
                      this.state.formData.provider
                        ? this.state.formData.provider
                        : null
                    }
                    onChange={this.handleSelectorChange}
                    inputProps={{
                      name: "provider",
                      id: "provider",
                      defaultValue: this.state.formData.provider
                        ? this.state.formData.provider.id
                        : null
                    }}
                  >
                    <MenuItem
                      disabled
                      classes={{
                        root: classes.selectMenuItem
                      }}
                    >
                      Proveedor
                    </MenuItem>
                    {this.props.filters.providerName.map(provider => {
                      return (
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          className={{
                            color: "#fff"
                          }}
                          value={provider}
                        >
                          {provider.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <CardAvatar product>
                  <img
                    id="productImageShow"
                    alt={"productImageShow"}
                    src={this.state.formData.images[0]}
                    className={`${classes.customAvatarPlaceholder}`}
                  />
                </CardAvatar>
                <ImageUploader getImage={this.resolveImage} />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <CompleteProduct
                customFilters={this.state.categoryFilters}
                productsUpdated={this.props.productsUpdated}
                changeTabSelected={this.props.changeTabSelected}
                showNotification={this.props.showNotification}
                assignCharacteristicToProduct={
                  this.assignCharacteristicToProduct
                }
              />
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

FormProducts.propTypes = {
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

export default connect(mapStateToProps)(withStyles(styles)(FormProducts));
