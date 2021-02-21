import { inject, injectable } from 'tsyringe';
import Chat from '../infra/typeorm/entities/Chat';
import IChatsRepository from '../repositories/IChatsRepository';

interface IRequest {
  order_id: string;
}

@injectable()
class FindChatByOrderIdService {
  constructor(
    @inject('ChatsRepository')
    private chatsRepository: IChatsRepository,
  ) {}

  public async execute({ order_id }: IRequest): Promise<Chat | undefined> {
    const chat = await this.chatsRepository.findByOrderId(order_id);

    return chat;
  }
}

export default FindChatByOrderIdService;
