import {Request, Response} from "express";
import SubscribeToChannelAdapter from "../../Adapters/Channels/SubscribeToChannelAdapter.js";
import {inject, injectable} from "inversify";
import SubscribeToChannelHandler from "../../../../Application/Commands/Handler/Channels/SubscribeToChannelHandler.js";

@injectable()
class SubscribeToChannelAction {
  private adapter: SubscribeToChannelAdapter;
  private handler: SubscribeToChannelHandler;

  public constructor(
    @inject(SubscribeToChannelAdapter) adapter: SubscribeToChannelAdapter,
    @inject(SubscribeToChannelHandler) handler: SubscribeToChannelHandler
  ) {
    this.adapter = adapter;
    this.handler = handler;
  }


  public async execute(req: Request, _res: Response) {
    const command = await this.adapter.from(req.body);

    await this.handler.execute(command);
  }
}

export default SubscribeToChannelAction;