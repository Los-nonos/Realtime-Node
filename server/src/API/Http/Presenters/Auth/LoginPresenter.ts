import LoginResult from "../../../../Application/Queries/Result/Auth/LoginResult";

class LoginPresenter {
  private result: LoginResult;

  constructor(result: LoginResult) {
    this.result = result;
  }

  public getData(): any {
    return {
      token: this.result.getToken(),
      user: {
        id: this.result.getUser().getId(),
        roles: [],
      }
    };
  }
}

export default LoginPresenter;