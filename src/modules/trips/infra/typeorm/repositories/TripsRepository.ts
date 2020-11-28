import ICreateTripDTO from '@modules/trips/dtos/ICreateTripDTO';
import IFindAllTripsDTO from '@modules/trips/dtos/IFindAllTripsDTO';
import ITripsRepository from '@modules/trips/repositories/ITripsRepository';
import { getRepository, Repository } from 'typeorm';
import { format } from 'date-fns';
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
    distance,
    user_location,
  }: IFindAllTripsDTO): Promise<Trip[]> {
    let trips;

    if (except_user_id) {
      trips = await this.ormRepository
        .createQueryBuilder('trips')
        .select()
        .where(`trips.user_id <> '${except_user_id}'`)
        .andWhere(
          `getdistance(trips.destination_latitude, trips.destination_longitude, ${user_location.latitude}, ${user_location.longitude}) <= ${distance}`,
        )
        .andWhere(
          `trips.return_date >= '${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}'`,
        )
        .leftJoinAndSelect('trips.user', 'user')
        .leftJoinAndSelect('trips.orders', 'orders')
        .leftJoinAndSelect('orders.items', 'items')
        .leftJoinAndSelect('items.category', 'items.category')
        .leftJoinAndSelect('items.weight_unit_measure', 'weight_unit_measure')
        .leftJoinAndSelect(
          'items.dimension_unit_measure',
          'dimension_unit_measure',
        )
        .leftJoinAndSelect('orders.requester', 'requester')
        .leftJoinAndSelect('orders.deliveryman', 'deliveryman')
        .orderBy(
          `getdistance(trips.destination_latitude, trips.destination_longitude, ${user_location.latitude}, ${user_location.longitude}) <= ${distance}`,
        )
        .getMany();
    } else {
      trips = await this.ormRepository
        .createQueryBuilder('trips')
        .select()
        .where(
          `getdistance(trips.destination_latitude, trips.destination_longitude, ${user_location.latitude}, ${user_location.longitude}) <= ${distance}`,
        )
        .andWhere(
          `trips.return_date >= '${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}'`,
        )
        .leftJoinAndSelect('trips.user', 'user')
        .leftJoinAndSelect('trips.orders', 'orders')
        .leftJoinAndSelect('orders.items', 'items')
        .leftJoinAndSelect('items.category', 'items.category')
        .leftJoinAndSelect('items.weight_unit_measure', 'weight_unit_measure')
        .leftJoinAndSelect(
          'items.dimension_unit_measure',
          'dimension_unit_measure',
        )
        .leftJoinAndSelect('orders.requester', 'requester')
        .leftJoinAndSelect('orders.deliveryman', 'deliveryman')
        .orderBy(
          `getdistance(trips.destination_latitude, trips.destination_longitude, ${user_location.latitude}, ${user_location.longitude}) <= ${distance}`,
        )
        .getMany();
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
      order: {
        created_at: 'DESC',
      },
    });

    return trips;
  }
}

export default TripsRepository;