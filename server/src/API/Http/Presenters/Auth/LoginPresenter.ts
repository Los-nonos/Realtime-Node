import LoginResult from "../../../../Application/Queries/Result/Auth/LoginResult";

class LoginPresenter {
  private result: LoginResult;

  constructor(result: LoginResult) {
    this.result = result;
  }

  public getData(): any {
    return {
      id: this.result.getUser().getId(),
      token: this.result.getToken(),
    };
  }
}

export default LoginPresenter;