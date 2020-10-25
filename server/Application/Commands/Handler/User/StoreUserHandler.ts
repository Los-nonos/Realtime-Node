import StoreUserCommand from "../../Command/User/StoreUserCommand.js";
import User from "../../../../Domain/Entities/User.js";
import {inject} from "inversify";
import INTERFACES from "../../../../Infrastructure/DI/interfaces.types.js";
import {UserRepository} from "../../../../Domain/Interfaces/Repositories/UserRepository.js";

class StoreUserHandler {
  private userRepository: UserRepository;
  constructor(@inject(INTERFACES.IUserRepository) userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(command: StoreUserCommand) {
    const user = new User(command.getName(), command.getSurname(), command.getEmail(), command.getPassword());

    await this.userRepository.persist(user);
  }
}

export default StoreUserHandler;