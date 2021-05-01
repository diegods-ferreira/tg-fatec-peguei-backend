import { inject, injectable } from 'tsyringe';
import Trip from '../infra/typeorm/entities/Trip';
import ITripsRepository from '../repositories/ITripsRepository';

interface IRequest {
  user_id?: string;
  page: number;
}

@injectable()
class ListTripsNearUserService {
  constructor(
    @inject('TripsRepository')
    private tripsRepository: ITripsRepository,
  ) {}

  public async execute({ user_id, page }: IRequest): Promise<Trip[]> {
    const trips = await this.tripsRepository.findAllTrips({
      except_user_id: user_id,
      page,
    });

    return trips;
  }
}

export default ListTripsNearUserService;
