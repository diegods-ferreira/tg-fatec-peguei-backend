import { getRepository, Repository } from 'typeorm';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import IFindAllOrdersDTO from '@modules/orders/dtos/IFindAllOrdersDTO';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import { format, addMinutes } from 'date-fns';
import Order from '../entities/Order';

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async findAllOrders({
    except_user_id,
    distance,
    user_location,
    page,
    date,
  }: IFindAllOrdersDTO): Promise<Order[]> {
    let orders;
    const skip = (page - 1) * 10;
    const formattedDate = format(
      addMinutes(date, date.getTimezoneOffset()),
      'yyyy-MM-dd HH:mm:ss',
    );

    if (except_user_id) {
      orders = await this.ormRepository
        .createQueryBuilder('orders')
        .select()
        .addSelect(
          `getdistance(orders.pickup_latitude, orders.pickup_longitude, ${user_location.latitude}, ${user_location.longitude})`,
          'distance_from_user',
        )
        .leftJoinAndSelect('orders.items', 'items')
        .leftJoinAndSelect('items.category', 'items.category')
        .leftJoinAndSelect('items.weight_unit_measure', 'weight_unit_measure')
        .leftJoinAndSelect(
          'items.dimension_unit_measure',
          'dimension_unit_measure',
        )
        .leftJoinAndSelect('orders.requester', 'requester')
        .leftJoinAndSelect('orders.deliveryman', 'deliveryman')
        .leftJoinAndSelect(
          'orders.request_pickup_offers',
          'request_pickup_offers',
        )
        .where(`orders.requester_id <> '${except_user_id}'`)
        .andWhere(
          `getdistance(orders.pickup_latitude, orders.pickup_longitude, ${user_location.latitude}, ${user_location.longitude}) <= ${distance}`,
        )
        .andWhere(`orders.created_at <= '${formattedDate}'`)
        .andWhere('orders.status = 1')
        .orderBy('distance_from_user', 'ASC')
        .take(10)
        .skip(skip)
        .getMany();
    } else {
      orders = await this.ormRepository
        .createQueryBuilder('orders')
        .select()
        .addSelect(
          `getdistance(orders.pickup_latitude, orders.pickup_longitude, ${user_location.latitude}, ${user_location.longitude})`,
          'distance_from_user',
        )
        .leftJoinAndSelect('orders.items', 'items')
        .leftJoinAndSelect('items.category', 'items.category')
        .leftJoinAndSelect('items.weight_unit_measure', 'weight_unit_measure')
        .leftJoinAndSelect(
          'items.dimension_unit_measure',
          'dimension_unit_measure',
        )
        .leftJoinAndSelect('orders.requester', 'requester')
        .leftJoinAndSelect('orders.deliveryman', 'deliveryman')
        .leftJoinAndSelect(
          'orders.request_pickup_offers',
          'request_pickup_offers',
        )
        .where(
          `getdistance(orders.pickup_latitude, orders.pickup_longitude, ${user_location.latitude}, ${user_location.longitude}) <= ${distance}`,
        )
        .andWhere(`orders.created_at <= '${formattedDate}'`)
        .andWhere('orders.status = 1')
        .orderBy('distance_from_user', 'ASC')
        .take(10)
        .skip(skip)
        .getMany();
    }
    return orders;
  }

  public async findById(
    order_id: string,
    showRelations = true,
  ): Promise<Order | undefined> {
    const order = await this.ormRepository.findOne({
      where: { id: order_id },
      ...(showRelations
        ? {
            relations: [
              'items',
              'request_pickup_offers',
              'requester',
              'deliveryman',
            ],
          }
        : {}),
    });

    return order;
  }

  public async findByUserId(user_id: string): Promise<Order[]> {
    const orders = await this.ormRepository.find({
      where: { requester_id: user_id },
      relations: ['items', 'request_pickup_offers', 'requester', 'deliveryman'],
      order: {
        created_at: 'DESC',
      },
    });

    return orders;
  }

  public async findByDeliverymanId(deliveryman_id: string): Promise<Order[]> {
    const orders = await this.ormRepository.find({
      where: { deliveryman_id },
      relations: ['items', 'request_pickup_offers', 'requester', 'deliveryman'],
      order: {
        created_at: 'DESC',
      },
    });

    return orders;
  }

  public async create(orderData: ICreateOrderDTO): Promise<Order> {
    const order = this.ormRepository.create(orderData);

    await this.ormRepository.save(order);

    return order;
  }

  public async save(order: Order): Promise<Order> {
    return this.ormRepository.save(order);
  }

  public async delete(order: Order): Promise<Order> {
    return this.ormRepository.remove(order);
  }
}

export default OrdersRepository;
