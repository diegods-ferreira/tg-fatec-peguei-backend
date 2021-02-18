import ICreateRequestPickupOfferDTO from '@modules/request_pickup_offers/dtos/ICreateRequestPickupOfferDTO';
import IRequestPickupOffersRepository from '@modules/request_pickup_offers/repositories/IRequestPickupOffersRepository';
import { getMongoRepository, MongoRepository } from 'typeorm';
import RequestPickupOffer from '../schemas/RequestPickupOffer';

class RequestPickupOffersRepository implements IRequestPickupOffersRepository {
  private ormRepository: MongoRepository<RequestPickupOffer>;

  constructor() {
    this.ormRepository = getMongoRepository(RequestPickupOffer, 'mongo');
  }

  public async create({
    order_id,
    deliveryman_id,
    delivery_value,
  }: ICreateRequestPickupOfferDTO): Promise<RequestPickupOffer> {
    const requestPickupOffer = this.ormRepository.create({
      order_id,
      deliveryman_id,
      delivery_value,
    });

    await this.ormRepository.save(requestPickupOffer);

    return requestPickupOffer;
  }

  public async findByDeliverymanId(
    deliveryman_id: string,
    order_id: string,
  ): Promise<RequestPickupOffer | undefined> {
    const requestPickupOffer = await this.ormRepository.findOne({
      where: { deliveryman_id, order_id },
    });

    return requestPickupOffer;
  }

  public async findByOrderId(
    order_id: string,
  ): Promise<RequestPickupOffer[] | undefined> {
    const requestPickupOffers = await this.ormRepository.find({
      where: { order_id },
    });

    return requestPickupOffers;
  }
}

export default RequestPickupOffersRepository;
