import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';
import Trip from '../infra/typeorm/entities/Trip';
import ITripsRepository from '../repositories/ITripsRepository';

interface IRequest {
  user_id: string;
  destination_city: string;
  destination_state: string;
  return_city: string;
  return_state: string;
  departure_date: Date;
  return_date: Date;
}

@injectable()
class CreateTripService {
  constructor(
    @inject('TripsRepository')
    private tripsRepository: ITripsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    destination_city,
    destination_state,
    return_city,
    return_state,
    departure_date,
    return_date,
  }: IRequest): Promise<Trip> {
    const trip = await this.tripsRepository.create({
      user_id,
      destination_city,
      destination_state,
      return_city,
      return_state,
      departure_date,
      return_date,
    });

    await this.cacheProvider.invalidate(`@Peguei!:user-trips-list:${user_id}`);

    return trip;
  }
}

export default CreateTripService;
