import React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import GridContainer from "../../atoms/Grid/GridContainer";
import GridItem from "../../atoms/Grid/GridItem";
import CustomInput from "../../atoms/CustomInput/CustomInput";
import Button from "@material-ui/core/Button";
import CustomerTable from "../../molecules/Tables/CustomerTable";
import { withStyles } from "@material-ui/core";
import styles from "../../../styles/dashboard/components/organisms/formProductStyles";
import Card from "../../molecules/Card/Card";
import CardBody from "../../molecules/Card/CardBody";
import CardHeader from "../../molecules/Card/CardHeader";

class FormSearchCustomers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAvailable: false,
      firstLoad: true
    };
    this.dispatch = props.dispatch;
  }

  toggleModal = async () => {
    await this.dispatch(this.props.closeModalCustomer());
  };

  searchCustomer = e => {
    e.preventDefault();

    const fields = ["name", "dni", "cuil"];

    const formElements = e.target.elements;

    const dataSearchCustomer = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    this.dispatch(this.props.searchCustomer(dataSearchCustomer));
  };

  listCustomers = () => {
    const customers = [];

    for (const customer of this.props.customers) {
      const dataCustomer = {
        visibleData: [customer.name, customer.surname, customer.dni],
        id: customer.id
      };

      customers.push(dataCustomer);
    }

    return customers;
  };

  handleSelectorChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  updateValues() {
    this.setState({
      firstLoad: false
    });
  }

  selectUserByOrderHandle = id => {
    this.dispatch(this.props.selectUser(id));
    this.dispatch(this.props.closeModalCustomer());
  };

  render() {
    const { classes, Transition } = this.props;

    let dataCustomers = [];

    if (this.props.customers[0]) {
      dataCustomers = this.listCustomers();
    }

    return (
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal
        }}
        open={this.props.modalShow.searchCustomer}
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
          {<h4 className={classes.modalTitle}>{"Buscar Cliente"}</h4>}
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <form onSubmit={this.searchCustomer}>
            <GridContainer justify={"center"}>
              <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                  labelText="Nombre"
                  id="name"
                  error={this.props.formErrors.name !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: "name",
                    defaultValue: this.props.formData.name
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                  labelText="Dni"
                  id="dni"
                  required
                  error={this.props.formErrors.dni !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: "dni",
                    defaultValue: this.props.formData.dni
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                  labelText="Cuil"
                  id="cuil"
                  required
                  error={this.props.formErrors.cuil !== undefined}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: "cuil",
                    defaultValue: this.props.formData.cuil
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={2}>
                <Button
                  type="submit"
                  color="primary"
                  loading={this.props.loading}
                >
                  BUSCAR
                </Button>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <Card>
                <CardHeader color={"primary"}>
                  <h4>{"Clientes filtrados"}</h4>
                </CardHeader>
                <CardBody>
                  <CustomerTable
                    tableHead={["Nombre", "Apellido", "D.N.I."]}
                    tableData={dataCustomers}
                    listCustomer={this.props.searchCustomers}
                    selectUser={true}
                    selectedUser={this.selectUserByOrderHandle}
                  />
                </CardBody>
              </Card>
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
  return state.ordersReducer;
};

export default connect(mapStateToProps)(
  withStyles(styles)(FormSearchCustomers)
);
