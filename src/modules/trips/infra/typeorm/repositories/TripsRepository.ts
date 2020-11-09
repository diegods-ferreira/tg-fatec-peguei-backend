import ICreateTripDTO from '@modules/trips/dtos/ICreateTripDTO';
import IFindAllTripsDTO from '@modules/trips/dtos/IFindAllTripsDTO';
import ITripsRepository from '@modules/trips/repositories/ITripsRepository';
import { getRepository, Not, Repository } from 'typeorm';
import Trip from '../entities/Trip';

class TripsRepository implements ITripsRepository {
  private ormRepository: Repository<Trip>;

  constructor() {
    this.ormRepository = getRepository(Trip);
  }

  public async create(tripData: ICreateTripDTO): Promise<Trip> {
    const trip = this.ormRepository.create(tripData);

    await this.ormRepository.save(trip);

    return trip;
  }

  public async save(trip: Trip): Promise<Trip> {
    return this.ormRepository.save(trip);
  }

  public async findAllTrips({
    except_user_id,
  }: IFindAllTripsDTO): Promise<Trip[]> {
    let trips;

    if (except_user_id) {
      trips = await this.ormRepository.find({
        where: { user_id: Not(except_user_id) },
        relations: ['orders', 'user'],
      });
    } else {
      trips = await this.ormRepository.find({ relations: ['orders', 'user'] });
    }

    return trips;
  }

  public async findById(trip_id: string): Promise<Trip | undefined> {
    const trip = await this.ormRepository.findOne({
      where: { id: trip_id },
      relations: ['orders', 'user'],
    });

    return trip;
  }

  public async findByUserId(user_id: string): Promise<Trip[]> {
    const trips = await this.ormRepository.find({
      where: { user_id },
      relations: ['orders', 'user'],
    });

    return trips;
  }
}

export default TripsRepository;
