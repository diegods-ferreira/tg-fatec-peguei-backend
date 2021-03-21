import CreateRequestPickupOfferService from '@modules/request_pickup_offers/services/CreateRequestPickupOfferService';
import DeleteRequestPickupOfferService from '@modules/request_pickup_offers/services/DeleteRequestPickupOfferService';
import GetRequestPickupOfferByIdService from '@modules/request_pickup_offers/services/GetRequestPickupOfferByIdService';
import ListAllRequestPickupOffersOfAnOrderService from '@modules/request_pickup_offers/services/ListAllRequestPickupOffersOfAnOrderService';
import UpdateRequestPickupOfferService from '@modules/request_pickup_offers/services/UpdateRequestPickupOfferService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class RequestPickupOfferController {
  public async create(request: Request, response: Response): Promise<Response> {
    const deliveryman_id = request.user.id;
    const { order_id } = request.params;
    const { delivery_value } = request.body;

    const createRequestPickupOffer = container.resolve(
      CreateRequestPickupOfferService,
    );

    const requestPickupOffer = await createRequestPickupOffer.execute({
      order_id,
      deliveryman_id,
      delivery_value: Number(delivery_value),
    });

    return response.json(requestPickupOffer);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { order_id } = request.params;

    const listAllRequestPickupOffersOfAnOrderService = container.resolve(
      ListAllRequestPickupOffersOfAnOrderService,
    );

    const requestPickupOffers = await listAllRequestPickupOffersOfAnOrderService.execute(
      { order_id },
    );

    return response.json(classToClass(requestPickupOffers));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { order_id, deliveryman_id } = request.params;

    const getRequestPickupOfferByIdService = container.resolve(
      GetRequestPickupOfferByIdService,
    );

    const requestPickupOffer = await getRequestPickupOfferByIdService.execute({
      order_id,
      deliveryman_id,
    });

    return response.json(classToClass(requestPickupOffer));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteRequestPickupOfferService = container.resolve(
      DeleteRequestPickupOfferService,
    );

    await deleteRequestPickupOfferService.execute({ id });

    return response.status(200).send();
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { delivery_value } = request.body;

    const updateRequestPickupOfferService = container.resolve(
      UpdateRequestPickupOfferService,
    );

    const requestPickupOffer = await updateRequestPickupOfferService.execute({
      id,
      delivery_value: Number(delivery_value),
    });

    return response.json(requestPickupOffer);
  }
}
