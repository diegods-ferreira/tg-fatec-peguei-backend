import CreateTripService from '@modules/trips/services/CreateTripService';
import ListTripsNearUserService from '@modules/trips/services/ListTripsNearUserService';
import ShowTripDetailsService from '@modules/trips/services/ShowTripDetailsService';
import UpdateTripService from '@modules/trips/services/UpdateTripService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class TripsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const {
      destination,
      return_location,
      destination_latitude,
      destination_longitude,
      departure_date,
      return_date,
    } = request.body;

    const createTrip = container.resolve(CreateTripService);

    const trip = await createTrip.execute({
      user_id,
      destination,
      return_location,
      destination_latitude,
      destination_longitude,
      departure_date,
      return_date,
    });

    return response.json(trip);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const {
      id,
      destination,
      return_location,
      destination_latitude,
      destination_longitude,
      departure_date,
      return_date,
    } = request.body;

    const updateTrip = container.resolve(UpdateTripService);

    const trip = await updateTrip.execute({
      id,
      user_id,
      destination,
      return_location,
      destination_latitude,
      destination_longitude,
      departure_date,
      return_date,
    });

    return response.json(trip);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const {
      user_latitude,
      user_longitude,
      distance,
      page,
      date,
    } = request.query;

    const listTripsNearUser = container.resolve(ListTripsNearUserService);

    const trips = await listTripsNearUser.execute({
      user_id,
      user_latitude: Number(user_latitude),
      user_longitude: Number(user_longitude),
      distance: Number(distance),
      page: Number(page) || 1,
      date: new Date(String(date)),
    });

    return response.json(trips);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { trip_id } = request.params;

    const showTripDetails = container.resolve(ShowTripDetailsService);

    const trip = await showTripDetails.execute({ trip_id });

    return response.json(trip);
  }
}
