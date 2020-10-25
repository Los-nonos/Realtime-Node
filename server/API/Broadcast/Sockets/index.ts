import {Application} from 'express';
import httpServer from 'http';
import IOSockets from 'socket.io';
import {inject, injectable} from "inversify";
import SubscribeToChannelAction from "../Actions/Channels/SubscribeToChannelAction.js";
import StoreMessageAction from "../Actions/Messages/StoreMessageAction.js";
import GetGeneralChannelAction from "../Actions/Channels/GetGeneralChannelAction.js";


@injectable()
class Sockets {
  private app: Application;
  private server: any;
  private io: any;
  private subscribeToChannel: SubscribeToChannelAction;
  private storeMessage: StoreMessageAction;
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

  public up(app: Application) {
    this.app = app;
    this.server = new httpServer.Server(this.app);
    this.io = new IOSockets(this.server);
    this.io.sockets.on('connection', this.onConnection);
  }

  private onConnection(socket) {
    console.log('Alguien se ha conectado con Sockets');
    this.generalChannel.execute().then(result => {
      socket.emit('general', result.getMessages());
    }).catch(error => {
      socket.emit('general', error);
    });


    socket.on('subscribe', (room) => this.Subscribe(room, socket));

    socket.on('new-message', this.NewMessage);
  }

  private Subscribe(room, socket) {
    console.log("Joining to room ", room);
    this.subscribeToChannel.execute(room).then(channel => {
      socket.join(channel);
    }).catch(error => {
      socket.emit('An error has occurred', error);
    });
  }

  private NewMessage(data) {
    this.storeMessage.execute(data).then(result => {
      if (result.getChannel().isPrivate()) {
        this.io.sockets.emit('general', result.getChannelMessages());
      } else {
        this.io.sockets.in(result.getChannelName()).emit('private-message', result.getChannelMessages());
      }
    }).catch(error => {
      console.error('An error has ocurred', error);
    });

    console.log('sending room post', data.room);

  }
}

export default Sockets;