import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import GridContainer from "../../atoms/Grid/GridContainer";
import GridItem from "../../atoms/Grid/GridItem";
import CustomGridContainer from "../../atoms/Grid/CustomGridContainer";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import { withStyles } from "@material-ui/core";

import searchStyle from "../../../styles/dashboard/components/molecules/filterSearchStyles";
import CustomInput from "../../atoms/CustomInput/CustomInput";

class FilterSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFilters: {
        categoryName: [],
        filterName: "",
        filterOption: "",
        valueFilterOption: "",
        query: ""
      },
      lastSearch: [],
      categorySelected: ""
    };
    this.dispatch = props.dispatch;
    this.dispatch(this.props.loadFilters());
  }

  searchProducts = () => {
    this.props.changeCurrentFiltersState(this.state.currentFilters);
    this.dispatch(
      this.props.searchProducts(
        this.state.currentFilters,
        this.props.page,
        this.props.orderBy,
        this.props.order
      )
    );
    const lastSearch = [];
    for (const filter of Object.values(this.state.currentFilters)) {
      if (filter && typeof filter === "string") {
        lastSearch.push(filter);
      }
    }

    this.setState({
      currentFilters: {
        categoryName: []
      },
      lastSearch,
      categorySelected: ""
    });
  };

  lastSearch = () => {
    const { classes } = this.props;
    if (this.state.lastSearch.length !== 0) {
      return (
        <>
          <h6 className={classes.lastSearch}>Last search:</h6>
          {this.state.lastSearch.map((filter, index) => {
            return (
              <Button key={index} disabled color="primary" small>
                {filter}
              </Button>
            );
          })}
        </>
      );
    }
  };

  handleCategoryName = event => {
    const currentFilters = this.state.currentFilters;
    currentFilters.categoryName = [];
    currentFilters.categoryName.push(event.target.value);

    this.setState({
      currentFilters,
      categorySelected: event.target.value
    });
  };

  handleLoad = event => {
    const currentFilters = this.state.currentFilters;
    currentFilters[event.target.name] = event.target.value;

    this.setState({ currentFilters });
  };

  listCategoryName = classes => {
    return this.props.filters.categoryName.map((categoryName, index) => (
      <MenuItem
        key={index}
        classes={{
          root: classes.selectMenuItem,
          selected: classes.selectMenuItemSelectedMultiple
        }}
        value={categoryName.id}
      >
        {categoryName.name}
      </MenuItem>
    ));
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <CustomGridContainer>
          <GridItem>{this.lastSearch()}</GridItem>
        </CustomGridContainer>
        <GridContainer justify={"center"}>
          <GridItem sm={12} md={2}>
            <CustomInput
              labelText="Name"
              id="query"
              required
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: this.handleLoad,
                required: true,
                name: "query",
                defaultValue: this.state.currentFilters.query
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={2}>
            <FormControl fullWidth className={classes.selectFormControl}>
              <InputLabel
                htmlFor="category-name"
                className={classes.selectLabel}
              >
                Category name
              </InputLabel>
              <Select
                value={this.state.currentFilters.categoryName}
                onChange={this.handleCategoryName}
                MenuProps={{
                  className: classes.selectMenu,
                  classes: { paper: classes.selectPaper }
                }}
                classes={{ select: classes.select }}
                inputProps={{
                  name: "categoryName",
                  id: "category-name"
                }}
              >
                <MenuItem
                  disabled
                  classes={{
                    root: classes.selectMenuItem
                  }}
                >
                  Category name
                </MenuItem>
                {this.listCategoryName(classes)}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={2}>
            <Button color={"primary"} onClick={this.searchProducts}>
              BUSCAR
            </Button>
          </GridItem>
        </GridContainer>
      </>
    );
  }
}

FilterSearch.propTypes = {
  classes: PropTypes.object.isRequired,
  loadFilters: PropTypes.func,
  searchProducts: PropTypes.func,
  filters: PropTypes.object
};

const mapStateToProps = state => {
  return state.searchReducer;
};

export default connect(mapStateToProps)(withStyles(searchStyle)(FilterSearch));
