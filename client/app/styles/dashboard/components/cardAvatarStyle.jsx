import { hexToRgb, blackColor } from "../../zeepDashboardStyles";

const cardAvatarStyle = {
  cardAvatar: {
    "&$cardAvatarProduct img": {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    },
    "&$cardAvatarProducts img": {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  },

  cardAvatarProducts: {
    width: "130px",
    height: "130px",
    display: "flex",
    alignItems: "center",
    margin: "-43px auto 0",
    borderRadius: "50%",
    overflow: "hidden",
    padding: "0",
    boxShadow:
      "0 16px 38px -12px rgba(" +
      hexToRgb(blackColor) +
      ", 0.56), 0 4px 25px 0px rgba(" +
      hexToRgb(blackColor) +
      ", 0.12), 0 8px 10px -5px rgba(" +
      hexToRgb(blackColor) +
      ", 0.2)",
    "&$cardAvatarPlain": {
      marginTop: "0"
    }
  },
  cardAvatarProduct: {
    width: "150px",
    height: "150px",
    display: "flex",
    alignItems: "center",
    margin: "-43px auto 0",
    borderRadius: "50%",
    overflow: "hidden",
    padding: "0",
    boxShadow:
      "0 16px 38px -12px rgba(" +
      hexToRgb(blackColor) +
      ", 0.56), 0 4px 25px 0px rgba(" +
      hexToRgb(blackColor) +
      ", 0.12), 0 8px 10px -5px rgba(" +
      hexToRgb(blackColor) +
      ", 0.2)",
    "&$cardAvatarPlain": {
      marginTop: "0"
    }
  },
  cardAvatarPlain: {}
};

export default cardAvatarStyle;
