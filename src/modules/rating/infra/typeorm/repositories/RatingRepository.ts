import ICreateRateDTO from '@modules/rating/dtos/ICreateRateDTO';
import IRatingRepository from '@modules/rating/repositories/IRatingRepository';
import { getMongoRepository, MongoRepository } from 'typeorm';
import Rate from '../schemas/Rate';

class RatingRepository implements IRatingRepository {
  private ormRepository: MongoRepository<Rate>;

  constructor() {
    this.ormRepository = getMongoRepository(Rate, 'mongo');
  }

  public async create(data: ICreateRateDTO): Promise<Rate> {
    const rate = this.ormRepository.create(data);

    await this.ormRepository.save(rate);

    return rate;
  }

  public async save(rate: Rate): Promise<Rate> {
    return this.ormRepository.save(rate);
  }

  public async delete(rate: Rate): Promise<Rate> {
    return this.ormRepository.remove(rate);
  }

  public async findById(id: string): Promise<Rate | undefined> {
    const rate = await this.ormRepository.findOne(id);

    return rate;
  }

  public async findByOrderId(order_id: string): Promise<Rate | undefined> {
    const rating = await this.ormRepository.findOne({
      where: { order_id },
      order: { created_at: 'DESC' },
    });

    return rating;
  }

  public async findByRequesterId(requester_id: string): Promise<Rate[]> {
    const rating = await this.ormRepository.find({
      where: { requester_id },
      order: { created_at: 'DESC' },
    });

    return rating;
  }

  public async findByDeliverymanId(deliveryman_id: string): Promise<Rate[]> {
    const rating = await this.ormRepository.find({
      where: { deliveryman_id },
      order: { created_at: 'DESC' },
    });

    return rating;
  }
}

export default RatingRepository;
