import GetChannelsOfUserQuery from "../../Query/Channels/GetChannelsOfUserQuery";
import {inject, injectable} from "inversify";
import GetChannelsOfUserResult from "../../Result/Channels/GetChannelsOfUserResult";
import INTERFACES from "../../../../Infrastructure/DI/interfaces.types";
import {ChannelRepository} from "../../../../Domain/Interfaces/Repositories/ChannelRepository";

@injectable()
class GetChannelsOfUserHandler {
  private channelRepository: ChannelRepository;

  constructor(@inject(INTERFACES.IChannelRepository) channelRepository: ChannelRepository) {
    this.channelRepository = channelRepository;
  }

  public async execute(query: GetChannelsOfUserQuery): Promise<GetChannelsOfUserResult> {
    const channels = await this.channelRepository.findByUserId(query.getUserId());

    return new GetChannelsOfUserResult(channels);
  }
}

export default GetChannelsOfUserHandler;