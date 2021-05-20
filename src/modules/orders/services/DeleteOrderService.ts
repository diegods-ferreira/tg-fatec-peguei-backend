import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IOrdersRepository from '../repositories/IOrdersRepository';

@injectable()
class DeleteOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
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

    if (order.status !== 1) {
      throw new AppError('Only open orders can be deleted');
    }

    const deletedOrder = await this.ordersRepository.delete(order);

    if (!deletedOrder) {
      throw new AppError('Internal server error', 500);
    }

    await this.cacheProvider.invalidate(`@Peguei!:user-orders-list:${user_id}`);

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    user.orders_total -= 1;

    await this.usersRepository.save(user);
  }
}

export default DeleteOrderService;
