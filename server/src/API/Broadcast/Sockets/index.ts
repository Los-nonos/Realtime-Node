import IOSockets from 'socket.io';
import {inject, injectable} from "inversify";
import SubscribeToChannelAction from "../Actions/Channels/SubscribeToChannelAction";
import StoreMessageAction from "../Actions/Messages/StoreMessageAction";
import GetGeneralChannelAction from "../Actions/Channels/GetGeneralChannelAction";


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

  constructor(
    @inject(StoreMessageAction) storeMessage: StoreMessageAction,
    @inject(SubscribeToChannelAction) subscribeToChannel: SubscribeToChannelAction,
    @inject(GetGeneralChannelAction) generalChannel: GetGeneralChannelAction
  ) {

    this.subscribeToChannel = subscribeToChannel;
    this.storeMessage = storeMessage;
    this.generalChannel = generalChannel;
  }

  public up(http: any) {
    this.app = http;
    this.io = new IOSockets(this.app);
    this.io.sockets.on('connection', (socket) => this.onConnection(socket, this));
  }

  private onConnection(socket, context) {
    console.log('Alguien se ha conectado con Sockets');
    context.generalChannel.execute().then(result => {
      socket.emit('general', result.getMessages());
    }).catch(error => {
      console.error(error);
      socket.emit('general', error);
    });


    socket.on('subscribe', (room) => this.Subscribe(room, socket, context));

    socket.on('new-message', (data) => this.NewMessage(data, context));
  }

  private Subscribe(room, socket, context) {
    console.log("Joining to room ", room);
    context.subscribeToChannel.execute(room).then(channel => {
      socket.join(channel);
    }).catch(error => {
      socket.emit('An error has occurred', error);
    });
  }

  private NewMessage(data, context) {
    context.storeMessage.execute(data).then(result => {
      if (result.getChannel().isPrivate()) {
        context.io.sockets.emit('general', result.getChannelMessages());
      } else {
        context.io.sockets.in(result.getChannelName()).emit('private-message', result.getChannelMessages());
      }
    }).catch(error => {
      console.error('An error has ocurred', error);
    });

    console.log('sending room post', data.room);

  }
}

export default Sockets;