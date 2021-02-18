import { inject, injectable } from 'tsyringe';
import RequestPickupOffer from '../infra/typeorm/schemas/RequestPickupOffer';
import IRequestPickupOffersRepository from '../repositories/IRequestPickupOffersRepository';

interface IRequest {
  order_id: string;
}

@injectable()
class ListAllRequestPickupOffersOfAnOrderService {
  constructor(
    @inject('RequestPickupOffersRepository')
    private requestPickupOffersRepository: IRequestPickupOffersRepository,
  ) {}

  public async execute({
    order_id,
  }: IRequest): Promise<RequestPickupOffer[] | undefined> {
    const requestPickupOffers = await this.requestPickupOffersRepository.findByOrderId(
      order_id,
    );

    return requestPickupOffers;
  }
}

export default ListAllRequestPickupOffersOfAnOrderService;
