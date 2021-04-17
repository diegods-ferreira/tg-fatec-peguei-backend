import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';
import Trip from '../infra/typeorm/entities/Trip';
import ITripsRepository from '../repositories/ITripsRepository';

interface IRequest {
  user_id: string;
  destination: string;
  return_location: string;
  destination_latitude: number;
  destination_longitude: number;
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
    destination,
    return_location,
    destination_latitude,
    destination_longitude,
    departure_date,
    return_date,
  }: IRequest): Promise<Trip> {
    const trip = await this.tripsRepository.create({
      user_id,
      destination,
      return_location,
      destination_latitude,
      destination_longitude,
      departure_date,
      return_date,
    });

    await this.cacheProvider.invalidate(`@Peguei!:user-trips-list:${user_id}`);

    return trip;
  }
}

export default CreateTripService;
