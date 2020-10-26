import ApplicationException from "./ApplicationException";

class AuthorizationFailed extends ApplicationException {
  constructor(field: string, message: string) {
    super(JSON.stringify({field, message}));
  }
}

export default AuthorizationFailed;