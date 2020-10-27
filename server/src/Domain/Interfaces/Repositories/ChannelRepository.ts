import Channel from "../../Entities/Channel";

export interface ChannelRepository {
  findOneByName(name: string): Promise<Channel>;
  findOneById(id: number): Promise<Channel>;
  persist(channel: Channel): Promise<Channel>;
  findByUserId(userId: number): Promise<Channel[]>;
}