import {inject} from "inversify";
import StoreUserHandler from "../../../../Application/Commands/Handler/User/StoreUserHandler.js";
import {Request, Response} from "express";
import {HTTP_CODES} from "../../Enums/HTTP_CODES.js";
import StoreUserAdapter from "../../Adapters/User/StoreUserAdapter.js";

class StoreUserAction {
  private adapter: StoreUserAdapter;
  private handler: StoreUserHandler;

  public constructor(
    @inject(StoreUserAdapter) adapter: StoreUserAdapter,
    @inject(StoreUserHandler) handler: StoreUserHandler
  ) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(req: Request, res: Response) {
    const command = await this.adapter.from(req.body);

    await this.handler.execute(command);

    res.status(HTTP_CODES.OK).end();
  }
}

export default StoreUserAction;