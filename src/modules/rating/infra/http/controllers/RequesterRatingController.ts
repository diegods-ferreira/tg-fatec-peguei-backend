import FindRatingByRequesterIdService from '@modules/rating/services/FindRatingByRequesterIdService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class RequesterRatingController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { requester_id } = request.params;

    const findRatingByRequesterId = container.resolve(
      FindRatingByRequesterIdService,
    );

    const rating = await findRatingByRequesterId.execute({ requester_id });

    return response.json(rating);
  }
}
