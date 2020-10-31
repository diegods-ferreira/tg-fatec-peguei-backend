import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRquest {
  order_id: string;
}

@injectable()
class ShowOrderDetailsService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ order_id }: IRquest): Promise<Order> {
    const order = await this.ordersRepository.findById(order_id);

    if (!order) {
      throw new AppError('Order not found');
    }

    return order;
  }
}

export default ShowOrderDetailsService;
