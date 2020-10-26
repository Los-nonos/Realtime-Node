import Message from "../../Entities/Message";

export interface MessageRepository {
  persist(message: Message): Promise<Message>;
}