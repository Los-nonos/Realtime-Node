import ApplicationException from "./ApplicationException.js";
import {ErrorsKeys} from "../../Domain/Types/ErrorsKeys.js";

class PasswordNotMatch extends ApplicationException {
  public constructor(message: string = 'Password don\'t match') {
    super(JSON.stringify({field: ErrorsKeys.password, message}));
  }
}

export default PasswordNotMatch;