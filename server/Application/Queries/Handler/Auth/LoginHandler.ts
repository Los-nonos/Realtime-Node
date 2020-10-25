import LoginQuery from "../../Query/Auth/LoginQuery.js";
import LoginResult from "../../Result/Auth/LoginResult.js";
import {inject, injectable} from "inversify";
import INTERFACES from "../../../../Infrastructure/DI/interfaces.types.js";
import {UserRepository} from "../../../../Domain/Interfaces/Repositories/UserRepository.js";
import {TokenService} from "../../../../Domain/Interfaces/Services/TokenService.js";
import PasswordNotMatch from "../../../Exception/PasswordNotMatch.js";

@injectable()
class LoginHandler {
  private userRepository: UserRepository;
  private tokenService: TokenService;
  constructor(
    @inject(INTERFACES.IUserRepository) userRepository: UserRepository,
    @inject(INTERFACES.ITokenService) tokenService: TokenService,
  ) {
    this.userRepository = userRepository;
    this.tokenService = tokenService;
  }

  public async execute(command: LoginQuery): Promise<LoginResult> {
    const user = await this.userRepository.findOneByEmail(command.getEmail());

    if (!user.checkPassword(command.getPassword())) {
      throw new PasswordNotMatch(
        `Wrong password on User with username: ${command.getEmail()}`,
      );
    }

    const token = this.tokenService.generateTokenFromPayload({
      userId: user.getId(),
      username: user.getEmail(),
    });

    return new LoginResult(user, token);
  }
}

export default LoginHandler;