import { inject, injectable } from 'tsyringe';
import ChatMessage from '../infra/typeorm/schemas/ChatMessage';
import IChatMessagesRepository from '../repositories/IChatMessagesRepository';

interface IRequest {
  chat_id: string;
}

@injectable()
class FindChatMessageByChatIdService {
  constructor(
    @inject('ChatMessagesRepository')
    private chatMessagesRepository: IChatMessagesRepository,
  ) {}

  public async execute({
    chat_id,
  }: IRequest): Promise<ChatMessage[] | undefined> {
    const chatMessages = await this.chatMessagesRepository.findByChatId(
      chat_id,
    );

    return chatMessages;
  }
}

export default FindChatMessageByChatIdService;
