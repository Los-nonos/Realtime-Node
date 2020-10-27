//import User from "./User";
import UserChannel from "./UserChannel";
//import ChannelIsPrivate from "../../Application/Exception/ChannelIsPrivated";
import Message from "./Message";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import User from "./User";
import ChannelIsPrivate from "../../Application/Exception/ChannelIsPrivated";

@Entity('channels')
class Channel {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public name: string;
  @Column()
  public private: boolean;
  @OneToMany(_type => UserChannel, userChannel => userChannel.channel)
  public userChannels: Array<UserChannel>;
  @OneToMany(_type => Message, message => message.channel)
  public messages: Array<Message>;

  public constructor(
    name: string,
    isPrivate: boolean,
    users: User[]
  ) {
    this.name = name;
    this.private = isPrivate;
    this.setUsers(users);
  }

  public getId(): number {
    return this.id;
  }

  public inviteUser(user: User) {
    this.userChannels.push(new UserChannel(user, this));
  }

  public addUser(user: User) {
    // @ts-ignore
    if (!this.userChannels.length) {
      this.userChannels = [];
    }

    if (!this.private) {
      throw new ChannelIsPrivate();
    }

    this.userChannels.push(new UserChannel(user, this));
  }

  public removeUser(user: User) {
    let index;

    // @ts-ignore
    for (const _user of this.userChannels) {
      if (_user.getUser().getId() === user.getId()) {
        index = this.userChannels.indexOf(_user);
      }
    }

    this.userChannels.splice(this.userChannels.indexOf(index), 1);
  }

  private setUsers(users: Array<User>) {
    if (!users) {
      return;
    }

    for (let user of users) {
      const userChannel = new UserChannel(user, this);
      this.userChannels.push(userChannel);
    }
  }

  public changeVisibility() {
    this.private = !this.private;
  }

  public isPrivate() {
    return this.private;
  }

  public getMessages(): Message[] {
    return this.messages;
  }

  public getName(): string {
    return this.name;
  }
}

export default Channel;