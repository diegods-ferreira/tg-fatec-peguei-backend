import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IOrdersRepository from '../repositories/IOrdersRepository';

@injectable()
class DeleteOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute(order_id: string, user_id: string): Promise<void> {
    const order = await this.ordersRepository.findById(order_id);

    if (!order) {
      throw new AppError('Order not found');
    }

    if (order.requester_id !== user_id) {
      throw new AppError(
        "This order doesn't belong to you, so you cannot delete it",
      );
    }

    const deletedOrder = await this.ordersRepository.delete(order);

    if (!deletedOrder) {
      throw new AppError('Internal server error', 500);
    }
  }
}

export default DeleteOrderService;
