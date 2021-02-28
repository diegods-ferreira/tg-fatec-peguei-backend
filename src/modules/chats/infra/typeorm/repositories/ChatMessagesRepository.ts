import ICreateChatMessageDTO from '@modules/chats/dtos/ICreateChatMessageDTO';
import IChatMessagesRepository from '@modules/chats/repositories/IChatMessagesRepository';
import { getMongoRepository, MongoRepository } from 'typeorm';
import ChatMessage from '../schemas/ChatMessage';

class ChatMessagesRepository implements IChatMessagesRepository {
  private ormRepository: MongoRepository<ChatMessage>;

  constructor() {
    this.ormRepository = getMongoRepository(ChatMessage, 'mongo');
  }

  public async create(data: ICreateChatMessageDTO): Promise<ChatMessage> {
    const chatMessage = this.ormRepository.create(data);

    await this.ormRepository.save(chatMessage);

    return chatMessage;
  }

  public async findByChatId(
    chat_id: string,
  ): Promise<ChatMessage[] | undefined> {
    const chatMessages = this.ormRepository.find({
      where: { chat_id },
      order: { created_at: 'DESC' },
    });

    return chatMessages;
  }
}

export default ChatMessagesRepository;
