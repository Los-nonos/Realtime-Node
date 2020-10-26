import {
  dangerColor,
  cardTitle,
  whiteColor,
  grayColor,
  blackColor,
  hexToRgb
} from "../../zeepDashboardStyles";
import customCheckboxRadioSwitch from "../../dashboard/checkboxAdnRadioStyle.jsx";

const loginPageStyle = {
  ...customCheckboxRadioSwitch,
  container: {
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
    "&:before,&:after": {
      display: "table",
      content: '" "'
    },
    "&:after": {
      clear: "both"
    },
    zIndex: "4"
    // [theme.breakpoints.down('sm')]: {
    //   paddingBottom: '100px',
    // },
  },
  cardTitle: {
    ...cardTitle,
    color: whiteColor
  },
  textCenter: {
    textAlign: "center"
  },
  justifyContentCenter: {
    justifyContent: "center !important"
  },
  customButtonClass: {
    "&,&:focus,&:hover": {
      color: whiteColor
    },
    marginLeft: "5px",
    marginRight: "5px"
  },
  inputAdornment: {
    marginRight: "18px"
  },
  inputAdornmentIcon: {
    color: grayColor[6]
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)"
  },
  cardHeader: {
    marginBottom: "20px"
  },
  socialLine: {
    padding: "0.9375rem 0"
  },
  formControlClassName: {
    margin: "0",
    paddingBottom: "0",
    "& + $formControlClassName": {
      marginTop: "5px"
    }
  },
  checkboxLabelControlClassName: {
    marginTop: "16px"
  },
  checkboxLabel: {
    color: "rgba(" + hexToRgb(blackColor) + ", 0.26)"
  },
  error: {
    color: dangerColor[0]
  }
};

export default loginPageStyle;
