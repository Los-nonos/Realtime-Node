import GetGeneralChannelQuery from "../../Query/Channels/GetGeneralChannelQuery";
import {inject, injectable} from "inversify";
import INTERFACES from "../../../../Infrastructure/DI/interfaces.types";
import {ChannelRepository} from "../../../../Domain/Interfaces/Repositories/ChannelRepository";
import Channel from "../../../../Domain/Entities/Channel";

@injectable()
class GetGeneralChannelHandler {
  private channelRepository: ChannelRepository;
  constructor(@inject(INTERFACES.IChannelRepository) channelRepository: ChannelRepository) {
    this.channelRepository = channelRepository;
  }

  public async execute(_query: GetGeneralChannelQuery): Promise<Channel> {
    return await this.channelRepository.findOneByName('general');
  }
}

export default GetGeneralChannelHandler;