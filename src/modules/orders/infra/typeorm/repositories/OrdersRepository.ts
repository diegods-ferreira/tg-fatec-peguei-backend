import { getRepository, Repository } from 'typeorm';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import IFindAllOrdersDTO from '@modules/orders/dtos/IFindAllOrdersDTO';
// import IFindByKeysDTO from '@modules/orders/dtos/IFindByKeysDTO';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import { format } from 'date-fns';
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
        .where(`orders.requester_id <> '${except_user_id}'`)
        .andWhere(
          `getdistance(orders.pickup_latitude, orders.pickup_longitude, ${user_location.latitude}, ${user_location.longitude}) <= ${distance}`,
        )
        .andWhere(
          `orders.created_at <= '${format(date, 'yyyy-MM-dd HH:mm:ss')}'`,
        )
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
        .where(
          `getdistance(orders.pickup_latitude, orders.pickup_longitude, ${user_location.latitude}, ${user_location.longitude}) <= ${distance}`,
        )
        .andWhere(
          `orders.created_at <= '${format(date, 'yyyy-MM-dd HH:mm:ss')}'`,
        )
        .orderBy('distance_from_user', 'ASC')
        .take(10)
        .skip(skip)
        .getMany();
    }
    return orders;
  }

  // public async findByKeys(keys: IFindByKeysDTO): Promise<Order[]> {
  //   const orders = await this.ormRepository.find({
  //     where: `${keys} = ${keys}`,
  //     relations: ['items'],
  //   });

  //   return orders;
  // }

  public async findById(order_id: string): Promise<Order | undefined> {
    const order = await this.ormRepository.findOne({
      where: { id: order_id },
      relations: ['items'],
    });

    return order;
  }

  public async findByUserId(user_id: string): Promise<Order[]> {
    const orders = await this.ormRepository.find({
      where: { requester_id: user_id },
      relations: ['items'],
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
}

export default OrdersRepository;
