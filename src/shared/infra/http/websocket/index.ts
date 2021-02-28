import Chat from '@modules/chats/infra/typeorm/entities/Chat';
import CreateChatMessageService from '@modules/chats/services/CreateChatMessageService';
import FindChatByIdService from '@modules/chats/services/FindChatByIdService';
import AppError from '@shared/errors/AppError';
import SaveLastChatMessageSentService from '@shared/services/chats/SaveLastChatMessageSentService';
import convertChatMessageSchemaToGifitedChatMessageObject from '@shared/utils/convertChatMessageSchemaToGifitedChatMessageObject';
import socketIo from 'socket.io';
import { container } from 'tsyringe';

interface INewMessage {
  from: string;
  to: string;
  text: string;
}

async function findChat(id: string): Promise<Chat> {
  const findChatById = container.resolve(FindChatByIdService);

  const chat = await findChatById.execute({ id });

  if (!chat) {
    throw new AppError('Chat not found!');
  }

  return chat;
}

async function sendNewMessage(
  socket: socketIo.Socket,
  chat: Chat,
  newMessage: INewMessage,
  chatRoom: string,
): Promise<void> {
  const createChatMessage = container.resolve(CreateChatMessageService);

  const createdMessage = await createChatMessage.execute({
    ...newMessage,
    chat_id: chat.id,
  });

  const saveLastMessageSent = container.resolve(SaveLastChatMessageSentService);

  await saveLastMessageSent.execute(createdMessage);

  const convertedMessage = convertChatMessageSchemaToGifitedChatMessageObject(
    [createdMessage],
    chat,
  );

  socket.broadcast.to(chatRoom).emit('receive-message', convertedMessage);
}

export default function handleWebsocketConnection(
  io: socketIo.Server,
  socket: socketIo.Socket,
): void {
  socket.on('join-room', async (chatId: string) => {
    const chatRoom = `@Peguei!:chat_room:${chatId}`;
    const chat = await findChat(chatId);

    socket.join(chatRoom);

    socket.on('send-message', (newMessage: INewMessage) => {
      sendNewMessage(socket, chat, newMessage, chatRoom);
    });
  });
}
