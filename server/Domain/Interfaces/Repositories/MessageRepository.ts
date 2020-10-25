import Message from "../../Entities/Message.js";

export interface MessageRepository {
  persist(message: Message): Promise<Message>;
}