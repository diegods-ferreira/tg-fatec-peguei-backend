import ICreateRequestPickupOfferDTO from '@modules/request_pickup_offers/dtos/ICreateRequestPickupOfferDTO';
import IRequestPickupOffersRepository from '@modules/request_pickup_offers/repositories/IRequestPickupOffersRepository';
import { getRepository, Repository } from 'typeorm';
import RequestPickupOffer from '../entities/RequestPickupOffer';

class RequestPickupOffersRepository implements IRequestPickupOffersRepository {
  private ormRepository: Repository<RequestPickupOffer>;

  constructor() {
    this.ormRepository = getRepository(RequestPickupOffer);
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

  public async findById(id: string): Promise<RequestPickupOffer | undefined> {
    const requestPickupOffer = await this.ormRepository.findOne(id);

    return requestPickupOffer;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async update(
    requestPickupOffer: RequestPickupOffer,
  ): Promise<RequestPickupOffer> {
    return this.ormRepository.save(requestPickupOffer);
  }
}

export default RequestPickupOffersRepository;
