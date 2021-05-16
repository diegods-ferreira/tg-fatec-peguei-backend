import ShowTripOrdersService from '@modules/trips/services/ShowTripOrdersService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class TripOrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { trip_id } = request.params;

    const showTripOrdedrs = container.resolve(ShowTripOrdersService);

    const trip = await showTripOrdedrs.execute({ trip_id });

    return response.json(classToClass(trip));
  }
}
