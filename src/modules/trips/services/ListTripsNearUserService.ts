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
    });

    const distanceInMeters = distance * 1000;

    const filteredTripsByDistance = trips.filter(trip => {
      return (
        getPreciseDistance(
          {
            latitude: user_latitude,
            longitude: user_longitude,
          },
          {
            latitude: trip.destination_latitude,
            longitude: trip.destination_longitude,
          },
        ) <= distanceInMeters && isAfter(trip.return_date, new Date())
      );
    });

    const sortedTrips = await sortTripsByDistance(filteredTripsByDistance, {
      latitude: user_latitude,
      longitude: user_longitude,
    });

    return sortedTrips;
  }
}

export default ListTripsNearUserService;
