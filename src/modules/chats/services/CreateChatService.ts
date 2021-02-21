import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Chat from '../infra/typeorm/entities/Chat';
import IChatsRepository from '../repositories/IChatsRepository';

interface IRequest {
  order_id: string;
  deliveryman_id: string;
  requester_id: string;
}

@injectable()
class CreateChatService {
  constructor(
    @inject('ChatsRepository')
    private chatsRepository: IChatsRepository,
  ) {}

  public async execute({
    order_id,
    deliveryman_id,
    requester_id,
  }: IRequest): Promise<Chat> {
    const checkIfChatExists = await this.chatsRepository.findByOrderId(
      order_id,
    );

    if (checkIfChatExists) {
      throw new AppError('A chat already exists for this orders');
    }

    const chat = await this.chatsRepository.create({
      order_id,
      deliveryman_id,
      requester_id,
    });

    return chat;
  }
}

export default CreateChatService;
