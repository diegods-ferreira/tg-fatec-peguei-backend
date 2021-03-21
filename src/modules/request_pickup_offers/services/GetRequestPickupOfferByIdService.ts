import { inject, injectable } from 'tsyringe';
import RequestPickupOffer from '../infra/typeorm/entities/RequestPickupOffer';
import IRequestPickupOffersRepository from '../repositories/IRequestPickupOffersRepository';

interface IRequest {
  order_id: string;
  deliveryman_id: string;
}

@injectable()
class GetRequestPickupOfferByIdService {
  constructor(
    @inject('RequestPickupOffersRepository')
    private requestPickupOffersRepository: IRequestPickupOffersRepository,
  ) {}

  public async execute({
    order_id,
    deliveryman_id,
  }: IRequest): Promise<RequestPickupOffer | undefined> {
    const requestPickupOffer = await this.requestPickupOffersRepository.findByDeliverymanId(
      deliveryman_id,
      order_id,
    );

    return requestPickupOffer;
  }
}

export default GetRequestPickupOfferByIdService;
