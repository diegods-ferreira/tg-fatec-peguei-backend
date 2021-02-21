import { inject, injectable } from 'tsyringe';
import Chat from '../infra/typeorm/entities/Chat';
import IChatsRepository from '../repositories/IChatsRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListChatsByUserIdService {
  constructor(
    @inject('ChatsRepository')
    private chatsRepository: IChatsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Chat[] | undefined> {
    const chats = await this.chatsRepository.findByUserId(user_id);

    return chats;
  }
}

export default ListChatsByUserIdService;
