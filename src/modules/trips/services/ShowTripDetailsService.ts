import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Trip from '../infra/typeorm/entities/Trip';
import ITripsRepository from '../repositories/ITripsRepository';

interface IRequest {
  trip_id: string;
}

@injectable()
class ShowTripDetailsService {
  constructor(
    @inject('TripsRepository')
    private tripsRepository: ITripsRepository,
  ) {}

  public async execute({ trip_id }: IRequest): Promise<Trip> {
    const trip = await this.tripsRepository.findById(trip_id);

    if (!trip) {
      throw new AppError('Trip not found');
    }

    return trip;
  }
}

export default ShowTripDetailsService;
