import ApplicationException from "./ApplicationException.js";

class ValidationException extends ApplicationException {
  public constructor(message: string) {
    super(message);
  }
}

export default ValidationException;