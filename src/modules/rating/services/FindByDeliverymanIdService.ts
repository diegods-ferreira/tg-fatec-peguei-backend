import { inject, injectable } from 'tsyringe';
import Rate from '../infra/typeorm/schemas/Rate';
import IRatingRepository from '../repositories/IRatingRepository';

interface IRequest {
  deliveryman_id: string;
}

@injectable()
class FindRatingByDeliverymanIdService {
  constructor(
    @inject('RatingRepository')
    private ratingRapository: IRatingRepository,
  ) {}

  public async execute({
    deliveryman_id,
  }: IRequest): Promise<Rate[] | undefined> {
    const rating = await this.ratingRapository.findByDeliverymanId(
      deliveryman_id,
    );

    return rating;
  }
}

export default FindRatingByDeliverymanIdService;
