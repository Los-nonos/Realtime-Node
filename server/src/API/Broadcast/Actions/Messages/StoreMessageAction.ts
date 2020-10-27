import {inject, injectable} from "inversify";
import StoreMessageHandler from "../../../../Application/Commands/Handler/Messages/StoreMessageHandler";
import StoreMessageAdapter from "../../Adapters/Messages/StoreMessageAdapter";
import GetGeneralChannelHandler from "../../../../Application/Queries/Handler/Channels/GetGeneralChannelHandler";
import GetGeneralChannelQuery from "../../../../Application/Queries/Query/Channels/GetGeneralChannelQuery";

@injectable()
class StoreMessageAction {
  private adapter: StoreMessageAdapter;
  private handler: StoreMessageHandler;
  private generalHandler: GetGeneralChannelHandler;
  constructor(
    @inject(StoreMessageAdapter) adapter: StoreMessageAdapter,
    @inject(StoreMessageHandler) handler: StoreMessageHandler,
    @inject(GetGeneralChannelHandler) generalHandler: GetGeneralChannelHandler
  ) {
    this.adapter = adapter;
    this.handler = handler;
    this.generalHandler = generalHandler;
  }

  public async execute(data) {
    const command = await this.adapter.from(data);

    await this.handler.execute(command);

    return await this.generalHandler.execute(new GetGeneralChannelQuery(data.channelId));
  }
}

export default StoreMessageAction;