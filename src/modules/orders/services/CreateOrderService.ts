import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Item from '../infra/typeorm/entities/Item';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRquest {
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
  items: Item[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
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
    items,
  }: IRquest): Promise<Order> {
    if (deliveryman_id && requester_id === deliveryman_id) {
      throw new AppError("You can't create an order to yourself");
    }

    const order = await this.ordersRepository.create({
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
      items,
    });

    await this.cacheProvider.invalidatePrefix(
      `@Peguei!:user-orders-list:${requester_id}`,
    );

    return order;
  }
}

export default CreateOrderService;
