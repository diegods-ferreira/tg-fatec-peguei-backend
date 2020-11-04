import ListUserOrdersService from '@modules/orders/services/ListUserOrdersService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UserOrdersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { status } = request.params;

    const listUserOrders = container.resolve(ListUserOrdersService);

    const orders = await listUserOrders.execute({
      user_id,
      status: Number(status),
    });

    return response.json(classToClass(orders));
  }
}
