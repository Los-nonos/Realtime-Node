import GetChannelsOfUserQuery from "../../../../Application/Queries/Query/Channels/GetChannelsOfUserQuery";
import {inject, injectable} from "inversify";
import GetChannelsOfUserHandler from "../../../../Application/Queries/Handler/Channels/GetChannelsOfUserHandler";
import GetChannelsOfUserPresenter from "../../Presenters/Channels/GetChannelsOfUserPresenter";

@injectable()
class GetChannelsOfUserAction {
  private handler: GetChannelsOfUserHandler;

  public constructor(@inject(GetChannelsOfUserHandler) handler: GetChannelsOfUserHandler) {
    this.handler = handler;
  }

  public async execute(userId) {
    const query = new GetChannelsOfUserQuery(userId);

    const result = await this.handler.execute(query);

    const presenter = new GetChannelsOfUserPresenter(result);

    return presenter.getData();
  }
}

export default GetChannelsOfUserAction;