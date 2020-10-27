import IOSockets from 'socket.io';
import {inject, injectable} from "inversify";
import SubscribeToChannelAction from "../Actions/Channels/SubscribeToChannelAction";
import StoreMessageAction from "../Actions/Messages/StoreMessageAction";
import GetGeneralChannelAction from "../Actions/Channels/GetGeneralChannelAction";
import GetChannelsOfUserAction from "../Actions/Channels/GetChannelsOfUserAction";


@injectable()
class Sockets {
  private app: any;
  private io: any;
  // @ts-ignore
  private subscribeToChannel: SubscribeToChannelAction;
  // @ts-ignore
  private storeMessage: StoreMessageAction;
  // @ts-ignore
  private generalChannel: GetGeneralChannelAction;
  // @ts-ignore
  private getChannelsOfUser: GetChannelsOfUserAction;

  constructor(
    @inject(StoreMessageAction) storeMessage: StoreMessageAction,
    @inject(SubscribeToChannelAction) subscribeToChannel: SubscribeToChannelAction,
    @inject(GetGeneralChannelAction) generalChannel: GetGeneralChannelAction,
    @inject(GetChannelsOfUserAction) getChannelsOfUser: GetChannelsOfUserAction,
  ) {

    this.subscribeToChannel = subscribeToChannel;
    this.storeMessage = storeMessage;
    this.generalChannel = generalChannel;
    this.getChannelsOfUser = getChannelsOfUser;
  }

  public up(http: any) {
    this.app = http;
    this.io = new IOSockets(this.app);
    this.io.sockets.on('connection', (socket) => this.onConnection(socket, this));
  }

  private onConnection(socket, context) {
    console.log('Alguien se ha conectado con Sockets');
    context.generalChannel.execute().then(result => {
      socket.emit('messages', result.getMessages());
    }).catch(error => {
      console.error(error);
      socket.emit('error', error);
    });


    socket.on('subscribe', (room) => this.Subscribe(room, socket, context));

    socket.on('on-connection', (userId) => this.subscribeToChannelsOfUser(userId, socket, context));

    socket.on('new-message', (data) => this.NewMessage(data, context));
  }

  private Subscribe(room, socket, context) {
    console.log("Joining to room ", room);
    context.subscribeToChannel.execute(room).then(channel => {
      socket.join(channel);
    }).catch(error => {
      socket.emit('error', 'An error has occurred' + error);
    });
  }

  private NewMessage(data, context) {
    context.storeMessage.execute(data).then(result => {
      if (!result.isPrivate()) {
        context.io.emit('messages', result.getMessages());
      } else {
        console.log('hello, sending private message');
        context.io.in(result.getId()).emit('private-message', result.getMessages());
      }
    }).catch(error => {
      console.error('An error has ocurred', error);
    });
  }

  private subscribeToChannelsOfUser(userId: any, socket: any, context: any) {
    context.getChannelsOfUser.execute(userId).then(result => {
      console.log(result.length);
      result.map(channel => {
        socket.join(channel.id);
      });
      socket.emit('general', {channels: result});
    }).catch(error => {
      socket.emit('error', 'An error has occurred' + error);
    });
  }
}

export default Sockets;