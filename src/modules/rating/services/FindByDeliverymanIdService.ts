import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import Rate from '../infra/typeorm/schemas/Rate';
import IRatingRepository from '../repositories/IRatingRepository';

interface IRequest {
  deliveryman_id: string;
}

interface RateWithRequester extends Rate {
  requester: User;
}

@injectable()
class FindRatingByDeliverymanIdService {
  constructor(
    @inject('RatingRepository')
    private ratingRapository: IRatingRepository,

    @inject('UsersRepository')
    private usersRapository: IUsersRepository,
  ) {}

  public async execute({
    deliveryman_id,
  }: IRequest): Promise<Rate[] | undefined> {
    const rating = await this.ratingRapository.findByDeliverymanId(
      deliveryman_id,
    );

    const fetchRatingRequester = rating.map(async rate => {
      const requester = await this.usersRapository.findById(rate.requester_id);

      if (requester) {
        return { ...rate, requester } as RateWithRequester;
      }

      return {} as RateWithRequester;
    });

    const ratingWithRequester = await Promise.all(fetchRatingRequester);

    return ratingWithRequester;
  }
}

export default FindRatingByDeliverymanIdService;
