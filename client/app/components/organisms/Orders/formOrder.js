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
import styles from "../../../styles/dashboard/components/organisms/formOrderStyles";
import Table from "../../molecules/Tables/OrdersProductsTable";
import * as actions from "../../../actions/OrderActions";
import { Add, Close, KeyboardArrowRight, Remove } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";

class FormOrder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAvailable: false,
      firstLoad: true
    };
    this.dispatch = props.dispatch;
    this.loadProducts();
  }

  toggleModal = async () => {
    await this.dispatch(this.props.closeModal());
  };

  searchCustomer = e => {
    e.preventDefault();

    this.dispatch(this.props.showSearchCustomerModal());
  };

  createOrder = e => {
    e.preventDefault();

    const fields = ["name", "numberSell"];

    const formElements = e.target.elements;

    const dataOrder = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    dataOrder.customerId = this.props.formData.customer.id;
    dataOrder.employeeId = this.props.userData.id;
    dataOrder.products = this.props.formData.productsSaved;

    if (this.props.modalShow.createModal) {
      this.dispatch(this.props.createOrder(dataOrder));
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

  calculateAmount(price, quantity) {
    return price * quantity;
  }

  calculateTotalPrice() {
    let acumulated = 0;
    this.props.formData.products.forEach(product => {
      acumulated += product.price * product.quantity;
    });
    return acumulated;
  }

  removeProductQuantity = id => {
    this.dispatch(actions.removeProductQuantityFromShoppingCart(id));
  };

  addProductQuantity = id => {
    this.dispatch(actions.addProductQuantityFromShoppingCart(id));
  };

  removeProduct = id => {
    this.dispatch(actions.removeProduct(id));
  };

  listProducts = () => {
    const { classes } = this.props;
    const products = [];

    if (this.props.formData.products.length === 0) {
      return products;
    }

    this.props.formData.products.forEach(product => {
      products.push([
        <div className={classes.imgContainer} key={1}>
          {/*<img src={product.images[0]} alt="..." className={classes.img} />*/}
        </div>,
        <span key={1}>
          <a href="#jacket" className={classes.tdNameAnchor}>
            {product.name}
          </a>
          <br />
          <small className={classes.tdNameSmall}>
            {product.brands[0].name}
          </small>
        </span>,
        product.characteristics[0].value,
        <span key={1}>
          <small className={classes.tdNumberSmall}>$</small>
          {product.price}
        </span>,
        <span key={1}>
          {product.quantity}
          {` `}
          <div className={classes.buttonGroup}>
            <Button
              color="info"
              size="sm"
              round
              className={classes.firstButton}
              onClick={() => {
                this.removeProductQuantity(product.id);
              }}
            >
              <Remove />
            </Button>
            <Button
              color="info"
              size="sm"
              round
              className={classes.lastButton}
              onClick={() => {
                this.addProductQuantity(product.id);
              }}
            >
              <Add />
            </Button>
          </div>
        </span>,
        <span key={1}>
          <small className={classes.tdNumberSmall}>$</small>
          {this.calculateAmount(product.price, product.quantity)}
        </span>,
        <Tooltip
          key={1}
          id="close1"
          title="Remove item"
          placement="left"
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            link
            round={true}
            onClick={() => {
              this.removeProduct(product.id);
            }}
          >
            <Close />
          </Button>
        </Tooltip>
      ]);
    });

    products.push({
      purchase: true,
      colspan: "3",
      amount: (
        <span>
          <small>$</small>
          {this.calculateTotalPrice()}
        </span>
      ),
      col: {
        colspan: 3,
        text: (
          <Button color="info" round={true} type={"submit"} link={true}>
            Completar Compra <KeyboardArrowRight />
          </Button>
        )
      }
    });

    return products;
  };

  loadProducts = () => {
    if (
      this.props.formData.productsSaved.length !==
      this.props.formData.products.length
    ) {
      this.dispatch(actions.loadProducts(this.props.formData.productsSaved));
    }
  };

  isCartContainsProducts = () => {
    return this.props.formData.products.length >= 1;
  };

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
        open={this.props.modalShow.createModal}
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
          <h4 className={classes.modalTitle}>{"Nueva Orden"}</h4>
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <form onSubmit={this.createOrder}>
            <GridContainer>
              <GridItem xs={11} sm={11} md={4}>
                <CustomInput
                  labelText="Cliente"
                  id="name"
                  required
                  error={this.props.formErrors.customer !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    required: true,
                    name: "customer",
                    defaultValue: this.props.formData.customer
                      ? this.props.formData.customer.name
                      : ""
                  }}
                />
                <CustomInput
                  labelText="Número de compra"
                  id="numberSell"
                  required
                  error={this.props.formErrors.numberSell !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    required: true,
                    name: "numberSell",
                    defaultValue: this.props.formData.numberSell
                  }}
                />
              </GridItem>
              <GridItem xs={1} sm={1} md={1}>
                <Button onClick={this.searchCustomer} color={"primary"}>
                  Search
                </Button>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                {this.isCartContainsProducts() ? (
                  <>
                    <h3 className={classes.cardTitle}>Shopping Cart</h3>
                    <Table
                      tableHead={[
                        "",
                        "PRODUCTO",
                        "COLOR",
                        "PRECIO",
                        "CANTIDAD",
                        "MONTO",
                        ""
                      ]}
                      tableData={this.listProducts()}
                      tableShopping={true}
                      customHeadCellClasses={[
                        classes.textCenter,
                        classes.description,
                        classes.description,
                        classes.textRight,
                        classes.textRight,
                        classes.textRight
                      ]}
                      customHeadClassesForCells={[0, 2, 3, 4, 5, 6]}
                      customCellClasses={[
                        classes.tdName,
                        classes.customFont,
                        classes.customFont,
                        classes.tdNumber,
                        classes.tdNumber + " " + classes.tdNumberAndButtonGroup,
                        classes.tdNumber + " " + classes.textCenter
                      ]}
                      customClassesForCells={[1, 2, 3, 4, 5, 6]}
                    />
                  </>
                ) : null}
              </GridItem>
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

const mapStateToProps = state => {
  const { userData } = state.login;
  return { userData, ...state.ordersReducer };
};

export default connect(mapStateToProps)(withStyles(styles)(FormOrder));
