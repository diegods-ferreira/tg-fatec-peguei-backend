import ICreateRequestPickupOfferDTO from '../dtos/ICreateRequestPickupOfferDTO';
import RequestPickupOffer from '../infra/typeorm/schemas/RequestPickupOffer';

export default interface IRequestPickupOffersRepository {
  create(data: ICreateRequestPickupOfferDTO): Promise<RequestPickupOffer>;
  findByDeliverymanId(
    deliveryman_id: string,
    order_id: string,
  ): Promise<RequestPickupOffer | undefined>;
  findByOrderId(order_id: string): Promise<RequestPickupOffer[] | undefined>;
  findById(id: string): Promise<RequestPickupOffer | undefined>;
  delete(id: string): Promise<void>;
}
