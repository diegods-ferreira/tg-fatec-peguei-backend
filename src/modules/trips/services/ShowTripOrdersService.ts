import Order from '@modules/orders/infra/typeorm/entities/Order';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  trip_id: string;
}

@injectable()
class ShowTripOrdersService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ trip_id }: IRequest): Promise<Order[]> {
    const orders = await this.ordersRepository.findByTripId(trip_id);

    return orders;
  }
}

export default ShowTripOrdersService;
