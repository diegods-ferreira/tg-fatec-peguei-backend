import ICreateChatMessageDTO from '../dtos/ICreateChatMessageDTO';
import ChatMessage from '../infra/typeorm/schemas/ChatMessage';

export default interface IChatMessagesRepository {
  create(data: ICreateChatMessageDTO): Promise<ChatMessage>;
  findByChatId(chat_id: string): Promise<ChatMessage[] | undefined>;
}
