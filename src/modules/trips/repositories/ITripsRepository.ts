import ICreateTripDTO from '../dtos/ICreateTripDTO';
import IFindAllTripsDTO from '../dtos/IFindAllTripsDTO';
import Trip from '../infra/typeorm/entities/Trip';

export default interface ITripsRepository {
  create(data: ICreateTripDTO): Promise<Trip>;
  save(trip: Trip): Promise<Trip>;
  findAllTrips(data: IFindAllTripsDTO): Promise<Trip[]>;
  findById(trip_id: string): Promise<Trip | undefined>;
  findByUserId(user_id: string): Promise<Trip[]>;
}
