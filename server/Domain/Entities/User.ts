import UserChannel from "./UserChannel.js";

class User {
  private id: number;
  private name: string;
  private surname: string;
  private email: string;
  private password: string;
  private channels: UserChannel[];

  public constructor(name: string, surname: string, email: string, password: string) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
  }
  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getChannels(): UserChannel[] {
    return this.channels;
  }

  public getSurname(): string {
    return this.surname;
  }

  public getEmail(): string {
    return this.email;
  }

  public checkPassword(password: string) {
    return this.password === password;
  }
}

export default User;