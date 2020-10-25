import SubscribeToChannelCommand from "../../Command/Channels/SubscribeToChannelCommand.js";
import {inject, injectable} from "inversify";
import INTERFACES from "../../../../Infrastructure/DI/interfaces.types.js";
import {ChannelRepository} from "../../../../Domain/Interfaces/Repositories/ChannelRepository.js";
import {UserRepository} from "../../../../Domain/Interfaces/Repositories/UserRepository.js";
import Channel from "../../../../Domain/Entities/Channel.js";

@injectable()
class SubscribeToChannelHandler {
  private channelRepository: ChannelRepository;
  private userRepository: UserRepository;
  public constructor(
    @inject(INTERFACES.IChannelRepository) channelRepository: ChannelRepository,
    @inject(INTERFACES.IUserRepository) userRepository: UserRepository
  ) {
    this.channelRepository = channelRepository;
    this.userRepository = userRepository;
  }

  public async execute(command: SubscribeToChannelCommand): Promise<Channel> {
    const user = await this.userRepository.findOneById(command.getUserId());

    const channel = await this.channelRepository.findOneById(command.getChannelId());

    channel.addUser(user);

    return await this.channelRepository.persist(channel);
  }
}

export default SubscribeToChannelHandler;