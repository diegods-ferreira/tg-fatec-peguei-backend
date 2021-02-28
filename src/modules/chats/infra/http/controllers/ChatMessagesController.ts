import { Request, Response } from 'express';
import LoadPreviousChatMessagesService from '@shared/services/chats/LoadPreviousChatMessagesService';
import { container } from 'tsyringe';
import convertChatMessageSchemaToGifitedChatMessageObject from '@shared/utils/convertChatMessageSchemaToGifitedChatMessageObject';
import AppError from '@shared/errors/AppError';
import FindChatByIdService from '@modules/chats/services/FindChatByIdService';

export default class ChatMessagesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { chat_id } = request.params;

    const loadPreviousChatMessages = container.resolve(
      LoadPreviousChatMessagesService,
    );

    const chatMessages = await loadPreviousChatMessages.execute(chat_id);

    if (!chatMessages) {
      throw new AppError('No messages were found');
    }

    const findChat = container.resolve(FindChatByIdService);

    const chat = await findChat.execute({ id: chat_id });

    if (!chat) {
      throw new AppError('Chat not found');
    }

    const convertedMessages = convertChatMessageSchemaToGifitedChatMessageObject(
      chatMessages,
      chat,
    );

    return response.json(convertedMessages);
  }
}
