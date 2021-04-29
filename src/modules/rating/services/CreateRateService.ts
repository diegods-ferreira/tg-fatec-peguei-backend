import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Rate from '../infra/typeorm/schemas/Rate';
import IRatingRepository from '../repositories/IRatingRepository';

interface IRequest {
  order_id: string;
  requester_id: string;
  deliveryman_id: string;
  rate: number;
  comment: string;
}

@injectable()
class CreateRateService {
  constructor(
    @inject('RatingRepository')
    private ratingRapository: IRatingRepository,

    @inject('UsersRepository')
    private usersRapository: IUsersRepository,

    @inject('OrdersRepository')
    private ordersRapository: IOrdersRepository,
  ) {}

  public async execute({
    order_id,
    requester_id,
    deliveryman_id,
    rate,
    comment,
  }: IRequest): Promise<Rate> {
    const requester = await this.usersRapository.findById(requester_id);

    if (!requester) {
      throw new AppError('Requester not found.');
    }

    const deliveryman = await this.usersRapository.findById(deliveryman_id);

    if (!deliveryman) {
      throw new AppError('Deliveryman not found.');
    }

    const order = await this.ordersRapository.findById(order_id);

    if (!order) {
      throw new AppError('Order not found.');
    }

    const craetedRate = await this.ratingRapository.create({
      order_id,
      requester_id,
      deliveryman_id,
      rate,
      comment,
    });

    const deliverymanRating = await this.ratingRapository.findByDeliverymanId(
      deliveryman_id,
    );

    if (deliverymanRating) {
      deliverymanRating.push(craetedRate);

      const ratingSum = deliverymanRating.reduce(
        (accumulator, currentValue) => accumulator + currentValue.rate,
        0,
      );

      const ratingAverage = ratingSum / deliverymanRating.length;

      Object.assign(deliveryman, { rating_average: ratingAverage });

      await this.usersRapository.save(deliveryman);
    }

    return craetedRate;
  }
}

export default CreateRateService;
