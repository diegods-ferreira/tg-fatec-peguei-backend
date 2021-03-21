import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import RequestPickupOffer from '../infra/typeorm/entities/RequestPickupOffer';
import IRequestPickupOffersRepository from '../repositories/IRequestPickupOffersRepository';

interface IRequest {
  order_id: string;
  deliveryman_id: string;
  delivery_value: number;
}

@injectable()
class CreateRequestPickupOfferService {
  constructor(
    @inject('RequestPickupOffersRepository')
    private requestPickupOffersRepository: IRequestPickupOffersRepository,
  ) {}

  public async execute({
    order_id,
    deliveryman_id,
    delivery_value,
  }: IRequest): Promise<RequestPickupOffer> {
    const checkIfOfferExists = await this.requestPickupOffersRepository.findByDeliverymanId(
      deliveryman_id,
      order_id,
    );

    if (checkIfOfferExists) {
      throw new AppError('There is already an offer with this ID');
    }

    const requestPickupOffer = await this.requestPickupOffersRepository.create({
      order_id,
      deliveryman_id,
      delivery_value,
    });

    return requestPickupOffer;
  }
}

export default CreateRequestPickupOfferService;
