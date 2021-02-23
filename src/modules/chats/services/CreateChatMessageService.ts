import { inject, injectable } from 'tsyringe';
import ChatMessage from '../infra/typeorm/schemas/ChatMessage';
import IChatMessagesRepository from '../repositories/IChatMessagesRepository';

interface IRequest {
  from: string;
  to: string;
  text: string;
}

@injectable()
class CreateChatMessageService {
  constructor(
    @inject('ChatMessagesRepository')
    private chatMessagesRepository: IChatMessagesRepository,
  ) {}

  public async execute({ from, to, text }: IRequest): Promise<ChatMessage> {
    const chatMessage = await this.chatMessagesRepository.create({
      from,
      to,
      text,
    });

    return chatMessage;
  }
}

export default CreateChatMessageService;
