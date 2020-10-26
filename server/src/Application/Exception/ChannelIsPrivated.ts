import ApplicationException from "./ApplicationException";

class ChannelIsPrivate extends ApplicationException {
  constructor(message: string = '') {
    super(message);
  }
}

export default ChannelIsPrivate;