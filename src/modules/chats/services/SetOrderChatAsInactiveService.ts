import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Chat from '../infra/typeorm/entities/Chat';
import IChatsRepository from '../repositories/IChatsRepository';

interface IRequest {
  order_id: string;
}

@injectable()
class SetOrderChatAsInactiveService {
  constructor(
    @inject('ChatsRepository')
    private chatsRepository: IChatsRepository,
  ) {}

  public async execute({ order_id }: IRequest): Promise<Chat | undefined> {
    const chat = await this.chatsRepository.findByOrderId(order_id);

    if (!chat) {
      throw new AppError('Chat not found.');
    }

    Object.assign(chat, { active: false });

    await this.chatsRepository.update(chat);

    return chat;
  }
}

export default SetOrderChatAsInactiveService;
