import TypeRepository from "./TypeRepository.js";
import {UserRepository} from "../../../Domain/Interfaces/Repositories/UserRepository.js";
import User from "../../../Domain/Entities/User.js";
import {injectable} from "inversify";

@injectable()
class MysqlUserRepository extends TypeRepository implements UserRepository {
  public async findOneById(id: number): Promise<User> {
    return await this.repository(User).findOne(id);
  }

  public async findOneByEmail(email: string): Promise<User> {
    return await this.repository(User).findOne({email});
  }
}

export default MysqlUserRepository;