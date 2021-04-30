import FindRatingByDeliverymanIdService from '@modules/rating/services/FindByDeliverymanIdService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class DeliverymanRatingController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { deliveryman_id } = request.params;

    const findRatingByDeliverymanId = container.resolve(
      FindRatingByDeliverymanIdService,
    );

    const rating = await findRatingByDeliverymanId.execute({ deliveryman_id });

    return response.json(classToClass(rating));
  }
}
