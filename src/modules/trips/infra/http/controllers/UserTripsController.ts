import ListUserTripsService from '@modules/trips/services/ListUserTripsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UserTripsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listUserTrips = container.resolve(ListUserTripsService);

    const trips = await listUserTrips.execute({ user_id });

    return response.json(trips);
  }
}
