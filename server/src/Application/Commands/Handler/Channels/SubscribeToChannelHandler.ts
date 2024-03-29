import SubscribeToChannelCommand from "../../Command/Channels/SubscribeToChannelCommand";
import {inject, injectable} from "inversify";
import INTERFACES from "../../../../Infrastructure/DI/interfaces.types";
import {ChannelRepository} from "../../../../Domain/Interfaces/Repositories/ChannelRepository";
import {UserRepository} from "../../../../Domain/Interfaces/Repositories/UserRepository";
import Channel from "../../../../Domain/Entities/Channel";

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