import { primaryColor, blackColor, hexToRgb } from "../zeepDashboardStyles";

const checkboxAdnRadioStyle = {
  root: {
    padding: "13px"
  },
  checked: {
    color: primaryColor + "!important"
  },
  checkedIcon: {
    width: "20px",
    height: "20px",
    border: "1px solid rgba(" + hexToRgb(blackColor) + ", .54)",
    borderRadius: "3px",
    boxSizing: "content-box"
  },
  uncheckedIcon: {
    width: "0px",
    height: "0px",
    padding: "10px",
    border: "1px solid rgba(" + hexToRgb(blackColor) + ", .54)",
    borderRadius: "3px"
  },
  radio: {
    color: primaryColor + "!important"
  },
  radioChecked: {
    width: "20px",
    height: "20px",
    border: "1px solid " + primaryColor,
    borderRadius: "50%",
    boxSizing: "content-box"
  },
  radioUnchecked: {
    width: "0px",
    height: "0px",
    padding: "10px",
    border: "1px solid rgba(" + hexToRgb(blackColor) + ", .54)",
    borderRadius: "50%"
  }
};

export default checkboxAdnRadioStyle;
