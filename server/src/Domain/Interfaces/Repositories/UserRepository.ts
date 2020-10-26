import User from "../../Entities/User";

export interface UserRepository {
  findOneById(id: number): Promise<User>;
  findOneByEmail(email: string): Promise<User>;
  persist(user: User): Promise<User>;
}