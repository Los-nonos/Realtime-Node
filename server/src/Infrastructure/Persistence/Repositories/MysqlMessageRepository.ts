import TypeRepository from "./TypeRepository";
import {MessageRepository} from "../../../Domain/Interfaces/Repositories/MessageRepository";
import Message from "../../../Domain/Entities/Message";
import {injectable} from "inversify";

@injectable()
class MysqlMessageRepository extends TypeRepository implements MessageRepository {
  public async persist(message: Message): Promise<Message> {
    return await this.repository(Message).save(message);
  }

}

export default MysqlMessageRepository;