import GetGeneralChannelQuery from "../../../../Application/Queries/Query/Channels/GetGeneralChannelQuery.js";
import {inject, injectable} from "inversify";
import GetGeneralChannelHandler from "../../../../Application/Queries/Handler/Channels/GetGeneralChannelHandler.js";

@injectable()
class GetGeneralChannelAction {
  private handler: GetGeneralChannelHandler;
  public constructor(@inject(GetGeneralChannelHandler) handler: GetGeneralChannelHandler) {
    this.handler = handler;
  }

  public async execute() {
    const query = new GetGeneralChannelQuery();

    return await this.handler.execute(query);
  }
}

export default GetGeneralChannelAction;