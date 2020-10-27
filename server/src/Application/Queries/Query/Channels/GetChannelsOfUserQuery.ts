class GetChannelsOfUserQuery {
  private userId: number;
  public constructor(userId: number) {
    this.userId = userId;
  }

  public getUserId(): number {
    return this.userId;
  }
}

export default GetChannelsOfUserQuery;