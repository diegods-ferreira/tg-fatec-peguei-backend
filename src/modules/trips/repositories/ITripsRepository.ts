import ICreateTripDTO from '../dtos/ICreateTripDTO';
import IFindAllTripsDTO from '../dtos/IFindAllTripsDTO';
import Trip from '../infra/typeorm/entities/Trip';

export default interface ITripsRepository {
  /**
   * Creates a trip
   * @param data Trip data
   */
  create(data: ICreateTripDTO): Promise<Trip>;

  /**
   * Updates a trip
   * @param trip Trip data
   */
  save(trip: Trip): Promise<Trip>;

  /**
   * Finds all trips
   * @param data Trip data
   */
  findAllTrips(data: IFindAllTripsDTO): Promise<Trip[]>;

  /**
   * Finds a trip by it's unique ID
   * @param trip_id Trip id
   */
  findById(trip_id: string): Promise<Trip | undefined>;

  /**
   * Finds the trips of an specific user
   * @param user_id User id
   */
  findByUserId(user_id: string): Promise<Trip[]>;
}
