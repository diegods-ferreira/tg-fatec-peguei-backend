import ICreateChatDTO from '@modules/chats/dtos/ICreateChatDTO';
import IChatsRepository from '@modules/chats/repositories/IChatsRepository';
import { getRepository, Repository } from 'typeorm';
import Chat from '../entities/Chat';

class ChatsRepository implements IChatsRepository {
  private ormRepository: Repository<Chat>;

  constructor() {
    this.ormRepository = getRepository(Chat);
  }

  public async create(data: ICreateChatDTO): Promise<Chat> {
    const chat = this.ormRepository.create(data);

    await this.ormRepository.save(chat);

    return chat;
  }

  public async findById(id: string): Promise<Chat | undefined> {
    const chat = await this.ormRepository.findOne({
      where: { id },
    });

    return chat;
  }

  public async findByOrderId(order_id: string): Promise<Chat | undefined> {
    const chat = await this.ormRepository.findOne({
      where: { order_id },
    });

    return chat;
  }

  public async findByUserId(user_id: string): Promise<Chat[] | undefined> {
    const chats = await this.ormRepository.find({
      where: [
        { deliveryman_id: user_id, active: true },
        { requester_id: user_id, active: true },
      ],
      order: { last_message_sent_at: 'DESC' },
    });

    return chats;
  }

  public async update(chat: Chat): Promise<Chat> {
    return this.ormRepository.save(chat);
  }
}

export default ChatsRepository;
