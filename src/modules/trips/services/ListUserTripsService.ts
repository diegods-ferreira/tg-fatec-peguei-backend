import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';
import Trip from '../infra/typeorm/entities/Trip';
import ITripsRepository from '../repositories/ITripsRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListUserTripsService {
  constructor(
    @inject('TripsRepository')
    private tripsRepository: ITripsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Trip[]> {
    let trips = await this.cacheProvider.recover<Trip[]>(
      `@Peguei!:user-trips-list:${user_id}`,
    );

    if (!trips) {
      trips = await this.tripsRepository.findByUserId(user_id);
    }

    await this.cacheProvider.save(`@Peguei!:user-trips-list:${user_id}`, trips);

    return trips;
  }
}

export default ListUserTripsService;
