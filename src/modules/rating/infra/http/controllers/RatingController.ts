import CreateRateService from '@modules/rating/services/CreateRateService';
import DeleteRateService from '@modules/rating/services/DeleteRateService';
import UpdateRateService from '@modules/rating/services/UpdateRateService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class RatingController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      order_id,
      requester_id,
      deliveryman_id,
      rate,
      comment,
    } = request.body;

    const createRate = container.resolve(CreateRateService);

    const craetedRate = await createRate.execute({
      order_id,
      requester_id,
      deliveryman_id,
      rate: Number(rate),
      comment,
    });

    return response.json(craetedRate);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { rate, comment } = request.body;

    const updateRate = container.resolve(UpdateRateService);

    const updatedRate = await updateRate.execute({
      id,
      rate: Number(rate),
      comment,
    });

    return response.json(updatedRate);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteRate = container.resolve(DeleteRateService);

    const deletedRate = await deleteRate.execute({ id });

    return response.json(deletedRate);
  }
}
