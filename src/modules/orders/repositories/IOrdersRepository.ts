import ICreateOrderDTO from '../dtos/ICreateOrderDTO';
import IFindAllOrdersDTO from '../dtos/IFindAllOrdersDTO';
import Order from '../infra/typeorm/entities/Order';

export default interface IOrdersRepository {
  create(data: ICreateOrderDTO): Promise<Order>;
  save(order: Order): Promise<Order>;
  delete(order: Order): Promise<Order>;
  findAllOrders(data: IFindAllOrdersDTO): Promise<Order[]>;
  findById(
    order_id: string,
    showRelations?: boolean,
  ): Promise<Order | undefined>;
  findByUserId(user_id: string): Promise<Order[]>;
  findByDeliverymanId(deliveryman_id: string): Promise<Order[]>;
}
