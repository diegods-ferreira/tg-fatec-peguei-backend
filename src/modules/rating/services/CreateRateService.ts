import { inject, injectable } from 'tsyringe';
import Rate from '../infra/typeorm/schemas/Rate';
import IRatingRepository from '../repositories/IRatingRepository';

interface IRequest {
  order_id: string;
  requester_id: string;
  deliveryman_id: string;
  rate: number;
  comment: string;
}

@injectable()
class CreateRateService {
  constructor(
    @inject('RatingRepository')
    private ratingRapository: IRatingRepository,
  ) {}

  public async execute({
    order_id,
    requester_id,
    deliveryman_id,
    rate,
    comment,
  }: IRequest): Promise<Rate> {
    const craetedRate = await this.ratingRapository.create({
      order_id,
      requester_id,
      deliveryman_id,
      rate,
      comment,
    });

    return craetedRate;
  }
}

export default CreateRateService;
