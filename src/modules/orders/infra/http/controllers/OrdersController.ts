import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateOrderService from '@modules/orders/services/CreateOrderService';
import UpdateOrderService from '@modules/orders/services/UpdateOrderService';
import ListOrdersNearUserService from '@modules/orders/services/ListOrdersNearUserService';
import ShowOrderDetailsService from '@modules/orders/services/ShowOrderDetailsService';
import { classToClass } from 'class-transformer';
// import ListOrdersByKeysService from '@modules/orders/services/ListOrdersByKeysService';

export default class OrdersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const {
      deliveryman_id,
      pickup_date,
      pickup_establishment,
      pickup_address,
      pickup_city,
      pickup_state,
      pickup_latitude,
      pickup_longitude,
      delivery_address,
      delivery_city,
      delivery_state,
      delivery_latitude,
      delivery_longitude,
      trip_id,
      items,
    } = request.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({
      deliveryman_id,
      requester_id: user_id,
      pickup_date,
      pickup_establishment,
      pickup_address,
      pickup_city,
      pickup_state,
      pickup_latitude,
      pickup_longitude,
      delivery_address,
      delivery_city,
      delivery_state,
      delivery_latitude,
      delivery_longitude,
      trip_id,
      items,
    });

    return response.json(classToClass(order));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      id,
      deliveryman_id,
      requester_id,
      pickup_date,
      pickup_establishment,
      pickup_address,
      pickup_city,
      pickup_state,
      pickup_latitude,
      pickup_longitude,
      delivery_address,
      delivery_city,
      delivery_state,
      delivery_latitude,
      delivery_longitude,
      trip_id,
    } = request.body;

    const updateOrder = container.resolve(UpdateOrderService);

    const order = await updateOrder.execute({
      id,
      deliveryman_id,
      requester_id,
      pickup_date,
      pickup_establishment,
      pickup_address,
      pickup_city,
      pickup_state,
      pickup_latitude,
      pickup_longitude,
      delivery_address,
      delivery_city,
      delivery_state,
      delivery_latitude,
      delivery_longitude,
      trip_id,
    });

    return response.json(classToClass(order));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { user_latitude, user_longitude, distance, page } = request.query;

    const listOrdersNearUser = container.resolve(ListOrdersNearUserService);

    const orders = await listOrdersNearUser.execute({
      user_id,
      user_latitude: Number(user_latitude),
      user_longitude: Number(user_longitude),
      distance: Number(distance),
      page: Number(page) || 1,
    });

    return response.json(classToClass(orders));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { order_id } = request.params;

    const showOrderDetails = container.resolve(ShowOrderDetailsService);

    const order = await showOrderDetails.execute({ order_id });

    return response.json(classToClass(order));
  }

  // public async showByKeys(
  //   request: Request,
  //   response: Response,
  // ): Promise<Response> {
  //   const keys = request.query;

  //   const listOrdersByKeys = container.resolve(ListOrdersByKeysService);

  //   const orders = listOrdersByKeys.execute({ keys: String(keys) });

  //   return response.json(orders);
  // }
}
