import ChatMessage from '@modules/chats/infra/typeorm/schemas/ChatMessage';
import IChatMessagesRepository from '@modules/chats/repositories/IChatMessagesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class LoadPreviousChatMessagesService {
  constructor(
    @inject('ChatMessagesRepository')
    private chatMessagesRepository: IChatMessagesRepository,
  ) {}

  public async execute(chat_id: string): Promise<ChatMessage[] | undefined> {
    const chatMessages = await this.chatMessagesRepository.findByChatId(
      chat_id,
    );

    return chatMessages;
  }
}

export default LoadPreviousChatMessagesService;
