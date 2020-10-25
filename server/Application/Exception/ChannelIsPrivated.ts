import ApplicationException from "./ApplicationException.js";

class ChannelIsPrivate extends ApplicationException {
  constructor(message: string = '') {
    super(message);
  }
}

export default ChannelIsPrivate;