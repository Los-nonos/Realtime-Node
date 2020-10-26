import TypeRepository from "./TypeRepository";
import {UserRepository} from "../../../Domain/Interfaces/Repositories/UserRepository";
import User from "../../../Domain/Entities/User";
import {injectable} from "inversify";

@injectable()
class MysqlUserRepository extends TypeRepository implements UserRepository {
  public async findOneById(id: number): Promise<User> {
    return await this.repository(User).findOne(id);
  }

  public async findOneByEmail(email: string): Promise<User> {
    return await this.repository(User).findOne({email});
  }

  public async persist(user: User): Promise<User> {
    return await this.repository(User).save(user);
  }
}

export default MysqlUserRepository;