import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
  id: string;
  deliveryman_id?: string;
  requester_id: string;
  pickup_date: Date;
  pickup_establishment: string;
  pickup_address: string;
  pickup_city: string;
  pickup_state: string;
  pickup_latitude: number;
  pickup_longitude: number;
  delivery_address: string;
  delivery_city: string;
  delivery_state: string;
  trip_id?: string;
  status?: number;
  purchase_invoice?: string;
}

@injectable()
class UpdateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    deliveryman_id,
    requester_id,
    pickup_date,
    pickup_establishment,
    pickup_address,
    pickup_city,
    pickup_state,
    pickup_latitude,
    pickup_longitude,
    delivery_address,
    delivery_city,
    delivery_state,
    trip_id,
    status,
    purchase_invoice,
  }: IRequest): Promise<Order> {
    const order = await this.ordersRepository.findById(id, false);

    if (!order) {
      throw new AppError('Order not found');
    }

    if (deliveryman_id === requester_id) {
      throw new AppError("You can't create an order to yourself");
    }

    Object.assign(order, {
      deliveryman_id: deliveryman_id || null,
      trip_id: trip_id || null,
      pickup_date,
      pickup_establishment,
      pickup_address,
      pickup_city,
      pickup_state,
      pickup_latitude,
      pickup_longitude,
      delivery_address,
      delivery_city,
      delivery_state,
      ...(status ? { status } : {}),
    });

    if (purchase_invoice) {
      Object.assign(order, {
        purchase_invoice,
      });
    }

    await this.ordersRepository.save(order);

    await this.cacheProvider.invalidate(
      `@Peguei!:user-orders-list:${requester_id}`,
    );

    const updatedOrder = await this.ordersRepository.findById(id);

    if (!updatedOrder) {
      throw new AppError('Order not found');
    }

    if (status === 3) {
      const user = await this.usersRepository.findById(requester_id);

      if (!user) {
        throw new AppError('User not found');
      }

      user.deliveries_total += 1;

      await this.usersRepository.save(user);
    }

    return updatedOrder;
  }
}

export default UpdateOrderService;
