import {inject, injectable} from "inversify";
import SubscribeToChannelHandler from "../../../../Application/Commands/Handler/Channels/SubscribeToChannelHandler";
import SubscribeToChannelAdapter from "../../../Http/Adapters/Channels/SubscribeToChannelAdapter";

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

  public async execute(data) {
    const command = this.adapter.from(data);

    const result = await this.handler.execute(command);

    return result.getId();
  }
}

export default SubscribeToChannelAction;