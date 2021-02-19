import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IRequestPickupOffersRepository from '../repositories/IRequestPickupOffersRepository';

interface IRequest {
  id: string;
  delivery_value: number;
}

@injectable()
class UpdateRequestPickupOfferService {
  constructor(
    @inject('RequestPickupOffersRepository')
    private requestPickupOffersRepository: IRequestPickupOffersRepository,
  ) {}

  public async execute({ id, delivery_value }: IRequest): Promise<void> {
    const requestPickupOffer = await this.requestPickupOffersRepository.findById(
      id,
    );

    if (!requestPickupOffer) {
      throw new AppError('Request pickup offer not found!');
    }

    requestPickupOffer.delivery_value = delivery_value;

    await this.requestPickupOffersRepository.update(requestPickupOffer);
  }
}

export default UpdateRequestPickupOfferService;
