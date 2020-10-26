import {ChannelRepository} from "../../../Domain/Interfaces/Repositories/ChannelRepository";
import TypeRepository from "./TypeRepository";
import Channel from "../../../Domain/Entities/Channel";
import EntityNotFound from "../../../Application/Exception/EntityNotFound";
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