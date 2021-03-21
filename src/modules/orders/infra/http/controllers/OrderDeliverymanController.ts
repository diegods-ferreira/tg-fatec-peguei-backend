import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import SaveNewDeliverymanToOrderService from '@modules/orders/services/SaveNewDeliverymanToOrderService';

export default class OrderDeliverymanController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { order_id } = request.params;
    const { deliveryman_id } = request.body;

    const saveNewDeliverymanToOrder = container.resolve(
      SaveNewDeliverymanToOrderService,
    );

    const order = await saveNewDeliverymanToOrder.execute({
      id: order_id,
      deliveryman_id,
      user_id,
    });

    return response.json(classToClass(order));
  }
}
