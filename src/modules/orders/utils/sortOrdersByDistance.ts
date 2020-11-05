import { getPreciseDistance } from 'geolib';
import Order from '../infra/typeorm/entities/Order';

interface IUserLocation {
  latitude: number;
  longitude: number;
}

export default async function sortOrdersByDistance(
  orders: Order[],
  user_location: IUserLocation,
): Promise<Order[]> {
  const sortedOrders = orders.sort((current, next) => {
    const distanceFromUserLocationToCurrent = getPreciseDistance(
      {
        latitude: current.pickup_latitude,
        longitude: current.pickup_longitude,
      },
      user_location,
    );

    const distanceFromUserLocationToNext = getPreciseDistance(
      {
        latitude: next.pickup_latitude,
        longitude: next.pickup_longitude,
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

  return sortedOrders;
}
