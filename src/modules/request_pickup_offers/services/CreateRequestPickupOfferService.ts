import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import INotificationProvider from '@shared/container/providers/NotificationProvider/models/INotificationProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import RequestPickupOffer from '../infra/typeorm/entities/RequestPickupOffer';
import IRequestPickupOffersRepository from '../repositories/IRequestPickupOffersRepository';

interface IRequest {
  order_id: string;
  deliveryman_id: string;
  delivery_value: number;
}

@injectable()
class CreateRequestPickupOfferService {
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

  public async execute({
    order_id,
    deliveryman_id,
    delivery_value,
  }: IRequest): Promise<RequestPickupOffer> {
    const checkIfOfferExists = await this.requestPickupOffersRepository.findByDeliverymanId(
      deliveryman_id,
      order_id,
    );

    if (checkIfOfferExists) {
      throw new AppError('There is already an offer with this ID');
    }

    const requestPickupOffer = await this.requestPickupOffersRepository.create({
      order_id,
      deliveryman_id,
      delivery_value,
    });

    const order = await this.ordersRepository.findById(order_id);
    const deliveryman = await this.usersRepository.findById(deliveryman_id);

    if (order && deliveryman) {
      await this.notificationProvider.sendNotification({
        title: `Pedido #${order.number}: Nova oferta recebida!`,
        body: `${deliveryman.name} acabou de se oferecer para buscar o seu pedido.`,
        receiver: order.requester.id,
        deep_link: `peguei://select-deliveryman/${order.id}`,
      });
    }

    return requestPickupOffer;
  }
}

export default CreateRequestPickupOfferService;
