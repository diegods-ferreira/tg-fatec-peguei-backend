import { inject, injectable } from 'tsyringe';
import Chat from '../infra/typeorm/entities/Chat';
import IChatsRepository from '../repositories/IChatsRepository';

interface IRequest {
  id: string;
}

@injectable()
class FindChatByIdService {
  constructor(
    @inject('ChatsRepository')
    private chatsRepository: IChatsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Chat | undefined> {
    const chat = await this.chatsRepository.findById(id);

    return chat;
  }
}

export default FindChatByIdService;
