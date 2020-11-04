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
  delivery_latitude: number;
  delivery_longitude: number;
  trip_id?: string;
}

@injectable()
class UpdateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

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
    delivery_latitude,
    delivery_longitude,
    trip_id,
  }: IRequest): Promise<Order> {
    const order = await this.ordersRepository.findById(id);

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
      delivery_latitude,
      delivery_longitude,
    });

    await this.ordersRepository.save(order);

    await this.cacheProvider.invalidate(
      `@Peguei!:user-orders-list:${requester_id}`,
    );

    return order;
  }
}

export default UpdateOrderService;
