import ApplicationException from "./ApplicationException";

class EntityNotFound extends ApplicationException {
  public constructor(message: string = '') {
    super(message);
  }
}

export default EntityNotFound;