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

const DIContainer = new Container();

/**
 * Routes
 */
DIContainer.bind<PublicRoutes>(PublicRoutes);

/**
 * Actions
 */
DIContainer.bind<SubscribeToChannelAction>(SubscribeToChannelAction).toSelf();


/**
 * Adapters
 */
DIContainer.bind<SubscribeToChannelAdapter>(SubscribeToChannelAdapter).toSelf();

/**
 * Handlers
 */
DIContainer.bind<SubscribeToChannelHandler>(SubscribeToChannelHandler).toSelf();

/**
 * Services
 */
DIContainer.bind<ValidationService>(INTERFACES.IValidation).to(JoiValidationService);

/**
 * Repositories
 */
DIContainer.bind<ChannelRepository>(INTERFACES.IChannelRepository).to(MysqlChannelRepository);
DIContainer.bind<UserRepository>(INTERFACES.IUserRepository).to(MysqlUserRepository);

export default DIContainer;