import {inject, injectable} from "inversify";
import StoreUserHandler from "../../../../Application/Commands/Handler/User/StoreUserHandler";
import {Request, Response} from "express";
import {HTTP_CODES} from "../../Enums/HTTP_CODES";
import StoreUserAdapter from "../../Adapters/User/StoreUserAdapter";

@injectable()
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

    res.status(HTTP_CODES.OK).json({message: 'User has been saved successfully'});
  }
}

export default StoreUserAction;