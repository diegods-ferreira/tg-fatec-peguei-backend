import ICreateRateDTO from '../dtos/ICreateRateDTO';
import Rate from '../infra/typeorm/schemas/Rate';

export default interface IRatingRepository {
  create(data: ICreateRateDTO): Promise<Rate>;
  save(rate: Rate): Promise<Rate>;
  delete(rate: Rate): Promise<Rate>;
  findById(id: string): Promise<Rate | undefined>;
  findByOrderId(order_id: string): Promise<Rate | undefined>;
  findByRequesterId(requester_id: string): Promise<Rate[]>;
  findByDeliverymanId(deliveryman_id: string): Promise<Rate[]>;
}
