import { inject, injectable } from 'tsyringe';
import Rate from '../infra/typeorm/schemas/Rate';
import IRatingRepository from '../repositories/IRatingRepository';

interface IRequest {
  requester_id: string;
}

@injectable()
class FindRatingByRequesterIdService {
  constructor(
    @inject('RatingRepository')
    private ratingRapository: IRatingRepository,
  ) {}

  public async execute({
    requester_id,
  }: IRequest): Promise<Rate[] | undefined> {
    const rating = await this.ratingRapository.findByRequesterId(requester_id);

    return rating;
  }
}

export default FindRatingByRequesterIdService;
