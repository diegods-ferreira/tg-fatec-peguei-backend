import ICreateOrderDTO from '../dtos/ICreateOrderDTO';
import IFindAllOrdersDTO from '../dtos/IFindAllOrdersDTO';
import Order from '../infra/typeorm/entities/Order';

/**
 * These are the methods to the orders repository
 */
export default interface IOrdersRepository {
  /**
   * Creates an order
   * @param data Order data
   */
  create(data: ICreateOrderDTO): Promise<Order>;

  /**
   * Updates an order
   * @param order Order data
   */
  save(order: Order): Promise<Order>;

  /**
   * Finds all orders
   * @param data Order data
   */
  findAllOrders(data: IFindAllOrdersDTO): Promise<Order[]>;

  /**
   * Finds an order by it's unique ID
   * @param order_id order id
   */
  findById(order_id: string): Promise<Order | undefined>;

  /**
   * Finds the orders of an specific user
   * @param user_id requester id
   */
  findByUserId(user_id: string): Promise<Order[]>;

  /**
   * Finds the orders of an specific deliveryman
   * @param deliveryman_id deliveryman id
   */
  findByDeliverymanId(deliveryman_id: string): Promise<Order[]>;
}
