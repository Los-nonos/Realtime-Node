import User from "./User";
import Channel from "./Channel";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
class Message {
  @PrimaryGeneratedColumn()
  public id: number;
  //@ManyToOne(_type => User)
  public user: User;
  //@ManyToOne(_type => Channel)
  public channel: Channel;
  @Column()
  public content: string;

  public constructor(user: User, channel: Channel, content: string) {
    this.user = user;
    this.channel = channel;
    this.content = content;
  }
  /*
    public getId(): number {
      return this.id;
    }

    public getContent() {
      return {user: this.user.getName(), content: this.content};
    }

    public getChannelName(): string {
      return this.channel.getName();
    }

    public getChannelMessages() {
      const contents = [];
      // @ts-ignore
      for (let i = 0; i < this.getChannelMessages().length; i++) {
        contents.push(this.getChannelMessages()[i].getContent());
      }
      return contents;
    }

    public getChannel() {
      return this.channel;
    }*/
  public getChannelName() {
    return this.channel.name;
  }

  public getChannelMessages() {
    return this.channel.messages;
  }

  public getChannel() {
    return this.channel;
  }
}

export default Message;