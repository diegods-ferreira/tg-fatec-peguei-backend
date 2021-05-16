import CreateTripService from '@modules/trips/services/CreateTripService';
import ListTripsNearUserService from '@modules/trips/services/ListTripsNearUserService';
import ShowTripDetailsService from '@modules/trips/services/ShowTripDetailsService';
import UpdateTripService from '@modules/trips/services/UpdateTripService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class TripsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const {
      destination_city,
      destination_state,
      return_city,
      return_state,
      departure_date,
      return_date,
    } = request.body;

    const createTrip = container.resolve(CreateTripService);

    const trip = await createTrip.execute({
      user_id,
      destination_city,
      destination_state,
      return_city,
      return_state,
      departure_date,
      return_date,
    });

    return response.json(classToClass(trip));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id } = request.params;
    const {
      destination_city,
      destination_state,
      return_city,
      return_state,
      departure_date,
      return_date,
      status,
    } = request.body;

    const updateTrip = container.resolve(UpdateTripService);

    const trip = await updateTrip.execute({
      id,
      user_id,
      destination_city,
      destination_state,
      return_city,
      return_state,
      departure_date,
      return_date,
      status: Number(status),
    });

    return response.json(classToClass(trip));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { page } = request.query;

    const listTripsNearUser = container.resolve(ListTripsNearUserService);

    const trips = await listTripsNearUser.execute({
      user_id,
      page: Number(page) || 1,
    });

    return response.json(classToClass(trips));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { trip_id } = request.params;

    const showTripDetails = container.resolve(ShowTripDetailsService);

    const trip = await showTripDetails.execute({ trip_id });

    return response.json(classToClass(trip));
  }
}
