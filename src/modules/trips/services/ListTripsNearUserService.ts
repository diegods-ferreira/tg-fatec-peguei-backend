import sortTripsByDistance from '@modules/trips/utils/sortTripsByDistance';
import { isAfter } from 'date-fns';
import { getPreciseDistance } from 'geolib';
import { inject, injectable } from 'tsyringe';
import Trip from '../infra/typeorm/entities/Trip';
import ITripsRepository from '../repositories/ITripsRepository';

interface IRequest {
  user_id?: string;
  user_latitude: number;
  user_longitude: number;
  distance: number;
}

@injectable()
class ListTripsNearUserService {
  constructor(
    @inject('TripsRepository')
    private tripsRepository: ITripsRepository,
  ) {}

  public async execute({
    user_id,
    user_latitude,
    user_longitude,
    distance,
  }: IRequest): Promise<Trip[]> {
    const trips = await this.tripsRepository.findAllTrips({
      except_user_id: user_id,
      distance,
      user_location: { latitude: user_latitude, longitude: user_longitude },
    });

    return trips;
  }
}

export default ListTripsNearUserService;
