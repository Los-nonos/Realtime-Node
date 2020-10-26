import {inject, injectable} from "inversify";
import StoreMessageHandler from "../../../../Application/Commands/Handler/Messages/StoreMessageHandler";
import StoreMessageAdapter from "../../Adapters/Messages/StoreMessageAdapter";

@injectable()
class StoreMessageAction {
  private adapter: StoreMessageAdapter;
  private handler: StoreMessageHandler;
  constructor(
    @inject(StoreMessageAdapter) adapter: StoreMessageAdapter,
    @inject(StoreMessageHandler) handler: StoreMessageHandler
  ) {
    this.adapter = adapter;
    this.handler = handler;
  }

  public async execute(data) {
    const command = await this.adapter.from(data);

    return await this.handler.execute(command);
  }
}

export default StoreMessageAction;