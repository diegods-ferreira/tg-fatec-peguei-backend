import ICreateChatDTO from '../dtos/ICreateChatDTO';
import Chat from '../infra/typeorm/entities/Chat';

export default interface IChatsRepository {
  create(data: ICreateChatDTO): Promise<Chat>;
  findById(id: string): Promise<Chat | undefined>;
  findByOrderId(order_id: string): Promise<Chat | undefined>;
  findByUserId(user_id: string): Promise<Chat[] | undefined>;
}
