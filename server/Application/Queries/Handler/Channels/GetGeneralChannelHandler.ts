import GetGeneralChannelQuery from "../../Query/Channels/GetGeneralChannelQuery.js";
import {inject, injectable} from "inversify";
import INTERFACES from "../../../../Infrastructure/DI/interfaces.types.js";
import {ChannelRepository} from "../../../../Domain/Interfaces/Repositories/ChannelRepository.js";

@injectable()
class GetGeneralChannelHandler {
  private channelRepository: ChannelRepository;
  constructor(@inject(INTERFACES.IChannelRepository) channelRepository: ChannelRepository) {
    this.channelRepository = channelRepository;
  }

  public async execute(_query: GetGeneralChannelQuery) {
    return await this.channelRepository.findOneByName('general');
  }
}

export default GetGeneralChannelHandler;