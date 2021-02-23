import ICreateChatMessageDTO from '@modules/chats/dtos/ICreateChatMessageDTO';
import IChatMessagesRepository from '@modules/chats/repositories/IChatMessagesRepository';
import { getRepository, Repository } from 'typeorm';
import ChatMessage from '../schemas/ChatMessage';

class ChatMessagesRepository implements IChatMessagesRepository {
  private ormRepository: Repository<ChatMessage>;

  constructor() {
    this.ormRepository = getRepository(ChatMessage);
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
      order: { created_at: 'ASC' },
    });

    return chatMessages;
  }
}

export default ChatMessagesRepository;
