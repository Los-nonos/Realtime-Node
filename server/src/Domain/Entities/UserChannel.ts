import User from "./User";
import Channel from "./Channel";
import {PrimaryGeneratedColumn} from "typeorm";

class UserChannel {
  @PrimaryGeneratedColumn()
  public id: number;
  //@ManyToOne(_type => User)
  public user: User;
  //@ManyToOne(_type => Channel)
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