import StoreUserCommand from "../../Command/User/StoreUserCommand";
import User from "../../../../Domain/Entities/User";
import {inject, injectable} from "inversify";
import INTERFACES from "../../../../Infrastructure/DI/interfaces.types";
import {UserRepository} from "../../../../Domain/Interfaces/Repositories/UserRepository";

@injectable()
class StoreUserHandler {
  private userRepository: UserRepository;
  constructor(@inject(INTERFACES.IUserRepository) userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(command: StoreUserCommand) {
    const user = new User(command.getName(), command.getSurname(), command.getEmail(), command.getPassword());

    return await this.userRepository.persist(user);
  }
}

export default StoreUserHandler;