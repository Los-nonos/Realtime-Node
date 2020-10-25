import {inject} from "inversify";
import StoreUserAction from "../Actions/User/StoreUserAction.js";
import LoginAction from "../Actions/Auth/LoginAction.js";
import {Request, Response, Router} from "express";
import {asyncMiddleware} from "../Middlewares/asyncMiddleware.js";

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const channels = [
  {
    name: 'general',
    messages: [{
      id: 1,
      text: "Hola soy un mensaje",
      author: "Carlos Azaustre"
      }
    ],
    participants: 0
  },
]

app.use(express.static('public'));


app.get('/hello', function(req, res) {
  const {name} = req.query;

  if (!name) {
    res.status(200).json(channels);
  }

  const channel = channels.find(channel => {
    return channel.name === name;
  });

  if (!channel) {
    res.status(404).send(`not found channel with name: ${name}`);
  }

  res.status(200).json(channel);
});

class PublicRoutes {
  private storeUserAction: StoreUserAction;
  private loginAction: LoginAction;
  private router: Router;
  constructor(
    @inject(StoreUserAction) storeUserAction: StoreUserAction,
    @inject(LoginAction) loginAction: LoginAction,
  ) {
    this.router = Router();
    this.storeUserAction = storeUserAction;
    this.loginAction = loginAction;
    this.setRoutes();
  }

  private setRoutes() {
    this.router.post('/login', asyncMiddleware(async (req: Request, res: Response) => {
      await this.loginAction.execute(req, res);
    }));

    this.router.post('/register', asyncMiddleware(async (req: Request, res: Response) => {
      await this.storeUserAction.execute(req, res);
    }))
  }

  public getRoutes() {
    return this.router;
  }
}

io.sockets.on('connection', function(socket) {
  console.log('Alguien se ha conectado con Sockets');
  socket.emit('general', channels[0].messages);

  ++channels[0].participants;

  socket.on('subscribe', function(room) {
    console.log("Joining to room ", room);

    let channel = channels.find(channel => {
      return channel.name === room;
    });

    if (!channel) {
      channel = { name: room, messages: [], participants: 0 };
      channels.push(channel);
    }

    ++channel.participants;

    socket.join(channel.name);
  });

  socket.on('new-message', function(data) {
    if (!data.room) {
      channels[0].messages.push(data);
      io.sockets.emit('general', channels[0].messages);
      return;
    }

    console.log('sending room post', data.room);
    const channel = channels.find(channel => {
      return channel.name === data.room;
    });
    console.log(!!channel);
    if (!channel) {
      return;
    }
    channel.messages.push(data);
    io.sockets.in(channel.name).emit('private-message', channel.messages);
  });
});

server.listen(8080, function() {
  console.log("Servidor corriendo en http://localhost:8080");
});

export default PublicRoutes;