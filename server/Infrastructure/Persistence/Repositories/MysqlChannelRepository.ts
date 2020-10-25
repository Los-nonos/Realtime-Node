import {ChannelRepository} from "../../../Domain/Interfaces/Repositories/ChannelRepository.js";
import TypeRepository from "./TypeRepository.js";
import Channel from "../../../Domain/Entities/Channel.js";
import EntityNotFound from "../../../Application/Exception/EntityNotFound.js";
import {injectable} from "inversify";

@injectable()
class MysqlChannelRepository extends TypeRepository implements ChannelRepository {
  public async findOneByName(name: string): Promise<Channel> {
    const channel = await this.repository(Channel).findOne({name});

    if (!channel) {
      throw new EntityNotFound(`Channel with name: ${name} not found`);
    }

    return channel;
  }

  public async findOneById(id: number): Promise<Channel> {
    const channel = await this.repository(Channel).findOne(id);

    if (!channel) {
      throw new EntityNotFound(`Channel with id: ${id} not found`);
    }

    return channel;
  }

  public async persist(channel: Channel): Promise<Channel> {
    return await this.repository(Channel).save(channel);
  }

}

export default MysqlChannelRepository;