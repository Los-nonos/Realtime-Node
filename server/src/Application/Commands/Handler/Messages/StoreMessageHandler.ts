import StoreMessageCommand from "../../Command/Messages/StoreMessageCommand";
import INTERFACES from "../../../../Infrastructure/DI/interfaces.types";
import {inject, injectable} from "inversify";
import {UserRepository} from "../../../../Domain/Interfaces/Repositories/UserRepository";
import {ChannelRepository} from "../../../../Domain/Interfaces/Repositories/ChannelRepository";
import Message from "../../../../Domain/Entities/Message";
import {MessageRepository} from "../../../../Domain/Interfaces/Repositories/MessageRepository";

@injectable()
class StoreMessageHandler {
  private messageRepository: MessageRepository;
  private userRepository: UserRepository;
  private channelRepository: ChannelRepository;
  constructor(
    @inject(INTERFACES.IMessageRepository) messageRepository: MessageRepository,
    @inject(INTERFACES.IUserRepository) userRepository: UserRepository,
    @inject(INTERFACES.IChannelRepository) channelRepository: ChannelRepository
  ) {
    this.messageRepository = messageRepository;
    this.userRepository = userRepository;
    this.channelRepository = channelRepository;
  }

  public async execute(command: StoreMessageCommand): Promise<Message> {
    const channel = await this.channelRepository.findOneById(command.getChannelId());

    const user = await this.userRepository.findOneById(command.getUserId());

    const message = new Message(user, channel, command.getContent());

    return await this.messageRepository.persist(message);
  }
}

export default StoreMessageHandler;