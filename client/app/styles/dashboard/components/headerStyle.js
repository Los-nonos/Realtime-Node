import {
  container,
  defaultFont,
  primaryColor,
  defaultBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  whiteColor,
  grayColor
} from "../../zeepDashboardStyles";

const headerStyle = theme => ({
  appBar: {
    backgroundColor: "transparent",
    boxShadow: "none",
    borderBottom: "0",
    marginBottom: "0",
    position: "absolute",
    width: "100%",
    paddingTop: "10px",
    zIndex: "1029",
    color: grayColor,
    border: "0",
    borderBottomLeftRadius: "3px",
    borderBottomRightRadius: "3px",
    padding: "10px 0",
    transition: "all 150ms ease 0s",
    minHeight: "50px",
    display: "block"
  },
  container: {
    ...container,
    minHeight: "50px"
  },
  flex: {
    flex: 1
  },
  title: {
    ...defaultFont,
    lineHeight: "30px",
    fontSize: "18px",
    borderRadius: "3px",
    textTransform: "none",
    color: "inherit",
    margin: "0",
    "&:hover,&:focus": {
      background: "transparent"
    }
  },
  appResponsive: {
    top: "8px"
  },
  primary: {
    backgroundColor: primaryColor,
    color: whiteColor,
    ...defaultBoxShadow
  },
  info: {
    backgroundColor: infoColor,
    color: whiteColor,
    ...defaultBoxShadow
  },
  success: {
    backgroundColor: successColor,
    color: whiteColor,
    ...defaultBoxShadow
  },
  warning: {
    backgroundColor: warningColor,
    color: whiteColor,
    ...defaultBoxShadow
  },
  danger: {
    backgroundColor: dangerColor,
    color: whiteColor,
    ...defaultBoxShadow
  },
  zeepBlue: {
    backgroundColor: infoColor,
    color: whiteColor,
    ...defaultBoxShadow,
    borderTopLeftRadius: "0",
    borderTopRightRadius: "0"
  }
});

export default headerStyle;
