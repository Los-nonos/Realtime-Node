import ApplicationException from "./ApplicationException";

class ValidationException extends ApplicationException {
  public constructor(message: string) {
    super(message);
  }
}

export default ValidationException;