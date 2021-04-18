import FindRatingByOrderIdService from '@modules/rating/services/FindRatingByOrderIdService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class OrderRatingController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { order_id } = request.params;

    const findRatingByOrderId = container.resolve(FindRatingByOrderIdService);

    const rating = await findRatingByOrderId.execute({ order_id });

    return response.json(rating);
  }
}
