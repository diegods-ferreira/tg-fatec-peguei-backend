import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
  deliveryman_id: string;
}

@injectable()
class ListUserOdersAsDeliverymanService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ deliveryman_id }: IRequest): Promise<Order[]> {
    let orders = await this.cacheProvider.recover<Order[]>(
      `@Peguei!:user-orders-as-deliveryman-list:${deliveryman_id}`,
    );

    if (!orders) {
      orders = await this.ordersRepository.findByDeliverymanId(deliveryman_id);
    }

    await this.cacheProvider.save(
      `@Peguei!:user-orders-as-deliveryman-list:${deliveryman_id}`,
      classToClass(orders),
    );

    return orders;
  }
}

export default ListUserOdersAsDeliverymanService;
