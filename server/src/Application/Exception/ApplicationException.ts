class ApplicationException extends Error {
  public constructor(message: string) {
    super(message);
  }
}

export default ApplicationException;