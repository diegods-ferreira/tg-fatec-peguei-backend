import ChatMessage from '@modules/chats/infra/typeorm/schemas/ChatMessage';
import IChatsRepository from '@modules/chats/repositories/IChatsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class SaveLastChatMessageSentService {
  constructor(
    @inject('ChatsRepository')
    private chatsRepository: IChatsRepository,
  ) {}

  public async execute(newMessage: ChatMessage): Promise<void> {
    const chat = await this.chatsRepository.findById(newMessage.chat_id);

    if (!chat) {
      throw new AppError('Chat not found!');
    }

    chat.last_message_text = newMessage.text;
    chat.last_message_sent_at = newMessage.created_at;
    chat.last_message_sent_by = newMessage.from;

    await this.chatsRepository.update(chat);
  }
}

export default SaveLastChatMessageSentService;
