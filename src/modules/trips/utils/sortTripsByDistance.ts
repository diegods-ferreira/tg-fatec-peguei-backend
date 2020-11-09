import { getPreciseDistance } from 'geolib';
import Trip from '../infra/typeorm/entities/Trip';

interface IUserLocation {
  latitude: number;
  longitude: number;
}

export default async function sortTripsByDistance(
  trips: Trip[],
  user_location: IUserLocation,
): Promise<Trip[]> {
  const sortedTrips = trips.sort((current, next) => {
    const distanceFromUserLocationToCurrent = getPreciseDistance(
      {
        latitude: current.destination_latitude,
        longitude: current.destination_longitude,
      },
      user_location,
    );

    const distanceFromUserLocationToNext = getPreciseDistance(
      {
        latitude: next.destination_latitude,
        longitude: next.destination_longitude,
      },
      user_location,
    );

    if (distanceFromUserLocationToCurrent < distanceFromUserLocationToNext) {
      return -1;
    }

    if (distanceFromUserLocationToCurrent > distanceFromUserLocationToNext) {
      return 1;
    }

    return 0;
  });

  return sortedTrips;
}
