import User from "./User.js";
import Channel from "./Channel.js";

class UserChannel {
  private user: User;
  private channel: Channel;
  public constructor(user: User, channel: Channel) {
    this.user = user;
    this.channel = channel;
  }

  public getUser() {
    return this.user;
  }

  public getChannel() {
    return this.channel;
  }
}

export default UserChannel;