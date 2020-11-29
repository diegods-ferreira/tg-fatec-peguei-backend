import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListUserOrdersService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Order[]> {
    let orders = await this.cacheProvider.recover<Order[]>(
      `@Peguei!:user-orders-list:${user_id}`,
    );

    if (!orders) {
      orders = await this.ordersRepository.findByUserId(user_id);
    }

    await this.cacheProvider.save(
      `@Peguei!:user-orders-list:${user_id}`,
      classToClass(orders),
    );

    return orders;
  }
}

export default ListUserOrdersService;
