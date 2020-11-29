import { inject, injectable } from 'tsyringe';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
  user_id?: string;
  user_latitude: number;
  user_longitude: number;
  distance: number;
  page: number;
  date: Date;
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
    page,
    date,
  }: IRequest): Promise<Order[]> {
    const orders = await this.ordersRepository.findAllOrders({
      except_user_id: user_id,
      distance,
      user_location: { latitude: user_latitude, longitude: user_longitude },
      page,
      date,
    });
    return orders;
  }
}

export default ListOrdersNearUserService;
