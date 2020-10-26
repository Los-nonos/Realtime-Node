class SubscribeToChannelCommand {
  private channelId: number;
  private userId: number;

  public constructor(channelId: number, userId: number) {
    this.channelId = channelId;
    this.userId = userId;
  }

  public getChannelId(): number {
    return this.channelId;
  }

  public getUserId(): number {
    return this.userId;
  }
}

export default SubscribeToChannelCommand;