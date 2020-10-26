import User from "../../../../Domain/Entities/User";

class LoginResult {
  private user: User;
  private token: string;
  public constructor(user: User, token: string) {
    this.user = user;
    this.token = token;
  }

  public getUser(): User {
    return this.user;
  }

  public getToken(): string {
    return this.token;
  }
}

export default LoginResult;