import ApplicationException from "./ApplicationException.js";

class EntityNotFound extends ApplicationException {
  public constructor(message: string = '') {
    super(message);
  }
}

export default EntityNotFound;