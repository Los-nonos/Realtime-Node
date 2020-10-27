import User from "./User";
import Channel from "./Channel";
import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity('user_channels')
class UserChannel {
  @PrimaryGeneratedColumn()
  public id: number;
  @ManyToOne(_type => User, _user => _user.channels)
  public user: User;
  @ManyToOne(_type => Channel, _channel => _channel.userChannels)
  public channel: Channel;

  public constructor(user: User, channel: Channel) {
    this.user = user;
    this.channel = channel;
  }

  public getId(): number {
    return this.id;
  }

  public getUser() {
    return this.user;
  }

  public getChannel() {
    return this.channel;
  }
}

export default UserChannel;