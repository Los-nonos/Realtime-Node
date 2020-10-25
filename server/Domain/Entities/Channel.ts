import User from "./User.js";
import UserChannel from "./UserChannel.js";
import ChannelIsPrivate from "../../Application/Exception/ChannelIsPrivated.js";
import Message from "./Message.js";

class Channel {
  private id: number;
  private name: string;
  private private: boolean;
  private users: UserChannel[];
  private messages: Message[];

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
    this.users.push(new UserChannel(user, this));
  }

  public addUser(user: User) {
    if(!this.users.length) {
      this.users = [];
    }

    if (!this.private) {
      throw new ChannelIsPrivate();
    }

    this.users.push(new UserChannel(user, this));
  }

  public removeUser(user: User) {
    let index;

    for (const _user of this.users) {
      if (_user.getUser().getId() === user.getId()) {
        index = this.users.indexOf(_user);
      }
    }

    this.users.splice(this.users.indexOf(index), 1);
  }

  private setUsers(users: User[]) {
    if (!this.users.length) {
      this.users = [];
    }

    for (const user of users) {
      const userChannel = new UserChannel(user, this);
      this.users.push(userChannel);
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