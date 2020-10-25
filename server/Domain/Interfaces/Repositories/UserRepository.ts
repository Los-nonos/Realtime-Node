import User from "../../Entities/User";

export interface UserRepository {
  findOneById(id: number): Promise<User>;
}