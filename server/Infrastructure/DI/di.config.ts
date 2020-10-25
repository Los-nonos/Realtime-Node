import { Container } from 'inversify';
import INTERFACES from "./interfaces.types";
import PublicRoutes from "../../API/Http/Routes";
import SubscribeToChannelAdapter from "../../API/Http/Adapters/Channels/SubscribeToChannelAdapter.js";
import SubscribeToChannelHandler from "../../Application/Commands/Handler/Channels/SubscribeToChannelHandler.js";
import {ChannelRepository} from "../../Domain/Interfaces/Repositories/ChannelRepository.js";
import MysqlChannelRepository from "../Persistence/Repositories/MysqlChannelRepository.js";
import {UserRepository} from "../../Domain/Interfaces/Repositories/UserRepository.js";
import MysqlUserRepository from "../Persistence/Repositories/MysqlUserRepository.js";
import SubscribeToChannelAction from "../../API/Http/Actions/Channels/SubscribeToChannelAction.js";
import {ValidationService} from "../../API/Http/Validations/Utils/ValidationService.js";
import JoiValidationService from "../../API/Http/Validations/Utils/joiValidationService.js";
import LoginAction from "../../API/Http/Actions/Auth/LoginAction.js";
import LoginAdapter from "../../API/Http/Adapters/Auth/LoginAdapter.js";
import LoginHandler from "../../Application/Queries/Handler/Auth/LoginHandler.js";
import {TokenService} from "../../Domain/Interfaces/Services/TokenService.js";
import JWTTokenService from "../../Application/Services/JWTTokenService.js";
import StoreUserAction from "../../API/Http/Actions/User/StoreUserAction.js";
import StoreUserAdapter from "../../API/Http/Adapters/User/StoreUserAdapter.js";
import StoreUserHandler from "../../Application/Commands/Handler/User/StoreUserHandler.js";

const DIContainer = new Container();

/**
 * Routes
 */
DIContainer.bind<PublicRoutes>(PublicRoutes);

/**
 * Actions
 */
DIContainer.bind<SubscribeToChannelAction>(SubscribeToChannelAction).toSelf();
DIContainer.bind<LoginAction>(LoginAction).toSelf();
DIContainer.bind<StoreUserAction>(StoreUserAction).toSelf();

/**
 * Adapters
 */
DIContainer.bind<SubscribeToChannelAdapter>(SubscribeToChannelAdapter).toSelf();
DIContainer.bind<LoginAdapter>(LoginAdapter).toSelf();
DIContainer.bind<StoreUserAdapter>(StoreUserAdapter).toSelf();

/**
 * Handlers
 */
DIContainer.bind<SubscribeToChannelHandler>(SubscribeToChannelHandler).toSelf();
DIContainer.bind<LoginHandler>(LoginHandler).toSelf();
DIContainer.bind<StoreUserHandler>(StoreUserHandler).toSelf();

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

export default DIContainer;