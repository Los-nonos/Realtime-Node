import GetChannelsOfUserResult from "../../../../Application/Queries/Result/Channels/GetChannelsOfUserResult";

class GetChannelsOfUserPresenter {
  private result: GetChannelsOfUserResult;
  public constructor(result: GetChannelsOfUserResult) {
    this.result = result;
  }

  public getData() {
    return this.result.getChannels();
  }
}

export default GetChannelsOfUserPresenter;