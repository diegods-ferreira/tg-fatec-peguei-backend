import ITripsRepository from '@modules/trips/repositories/ITripsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationProvider from '@shared/container/providers/NotificationProvider/models/INotificationProvider';
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
  trip_id?: string;
  items: Item[];
  status?: number;
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('TripsRepository')
    private tripsRepository: ITripsRepository,

    @inject('NotificationProvider')
    private notificationProvider: INotificationProvider,
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
    trip_id,
    items,
    status,
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
      trip_id,
      items,
      status,
    });

    await this.cacheProvider.invalidate(
      `@Peguei!:user-orders-list:${requester_id}`,
    );

    const user = await this.usersRepository.findById(requester_id);

    if (!user) {
      throw new AppError('User not found');
    }

    user.orders_total += 1;

    await this.usersRepository.save(user);

    if (trip_id) {
      const trip = await this.tripsRepository.findById(trip_id);

      if (trip) {
        await this.notificationProvider.sendNotification({
          title: `Viagem #${trip.number}: Novo pedido recebido!`,
          body: `${user.name} acabou de fazer um pedido para sua viagem.`,
          receiver: trip.user_id,
          deep_link: `peguei://trip-orders/${trip.id}`,
        });
      }
    }

    return order;
  }
}

export default CreateOrderService;
