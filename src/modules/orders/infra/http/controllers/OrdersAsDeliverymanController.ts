import ListUserOdersAsDeliverymanService from '@modules/orders/services/ListUserOdersAsDeliverymanService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class OrdersAsDeliverymanController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listUserOrdersAsDeliveryman = container.resolve(
      ListUserOdersAsDeliverymanService,
    );

    const orders = await listUserOrdersAsDeliveryman.execute({
      deliveryman_id: user_id,
    });

    return response.json(classToClass(orders));
  }
}
