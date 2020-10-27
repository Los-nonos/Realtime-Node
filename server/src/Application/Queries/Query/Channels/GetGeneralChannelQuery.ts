class GetGeneralChannelQuery {
  private channelId?: number;
  constructor(channelId?: number) {
    this.channelId = channelId;
  }

  public getChannelId() {
    return this.channelId;
  }
}

export default GetGeneralChannelQuery;