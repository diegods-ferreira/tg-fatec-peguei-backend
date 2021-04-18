import { inject, injectable } from 'tsyringe';
import Rate from '../infra/typeorm/schemas/Rate';
import IRatingRepository from '../repositories/IRatingRepository';

interface IRequest {
  order_id: string;
}

@injectable()
class FindRatingByOrderIdService {
  constructor(
    @inject('RatingRepository')
    private ratingRapository: IRatingRepository,
  ) {}

  public async execute({ order_id }: IRequest): Promise<Rate[] | undefined> {
    const rating = await this.ratingRapository.findByOrderId(order_id);

    return rating;
  }
}

export default FindRatingByOrderIdService;
