import {Request, Response} from "express";
import {HTTP_CODES} from "../../Enums/HTTP_CODES.js";
import LoginPresenter from "../../Presenters/Auth/LoginPresenter.js";
import {inject, injectable} from "inversify";
import LoginHandler from "../../../../Application/Queries/Handler/Auth/LoginHandler.js";
import {success} from "../../Presenters/customResponse.js";
import LoginAdapter from "../../Adapters/Auth/LoginAdapter.js";

@injectable()
class LoginAction {
  private adapter: LoginAdapter;
  private handler: LoginHandler;

  constructor(@inject(LoginAdapter) adapter: LoginAdapter, @inject(LoginHandler) handler: LoginHandler) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(req: Request, res: Response) {
    const query = await this.adapter.from(req.body);

    const result = await this.handler.execute(query);

    const presenter = new LoginPresenter(result);

    return res.status(HTTP_CODES.OK).json(success(presenter.getData()));
  }
}

export default LoginAction;