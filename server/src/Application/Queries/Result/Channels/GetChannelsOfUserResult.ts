import Channel from "../../../../Domain/Entities/Channel";

class GetChannelsOfUserResult {
  private channels: Channel[];
  public constructor(channels) {
    this.channels = channels;
  }

  public getChannels(): Channel[] {
    return this.channels;
  }
}

export default GetChannelsOfUserResult;