import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateChatService from '@modules/chats/services/CreateChatService';
import ListChatsByUserIdService from '@modules/chats/services/ListChatsByUserIdService';
import FindChatByIdService from '@modules/chats/services/FindChatByIdService';

export default class ChatsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { order_id, deliveryman_id, requester_id } = request.body;

    const createChat = container.resolve(CreateChatService);

    const chat = await createChat.execute({
      order_id,
      deliveryman_id,
      requester_id,
    });

    return response.json(chat);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listUserChats = container.resolve(ListChatsByUserIdService);

    const chats = await listUserChats.execute({ user_id });

    return response.json(classToClass(chats));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const findChatById = container.resolve(FindChatByIdService);

    const chats = await findChatById.execute({ id });

    return response.json(classToClass(chats));
  }
}
