import { getPreciseDistance } from 'geolib';
import { inject, injectable } from 'tsyringe';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
  user_id?: string;
  user_latitude: number;
  user_longitude: number;
  distance: number;
}

@injectable()
class ListOrdersNearUserService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({
    user_id,
    user_latitude,
    user_longitude,
    distance,
  }: IRequest): Promise<Order[]> {
    const orders = await this.ordersRepository.findAllOrders({
      except_user_id: user_id,
    });

    const distanceInMeters = distance * 1000;

    const filteredOrdersByDistance = orders.filter(order => {
      return (
        getPreciseDistance(
          {
            latitude: user_latitude,
            longitude: user_longitude,
          },
          {
            latitude: order.delivery_latitude,
            longitude: order.delivery_longitude,
          },
        ) <= distanceInMeters
      );
    });

    return filteredOrdersByDistance;
  }
}

export default ListOrdersNearUserService;
