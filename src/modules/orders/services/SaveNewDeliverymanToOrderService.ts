import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationProvider from '@shared/container/providers/NotificationProvider/models/INotificationProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
  id: string;
  deliveryman_id: string;
  user_id: string;
}

@injectable()
class SaveNewDeliverymanToOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('NotificationProvider')
    private notificationProvider: INotificationProvider,
  ) {}

  async execute({ id, deliveryman_id, user_id }: IRequest): Promise<Order> {
    const order = await this.ordersRepository.findById(id, false);

    if (!order) {
      throw new AppError('Order not found');
    }

    Object.assign(order, {
      deliveryman_id,
      status: 2,
    });

    await this.ordersRepository.save(order);

    await this.cacheProvider.invalidate(
      `@Peguei!:user-orders-as-deliveryman-list:${deliveryman_id}`,
    );

    await this.cacheProvider.invalidate(`@Peguei!:user-orders-list:${user_id}`);

    const requester = await this.usersRepository.findById(user_id);
    const deliveryman = await this.usersRepository.findById(deliveryman_id);

    if (requester && deliveryman) {
      await this.notificationProvider.sendNotification({
        title: `Você será o entregador do pedido #${order.number}!`,
        body: `${requester.name} te escolheu para fazer a entrega de seus produtos.`,
        receiver: deliveryman.id,
        deep_link: `peguei://order-details/${order.id}`,
      });
    }

    return order;
  }
}

export default SaveNewDeliverymanToOrderService;
