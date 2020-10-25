class StoreMessageCommand {
  private userId: number;
  private channelId: number;
  private content: string;
  constructor(userId: number, channelId: number, content: string) {
    this.userId = userId;
    this.channelId = channelId;
    this.content = content;
  }

  public getUserId(): number {
    return this.userId;
  }

  public getChannelId(): number {
    return this.channelId;
  }

  public getContent(): string {
    return this.content;
  }
}

export default StoreMessageCommand;