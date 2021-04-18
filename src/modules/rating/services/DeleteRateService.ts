import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Rate from '../infra/typeorm/schemas/Rate';
import IRatingRepository from '../repositories/IRatingRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteRateService {
  constructor(
    @inject('RatingRepository')
    private ratingRapository: IRatingRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Rate> {
    const rate = await this.ratingRapository.findById(id);

    if (!rate) {
      throw new AppError('Rate not found!');
    }

    return this.ratingRapository.delete(rate);
  }
}

export default DeleteRateService;
