import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Rate from '../infra/typeorm/schemas/Rate';
import IRatingRepository from '../repositories/IRatingRepository';

interface IRequest {
  requester_id: string;
}

interface RateWithDeliveryman extends Rate {
  deliveryman: User;
}

@injectable()
class FindRatingByRequesterIdService {
  constructor(
    @inject('RatingRepository')
    private ratingRapository: IRatingRepository,

    @inject('UsersRepository')
    private usersRapository: IUsersRepository,
  ) {}

  public async execute({
    requester_id,
  }: IRequest): Promise<RateWithDeliveryman[] | undefined> {
    const rating = await this.ratingRapository.findByRequesterId(requester_id);

    const fetchRatingDeliverymen = rating.map(async rate => {
      const deliveryman = await this.usersRapository.findById(
        rate.deliveryman_id,
      );

      if (deliveryman) {
        return { ...rate, deliveryman } as RateWithDeliveryman;
      }

      return {} as RateWithDeliveryman;
    });

    const ratingWithDeliverymen = await Promise.all(fetchRatingDeliverymen);

    return ratingWithDeliverymen;
  }
}

export default FindRatingByRequesterIdService;
