import { Container } from 'inversify';
import INTERFACES from "./interfaces.types";
import PublicRoutes from "../../API/Http/Routes";
import SubscribeToChannelBroadcastAction from '../../API/Broadcast/Actions/Channels/SubscribeToChannelAction';
import SubscribeToChannelAdapter from "../../API/Http/Adapters/Channels/SubscribeToChannelAdapter";
import SubscribeToChannelHandler from "../../Application/Commands/Handler/Channels/SubscribeToChannelHandler";
import {ChannelRepository} from "../../Domain/Interfaces/Repositories/ChannelRepository";
import MysqlChannelRepository from "../Persistence/Repositories/MysqlChannelRepository";
import {UserRepository} from "../../Domain/Interfaces/Repositories/UserRepository";
import MysqlUserRepository from "../Persistence/Repositories/MysqlUserRepository";
import SubscribeToChannelAction from "../../API/Http/Actions/Channels/SubscribeToChannelAction";
import {ValidationService} from "../../API/Http/Validations/Utils/ValidationService";
import JoiValidationService from "../../API/Http/Validations/Utils/joiValidationService";
import LoginAction from "../../API/Http/Actions/Auth/LoginAction";
import LoginAdapter from "../../API/Http/Adapters/Auth/LoginAdapter";
import LoginHandler from "../../Application/Queries/Handler/Auth/LoginHandler";
import {TokenService} from "../../Domain/Interfaces/Services/TokenService";
import JWTTokenService from "../../Application/Services/JWTTokenService";
import StoreUserAction from "../../API/Http/Actions/User/StoreUserAction";
import StoreUserAdapter from "../../API/Http/Adapters/User/StoreUserAdapter";
import StoreUserHandler from "../../Application/Commands/Handler/User/StoreUserHandler";
import Sockets from "../../API/Broadcast/Sockets";
import StoreMessageAction from "../../API/Broadcast/Actions/Messages/StoreMessageAction";
import GetGeneralChannelAction from "../../API/Broadcast/Actions/Channels/GetGeneralChannelAction";
import StoreMessageAdapter from "../../API/Broadcast/Adapters/Messages/StoreMessageAdapter";
import StoreMessageHandler from "../../Application/Commands/Handler/Messages/StoreMessageHandler";
import GetGeneralChannelHandler from "../../Application/Queries/Handler/Channels/GetGeneralChannelHandler";
import {MessageRepository} from "../../Domain/Interfaces/Repositories/MessageRepository";
import MysqlMessageRepository from "../Persistence/Repositories/MysqlMessageRepository";
import GetChannelsOfUserAction from "../../API/Broadcast/Actions/Channels/GetChannelsOfUserAction";
import GetChannelsOfUserHandler from "../../Application/Queries/Handler/Channels/GetChannelsOfUserHandler";

const DIContainer = new Container();

/**
 * Routes
 */
DIContainer.bind<PublicRoutes>(PublicRoutes);
DIContainer.bind<Sockets>(Sockets);

/**
 * Actions
 */
DIContainer.bind<SubscribeToChannelAction>(SubscribeToChannelAction).toSelf();
DIContainer.bind<LoginAction>(LoginAction).toSelf();
DIContainer.bind<StoreUserAction>(StoreUserAction).toSelf();
DIContainer.bind<StoreMessageAction>(StoreMessageAction).toSelf();
DIContainer.bind<GetGeneralChannelAction>(GetGeneralChannelAction).toSelf();
DIContainer.bind<SubscribeToChannelBroadcastAction>(SubscribeToChannelBroadcastAction).toSelf();
DIContainer.bind<GetChannelsOfUserAction>(GetChannelsOfUserAction).toSelf();

/**
 * Adapters
 */
DIContainer.bind<SubscribeToChannelAdapter>(SubscribeToChannelAdapter).toSelf();
DIContainer.bind<LoginAdapter>(LoginAdapter).toSelf();
DIContainer.bind<StoreUserAdapter>(StoreUserAdapter).toSelf();
DIContainer.bind<StoreMessageAdapter>(StoreMessageAdapter).toSelf();

/**
 * Handlers
 */
DIContainer.bind<SubscribeToChannelHandler>(SubscribeToChannelHandler).toSelf();
DIContainer.bind<LoginHandler>(LoginHandler).toSelf();
DIContainer.bind<StoreUserHandler>(StoreUserHandler).toSelf();
DIContainer.bind<StoreMessageHandler>(StoreMessageHandler).toSelf();
DIContainer.bind<GetGeneralChannelHandler>(GetGeneralChannelHandler).toSelf();
DIContainer.bind<GetChannelsOfUserHandler>(GetChannelsOfUserHandler).toSelf();

/**
 * Services
 */
DIContainer.bind<ValidationService>(INTERFACES.IValidation).to(JoiValidationService);
DIContainer.bind<TokenService>(INTERFACES.ITokenService).to(JWTTokenService);

/**
 * Repositories
 */
DIContainer.bind<ChannelRepository>(INTERFACES.IChannelRepository).to(MysqlChannelRepository);
DIContainer.bind<UserRepository>(INTERFACES.IUserRepository).to(MysqlUserRepository);
DIContainer.bind<MessageRepository>(INTERFACES.IMessageRepository).to(MysqlMessageRepository);

export default DIContainer;