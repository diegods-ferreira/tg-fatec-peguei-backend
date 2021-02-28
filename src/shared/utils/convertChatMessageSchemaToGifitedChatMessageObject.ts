import Chat from '@modules/chats/infra/typeorm/entities/Chat';
import ChatMessage from '@modules/chats/infra/typeorm/schemas/ChatMessage';

interface IGiftedChatUser {
  _id: string | number;
  name: string;
  avatar: string;
}

interface IGiftedChatMessageObject {
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user: IGiftedChatUser;
}

export default function convertChatMessageSchemaToGifitedChatMessageObject(
  chatMessages: ChatMessage[],
  chat: Chat,
): IGiftedChatMessageObject[] {
  return chatMessages.map(message => ({
    _id: String(message.id),
    text: message.text,
    createdAt: message.created_at,
    ...(message.from === chat.deliveryman.id
      ? {
          user: {
            _id: chat.deliveryman.id,
            name: chat.deliveryman.name,
            avatar: chat.deliveryman.getAvatarUrl() || '',
          },
        }
      : {
          user: {
            _id: chat.requester.id,
            name: chat.requester.name,
            avatar: chat.requester.getAvatarUrl() || '',
          },
        }),
  }));
}
