import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
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

    return order;
  }
}

export default SaveNewDeliverymanToOrderService;
