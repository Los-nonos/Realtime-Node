import User from "./User.js";
import Channel from "./Channel.js";

class Message {
  private user: User;
  private channel: Channel;
  private content: string;

  public constructor(user: User, channel: Channel, content: string) {
    this.user = user;
    this.channel = channel;
    this.content = content;
  }

  public getContent() {
    return { user: this.user.getName(), content: this.content };
  }

  public getChannelName(): string {
    return this.channel.getName();
  }

  public getChannelMessages() {
    const contents = [];
    for (const messages of this.channel.getMessages()) {
      contents.push(messages.getContent());
    }
    return contents;
  }

  public getChannel() {
    return this.channel;
  }
}

export default Message;