import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import INotificationProvider from '@shared/container/providers/NotificationProvider/models/INotificationProvider';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  chat_id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
}

@injectable()
class SendNewMessageNotificationService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('NotificationProvider')
    private notificationProvider: INotificationProvider,
  ) {}

  public async execute({
    chat_id,
    sender_id,
    receiver_id,
    message,
  }: IRequest): Promise<void> {
    const sender = await this.usersRepository.findById(sender_id);
    const receiver = await this.usersRepository.findById(receiver_id);

    if (sender && receiver) {
      await this.notificationProvider.sendNotification({
        title: `Nova mensagem de ${sender.name}`,
        body: message,
        receiver: receiver.id,
        deep_link: `chats/join-room/${chat_id}`,
      });
    }
  }
}

export default SendNewMessageNotificationService;
