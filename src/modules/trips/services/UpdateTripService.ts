import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Trip from '../infra/typeorm/entities/Trip';
import ITripsRepository from '../repositories/ITripsRepository';

interface IRequest {
  id: string;
  user_id: string;
  destination: string;
  return_location: string;
  destination_latitude: number;
  destination_longitude: number;
  departure_date: Date;
  return_date: Date;
}

@injectable()
class UpdateTripService {
  constructor(
    @inject('TripsRepository')
    private tripsRepository: ITripsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    user_id,
    destination,
    return_location,
    destination_latitude,
    destination_longitude,
    departure_date,
    return_date,
  }: IRequest): Promise<Trip> {
    const trip = await this.tripsRepository.findById(id);

    if (!trip) {
      throw new AppError('Trip not found');
    }

    Object.assign(trip, {
      destination,
      return_location,
      destination_latitude,
      destination_longitude,
      departure_date,
      return_date,
    });

    await this.tripsRepository.save(trip);

    await this.cacheProvider.invalidatePrefix(
      `@Peguei!:user-trips-list:${user_id}`,
    );

    return trip;
  }
}

export default UpdateTripService;
