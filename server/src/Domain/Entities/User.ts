import UserChannel from "./UserChannel";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('users')
class User {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public name: string;
  @Column()
  public surname: string;
  @Column()
  public email: string;
  @Column()
  public password: string;
  //@OneToMany(_type => UserChannel, channel => channel.user)
  public channels: UserChannel[];

  public constructor(name: string, surname: string, email: string, password: string) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
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

  public getId() {
    return this.id;
  }
}

export default User;