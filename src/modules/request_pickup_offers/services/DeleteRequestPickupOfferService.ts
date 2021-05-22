import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import INotificationProvider from '@shared/container/providers/NotificationProvider/models/INotificationProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IRequestPickupOffersRepository from '../repositories/IRequestPickupOffersRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteRequestPickupOfferService {
  constructor(
    @inject('RequestPickupOffersRepository')
    private requestPickupOffersRepository: IRequestPickupOffersRepository,

    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('NotificationProvider')
    private notificationProvider: INotificationProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const requestPickupOffer = await this.requestPickupOffersRepository.findById(
      id,
    );

    if (!requestPickupOffer) {
      throw new AppError('Request pickup offer not found!');
    }

    await this.requestPickupOffersRepository.delete(id);

    const order = await this.ordersRepository.findById(
      requestPickupOffer.order_id,
    );
    const deliveryman = await this.usersRepository.findById(
      requestPickupOffer.deliveryman_id,
    );

    if (order && deliveryman) {
      await this.notificationProvider.sendNotification({
        title: `Pedido #${order.number}: Oferta retirada 😞`,
        body: `${deliveryman.name} acabou de retirar a oferta que havia feito.`,
        receiver: order.requester.id,
        deep_link: `peguei://select-deliveryman/${order.id}`,
      });
    }
  }
}

export default DeleteRequestPickupOfferService;
