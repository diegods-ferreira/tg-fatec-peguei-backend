import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Rate from '../infra/typeorm/schemas/Rate';
import IRatingRepository from '../repositories/IRatingRepository';

interface IRequest {
  id: string;
  rate: number;
  comment: string;
}

@injectable()
class UpdateRateService {
  constructor(
    @inject('RatingRepository')
    private ratingRapository: IRatingRepository,
  ) {}

  public async execute({ id, rate, comment }: IRequest): Promise<Rate> {
    const findRate = await this.ratingRapository.findById(id);

    if (!findRate) {
      throw new AppError('Rate not found!');
    }

    Object.assign(findRate, {
      rate,
      comment,
    });

    await this.ratingRapository.save(findRate);

    return findRate;
  }
}

export default UpdateRateService;
