import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IRequestPickupOffersRepository from '../repositories/IRequestPickupOffersRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteRequestPickupOfferService {
  constructor(
    @inject('RequestPickupOffersRepository')
    private requestPickupOffersRepository: IRequestPickupOffersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const requestPickupOffer = await this.requestPickupOffersRepository.findById(
      id,
    );

    if (!requestPickupOffer) {
      throw new AppError('Request pickup offer not found!');
    }

    await this.requestPickupOffersRepository.delete(id);
  }
}

export default DeleteRequestPickupOfferService;
